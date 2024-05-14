import { useState, useRef } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '@/hooks';
import FilterDropdownMenu from './FilterDropdownMenu';
import { DateRange } from '../DateRange';

const FilterDropdownButton = ({
  filters,
  setFilters,
  index,
  filterValueOptions,
  buttonClassName,
  labelClassName,
  iconClassName,
  type,
}) => {
  const [isFilterValueOpen, setIsFilterValueOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    filters[index]?.value || []
  );
  const [filterOptions, setFilterOptions] = useState('');

  const ChildMenu = {
    dropdown: FilterDropdownMenu,
    daterange: DateRange,
  }[type];

  const handleOnClickDelete = () => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
    setIsFilterValueOpen(false);
  };

  const filteredOptions = filterValueOptions?.filter((option) =>
    option.name.toLowerCase().includes(filterOptions.toLowerCase())
  );

  const handleClickOutsideDropdownButton = () => {
    setIsFilterValueOpen(false);
  };

  const ref = useRef();

  useOnClickOutside(ref, handleClickOutsideDropdownButton);

  return (
    <div className="relative" ref={ref}>
      <Button
        id="dropdownButton"
        className={buttonClassName}
        onClick={() => setIsFilterValueOpen(!isFilterValueOpen)}
        data-dropdown-toggle="dropdown"
      >
        <div className={labelClassName}>
          {`${filters[index]?.type.label}: ${filters[index]?.value[0].label !== '' ? filters[index]?.value[0].label : filters[index]?.value[1].label !== '' ? filters[index]?.value[1].label : 'All'}`}
        </div>
        <svg
          className={iconClassName ? iconClassName : 'ml-2 w-4 h-4'}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>
      {isFilterValueOpen && (
        <ChildMenu
          setFilterOptions={setFilterOptions}
          setIsFilterValueOpen={setIsFilterValueOpen}
          onClickDelete={handleOnClickDelete}
          onCancelClick={() => setIsFilterValueOpen(false)}
          options={filteredOptions}
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
          filters={filters}
          setFilters={setFilters}
          index={index}
        />
      )}
    </div>
  );
};

FilterDropdownButton.propTypes = {
  filters: PropTypes.array,
  setFilters: PropTypes.func,
  index: PropTypes.number,
  filterValueOptions: PropTypes.array,
  label: PropTypes.string,
  color: PropTypes.string,
  buttonClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  type: PropTypes.string,
};

FilterDropdownButton.defaultProps = {
  filterValueOptions: [
    {
      name: 'Option 1',
    },
    {
      name: 'Option 2',
    },
  ],
  labelClassName:
    'text-gray-600 text-right font-normal sm:text-xs leading-none border-none shadow-none',
  buttonClassName: 'items-center',
};

export default FilterDropdownButton;
