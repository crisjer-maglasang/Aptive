import PropTypes from 'prop-types';

import SortingDataTable from './SortingDataTable';
import useDataTableSearchBar from './DataTableSearchBar';
import { Fragment } from 'react';

const SearchableDataTable = ({
  topLeftChildren,
  data,
  getSearchField,
  searchPlaceholder,
  filters,
  ...props
}) => {
  const { searchedData, SearchBar } = useDataTableSearchBar({
    data,
    getSearchField,
    searchPlaceholder,
  });
  let filteringData = searchedData;
  const filterChildren = [];
  filters?.forEach((filter) => {
    const { filteredData, Filter } = filter(filteringData);
    filteringData = filteredData;
    filterChildren.push(Filter);
  });

  return (
    <>
      <div className="flex w-full mb-4 items-center">
        {topLeftChildren}
        <div className="flex flex-row space-x-2">
          {filterChildren.map((Filter, index) => (
            <Fragment key={index}>
              <Filter />
              {index < filterChildren.length - 1 && (
                <div className="flex-grow border-r border-gray-300" />
              )}
            </Fragment>
          ))}
        </div>
        <div className="flex-grow" />
        {SearchBar}
      </div>
      <SortingDataTable {...props} data={filteringData} />
    </>
  );
};

SearchableDataTable.propTypes = {
  topLeftChildren: PropTypes.node,
  data: PropTypes.array.isRequired,
  getSearchField: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  filters: PropTypes.array,
};

export default SearchableDataTable;
