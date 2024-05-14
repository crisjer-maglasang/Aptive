import { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '../TableStructure';
import {
  defineIsActiveColumn,
  getBodyRowGroups,
  getColumnsNumber,
  getHeaderGroups,
} from '../../lib';
import { Paginator } from '@/components/pagination';
import { selectLoadingState, selectRepsForApproval, selectTotalRepsCount } from '@/redux/approval';
import dashboard from '@/lib/constants/dashboard';
import { Loader, SortLabel } from '@/components/common';

const RepsApprovalTable = memo(({
  initialPage,
  pageNumber,
  pageSize,
  activeColumns,
  setPageNumber,
  setPageSize,
  getSortParam,
  onSortChange,
  setRepToApprove,
}) => {
  const repsToApprove = useSelector(selectRepsForApproval);
  const totalCount = useSelector(selectTotalRepsCount);
  const isLoading = useSelector(selectLoadingState);

  const isDisabled = isLoading || !repsToApprove.length;
  const headerGroups = getHeaderGroups();
  const columnsNumber = getColumnsNumber(headerGroups);

  const renderLoadingState = () => (
    <TableRow>
      <TableCell colSpan={columnsNumber}>
        <Loader />
      </TableCell>
    </TableRow>
  );

  const renderEmptyTable = () => (
    <TableRow>
      <TableCell
        align="center"
        valign="middle"
        className="text-base"
        colSpan={columnsNumber}
      >
        {dashboard.NO_DATA_TO_DISPLAY}
      </TableCell>
    </TableRow>
  );

  const renderTableContent = () => {
    return repsToApprove.map((row) => (
      <TableRow key={row.userId} hovered role="button" onClick={setRepToApprove(row.userId)}>
        {getBodyRowGroups(row).map((rowGroup) => {
          const { id, columnId, value, align, valign, colSpan, className } = rowGroup;

          return (
            <TableCell
              body
              key={id}
              align={align}
              valign={valign}
              colSpan={colSpan}
              className={className}
              sorted={defineIsActiveColumn(columnId, activeColumns)}
            >
              {value || <span>&#8212;</span>}
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  return (
    <TableContainer rounded border>
      <Table>
        <TableHead>
          <TableRow header>
            {headerGroups.map((headerGroup) => {
              const { value, align, colSpan, columnId, isSorted, className } = headerGroup;

              return (
                <TableCell
                  header
                  component="th"
                  key={value}
                  align={align}
                  colSpan={colSpan}
                  className={className}
                >
                  {isSorted ? (
                    <SortLabel
                      isDisabled={isDisabled}
                      sortName={columnId}
                      onSortChange={onSortChange}
                      sortOrder={getSortParam(columnId)?.order}
                      position={getSortParam(columnId)?.index}
                    >
                      {value}
                    </SortLabel>
                  ) : value}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading
            ? renderLoadingState()
            : repsToApprove.length ? renderTableContent() : renderEmptyTable()}
        </TableBody>
      </Table>

      <Paginator
        isDisabled={isLoading}
        rowCount={totalCount}
        pageSize={pageSize}
        selectedPage={pageNumber}
        initialPage={initialPage}
        setPageSize={setPageSize}
        onPageChange={setPageNumber}
      />
    </TableContainer>
  );
});

RepsApprovalTable.propTypes = {
  initialPage: PropTypes.number,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  activeColumns: PropTypes.arrayOf(PropTypes.string),
  setPageNumber: PropTypes.func,
  setPageSize: PropTypes.func,
  getSortParam: PropTypes.func,
  onSortChange: PropTypes.func,
  setRepToApprove: PropTypes.func,
};

export default RepsApprovalTable;
