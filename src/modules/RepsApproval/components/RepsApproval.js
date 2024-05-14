import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getRepToApprove, requestApprovalDocumentsAsync, requestRepsForApprovalAsync, selectIsApproved } from '@/redux/approval';
import { getActiveColumnsIds } from '@/modules/RepsApproval/lib';
import { SearchBar } from '@/components/common';
import dashboard from '@/lib/constants/dashboard';
import RepsApprovalTable from '../components/RepsApprovalTable/RepsApprovalTable';
import ApprovalFilters from '../components/ApprovalFilters/ApprovalFilters';
import { useSortTable } from '@/hooks';

const RepsApproval = ({ openModal }) => {
  const initialPage = 1;
  const initialSize = 10;

  const dispatch = useDispatch();
  const isApproved = useSelector(selectIsApproved);
  const [activeColumns, setActiveColumns] = useState([]);
  const { sortParams, sortQueryParams, getSortParam, onSortParamsChange } = useSortTable();
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialSize);
  const [filters, setFilters] = useState({
    regionals: [],
    recruiters: [],
    searchText: '',
  });

  useEffect(() => {
    getReps();
  }, [pageNumber, pageSize, sortQueryParams, filters]);

  useEffect(() => {
    if (isApproved) {
      getReps();
    }
  }, [isApproved]);

  useEffect(() => {
    const activeColumns = getActiveColumnsIds(sortParams, filters);

    setActiveColumns(activeColumns);
  }, [filters.recruiters, filters.regionals, sortParams]);

  const getReps = () => {
    dispatch(requestRepsForApprovalAsync.request({
      pageNumber,
      pageSize,
      sortParams: sortQueryParams,
      ...filters,
    }));
  };

  const onSetPageNumber = useCallback((number) => {
    setPageNumber(number.selected);
  }, []);

  const onSetFilters = useCallback(({ userRole, users }) => {
    setFilters({ ...filters, [userRole]: users });
    setPageNumber(1);
  }, [filters]);

  const onSetSearchText = useCallback(({ searchText }) => {
    setFilters({ ...filters, searchText });
    setPageNumber(1);
  }, [filters]);

  const setRepToApprove = useCallback((userId) => () => {
    dispatch(requestApprovalDocumentsAsync.request({ userId }));
    dispatch(getRepToApprove(userId));
    openModal();
  }, [openModal]);

  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between lg:items-end gap-x-3 gap-y-5">
        <h1 className="text-4xl whitespace-nowrap text-gray-900">Rep approval</h1>

        <div className="flex justify-end lg:justify-between items-end gap-x-4 relative">
          <ApprovalFilters setFilters={onSetFilters} />

          <SearchBar
            inputName={dashboard.REP_APPROVE_SEARCH_NAME}
            searchText={filters.searchText}
            onSearchClick={onSetSearchText}
            placeholder="Search for a rep"
          />
        </div>
      </div>

      <div className="grow">
        <RepsApprovalTable
          initialPage={initialPage}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageNumber={onSetPageNumber}
          setPageSize={setPageSize}
          getSortParam={getSortParam}
          onSortChange={onSortParamsChange}
          activeColumns={activeColumns}
          setRepToApprove={setRepToApprove}
        />
      </div>
    </div>
  );
};

RepsApproval.propTypes = {
  openModal: PropTypes.func,
};

export default memo(RepsApproval);
