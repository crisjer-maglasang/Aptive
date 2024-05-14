import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Select } from '@/components/common';
import Filter from './Filter';

const Filters = ({ filterOptions, filters }) => {
  const [searchParams] = useSearchParams();
  const [selectedFilters, setFilters] = useState([]);

  const options = useMemo(
    () => filterOptions.filter(({ value }) => !selectedFilters.includes(value)),
    [filterOptions, selectedFilters]
  );

  const remove = (field) => {
    setFilters((oldFilters) => oldFilters.filter((ff) => ff !== field));
  };

  useEffect(() => {
    filterOptions.forEach((filter) => {
      const val = searchParams.get(filter.value);
      if (val !== null && !selectedFilters.includes(filter.value)) {
        setFilters((oldFields) => [...oldFields, filter.value]);
      }
    });
  }, [filterOptions, searchParams, selectedFilters]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col">
        <div>Filters</div>
        <div className="w-64">
          <Select
            name="filters"
            options={options}
            onChange={({ target: { value } }) => {
              setFilters((oldFields) => [...oldFields, value]);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        {selectedFilters.map((field) => (
          <Filter
            key={field}
            Edit={filters[field]}
            remove={() => remove(field)}
            name={field}
            label={filterOptions.find(({ value }) => value === field)?.label}
          />
        ))}
      </div>
    </div>
  );
};

Filters.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
};

export default Filters;
