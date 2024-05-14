import { useCallback } from 'react';
import PageableTable from './PageableTable';
import { SearchBar } from '@/components/common';
import dashboard from '@/lib/constants/dashboard';

const FilterableTable = ({
  leftControl,
  loading,
  onSelect,
  columns,
  rows,
  sortParams,
  onSortChange,
  onPageChange,
  searchText,
  searchPlaceholder,
  setSearchText,
  pageSize,
  setPageSize,
  selectedPage,
  setSelectedPage,
  totalCount,
}) => {
  const handleSearchClick = useCallback(({ searchText }) => {
    setSearchText(searchText);
    setSelectedPage(1);
  }, []);

  return (
    <>
      <div className="mb-5 flex flex-col md:flex-row justify-between md:items-end gap-x-3">
        <div className="mb-2 md:mb-0">{leftControl}</div>
        <SearchBar
          inputName={dashboard.AREAS_SEARCH_NAME}
          searchText={searchText}
          onSearchClick={handleSearchClick}
          placeholder={searchPlaceholder}
          className="w-full md:w-72 -mb-0.5 lg:w-80"
        />
      </div>

      <PageableTable
        loading={loading}
        columns={columns}
        rows={rows}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onPageChange={onPageChange}
        onSelect={onSelect}
        sortParams={sortParams}
        onSortChange={onSortChange}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        totalCount={totalCount}
      />
    </>
  );
};

export default FilterableTable;
