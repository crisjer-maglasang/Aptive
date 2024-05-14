import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

import DataTable from './DataTable';
import { sortCompare } from '@/lib/utils';
import SortableCell from './SortableCell';

const ASCENDING = -1;

const INITIAL_PAGE = 1;
const PAGE_SIZE = 10;

const SortingDataTable = ({
  data,
  rowMap,
  sortOrders,
  getSortField,
  table,
}) => {
  const [sortBy, setSortBy] = useState(sortOrders[0]);
  const [sortOrder, setSortOrder] = useState(-ASCENDING);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [selectedPage, onPageChange] = useState(INITIAL_PAGE);

  const onSortingByClick = useCallback(
    (newSortBy) => {
      setSortBy(newSortBy);
      setSortOrder((oldSortOrder) => ((newSortBy === sortBy) ? (-1 * oldSortOrder) : ASCENDING));
    },
    [sortBy]
  );

  const compareData = useCallback(
    (order, cascadingSort) => (a, b) => {
      const sortingBy = cascadingSort[0];

      const sortField = getSortField
        ? getSortField(sortingBy)
        : (datum) => datum[sortingBy];

      const aField = sortField(a);
      const bField = sortField(b);

      const comp = sortCompare(aField, bField);
      if (cascadingSort.length === 1 || comp !== 0) {
        return comp * order;
      }

      return compareData(order, cascadingSort.slice(1))(a, b);
    },
    [getSortField]
  );

  const sortedData = useMemo(() => {
    const cascadingSort = [...sortOrders];

    const index = cascadingSort.findIndex((item) => item === sortBy);
    if (index >= 0) {
      cascadingSort.splice(index, 1);
    }
    cascadingSort.unshift(sortBy);

    return [...data].sort(compareData(sortOrder, cascadingSort));
  }, [data, sortOrder, sortOrders, sortBy, compareData]);

  const mappedData = useMemo(
    () =>
      sortedData
        .slice(pageSize * (selectedPage - 1), pageSize * selectedPage)
        .map(rowMap),
    [pageSize, rowMap, selectedPage, sortedData]
  );

  const sortedTable = useMemo(
    () =>
      table.map((col) => {
        let label = col.label;
        if (col.sortBy !== undefined) {
          label = (
            <SortableCell
              id={col.sortBy}
              label={col.label}
              onClick={() => onSortingByClick(col.sortBy)}
              isAscending={sortOrder === ASCENDING}
              sortBy={sortBy}
            />
          );
        }

        return { ...col, label };
      }),
    [onSortingByClick, sortBy, sortOrder, table]
  );

  return (
    <DataTable
      data={mappedData}
      paginator={{
        rowCount: sortedData.length,
        pageSize,
        setPageSize,
        onPageChange: ({ selected }) => onPageChange(selected),
        selectedPage,
        initialPage: 1,
      }}
      table={sortedTable}
    />
  );
};

SortingDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  getSortField: PropTypes.func,
  rowMap: PropTypes.func.isRequired,
  sortOrders: PropTypes.array.isRequired,
  table: PropTypes.array.isRequired,
};

export default SortingDataTable;
