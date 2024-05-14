import { Table } from '@/components';
import { SearchBar, FilterBadge } from '@/components/common';
import PropTypes from 'prop-types';
import {
  getBedsHistoryHeadRows,
  parseBedsHistoryRows,
  parseLabel,
} from '@/modules/Housing/modules/BedsHistory/lib';

const BedsHistoryTable = ({
  initialPage,
  bedsHistories,
  bedsHistoryTotal,
  pageSize,
  setPageSize,
  selectedPage,
  onPageChange,
  isLoading,
  setSearchValue,
  searchValue,
  selectedFilters,
  setSelectedFilters,
}) => {
  const bedsHistoryRows = parseBedsHistoryRows(bedsHistories ?? []);
  const handleSearchClick = ({ searchText }) => {
    setSearchValue(searchText);
  };
  const onDeleteFilter = (filterName) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterName];
      return newFilters;
    });
  };

  return (
    <>
      {!isLoading && (
        <div className="mt-4 border border-solid border-gray-300 rounded-t-lg p-2 border-b-0 bg-white self-stretch flex items-center gap-2">
          <SearchBar
            placeholder="Rep/SP Name"
            searchText={searchValue}
            inputName="bedsHistorySearch"
            onSearchClick={handleSearchClick}
          />
          <div className="flex gap-2 justify-center items-center">
            {Object.keys(selectedFilters).length > 0 &&
              Object.keys(selectedFilters).map(
                (key, index) =>
                  selectedFilters[key] && (
                    <FilterBadge
                      key={index}
                      className="bg-blue-50 text-blue-600"
                      text={parseLabel(selectedFilters, key)}
                      onDelete={() => onDeleteFilter(key)}
                    />
                  )
              )}
          </div>
        </div>
      )}
      <Table
        loading={isLoading}
        className="select-none"
        thead={{ rows: getBedsHistoryHeadRows() }}
        tbody={{
          rows: bedsHistoryRows,
          data: bedsHistories,
        }}
        paginator={{
          pageSize,
          setPageSize,
          onPageChange,
          selectedPage,
          initialPage,
          rowCount: bedsHistoryTotal,
        }}
        wrapper={{
          className: 'overflow-y-visible rounded-t-none',
        }}
      />
    </>
  );
};

BedsHistoryTable.propTypes = {
  initialPage: PropTypes.number,
  bedsHistories: PropTypes.array,
  bedsHistoryTotal: PropTypes.number,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  selectedPage: PropTypes.number,
  onPageChange: PropTypes.func,
  isLoading: PropTypes.bool,
  setSearchValue: PropTypes.func,
  searchValue: PropTypes.string,
  selectedFilters: PropTypes.object,
  setSelectedFilters: PropTypes.func,
};

export default BedsHistoryTable;
