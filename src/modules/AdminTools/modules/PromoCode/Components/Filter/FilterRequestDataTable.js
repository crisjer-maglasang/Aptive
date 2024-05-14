import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import DataTable from '@/modules/AdminTools/components/DataTable/DataTable';
import SortableCell from '@/modules/AdminTools/components/DataTable/SortableCell';

const ASCENDING = 'asc';
const DESCENDING = 'desc';

const FilterRequestDataTable = ({
  data,
  currentPage,
  total,
  perPage,
  table,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = useMemo(() => searchParams.get('sort_by'), [searchParams]);
  const sortOrder = useMemo(
    () => searchParams.get('sort_order'),
    [searchParams]
  );
  const pageSize = useMemo(
    () => Number(searchParams.get('per_page')),
    [searchParams]
  );
  const selectedPage = useMemo(
    () => Number(searchParams.get('page')),
    [searchParams]
  );

  const setSearch = useCallback(
    (key, search) => {
      searchParams.set(key, search);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const onSortingByClick = useCallback(
    (newSortBy) => {
      setSearch('sort_by', newSortBy);
      const newSortOrder = sortOrder === ASCENDING ? DESCENDING : ASCENDING;
      setSearch('sort_order', newSortBy === sortBy ? newSortOrder : ASCENDING);
    },
    [setSearch, sortBy, sortOrder]
  );

  useEffect(() => {
    if (searchParams.get('per_page') === null) {
      searchParams.set('per_page', perPage);
    }
    if (searchParams.get('sort_by') === null) {
      searchParams.set('sort_by', 'created_at');
    }
    if (searchParams.get('page') === null) {
      searchParams.set('page', currentPage);
    }
    if (searchParams.get('sort_order') === null) {
      searchParams.set('sort_order', ASCENDING);
    }
    setSearchParams(searchParams);
  }, [currentPage, perPage, searchParams, setSearchParams]);

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

  const mappedData = useMemo(() => {
    const indexMap = {};

    data.forEach(({ id }, index) => {
      indexMap[id] = index;
    });

    return data.map((data) => ({
      data,
      index: indexMap[data.id],
    }));
  }, [data]);

  return (
    <DataTable
      data={mappedData}
      paginator={{
        rowCount: total,
        pageSize,
        setPageSize: (pageSize) => setSearch('per_page', pageSize),
        onPageChange: ({ selected }) => setSearch('page', selected),
        selectedPage,
        initialPage: 1,
      }}
      table={sortedTable}
    />
  );
};

FilterRequestDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  table: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  total: PropTypes.number,
  perPage: PropTypes.number,
};

export default FilterRequestDataTable;
