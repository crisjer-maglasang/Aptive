import { useState, useRef } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '@/hooks';
import FilterDropdownMenu from './FilterDropdownMenu';
import { DateRange } from '../DateRange';
import { Icon } from '@/components/common';

const AddFilterButton = ({
  label,
  filters,
  setFilters,
  filterTypeOptions,
  filterValueOptions,
  buttonClassName,
  labelClassName,
  iconClassName,
}) => {
  const [isFilterTypeOpen, setIsFilterTypeOpen] = useState(false);
  const [isFilterValueOpen, setIsFilterValueOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState('');
  const [selectedFilterType, setSelectedFilterType] = useState('');
  const [selectedFilterField, setSelectedFilterField] = useState('');

  const ChildMenu = {
    dropdown: FilterDropdownMenu,
    daterange: DateRange,
  }[selectedFilterType];

  const filteredOptions = filterValueOptions?.filter((option) =>
    option.name.toLowerCase().includes(filterOptions.toLowerCase())
  );

  const handleClickOutsideDropdownButton = () => {
    setIsFilterTypeOpen(false);
    setIsFilterValueOpen(false);
  };

  const ref = useRef();

  useOnClickOutside(ref, handleClickOutsideDropdownButton);

  return (
    <div className="relative" ref={ref}>
      <Button
        id="dropdownButton"
        className={buttonClassName}
        onClick={() => setIsFilterTypeOpen(!isFilterTypeOpen)}
        data-dropdown-toggle="dropdown"
      >
        <div className={labelClassName}>{label || 'Select item'}</div>
        <Icon className={iconClassName} icon="arrowDown" />
      </Button>
      {isFilterTypeOpen && (
        <div
          id="dropdown"
          className="absolute right-0 z-10 w-44 text-base list-none bg-white rounded-lg shadow-md border border-gray-200"
        >
          <ul className="divide-y" aria-labelledby="dropdownButton">
            {filterTypeOptions.map(
              ({ label, onClick, value, type, isHidden }, i) => {
                const onClickOption = () => {
                  onClick();
                  setIsFilterTypeOpen(false);
                  setIsFilterValueOpen(true);
                  setSelectedFilterField({ label: label, value: value });
                  setSelectedFilterType(type);
                };

                return isHidden ? null : (
                  <li key={i}>
                    <button
                      className="w-full py-2.5 px-4 text-sm text-gray-700 hover:bg-gray-200 font-['Inter'] font-normal leading-4 text-left"
                      onClick={onClickOption}
                      type="button"
                    >
                      {label}
                    </button>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
      {isFilterValueOpen && (
        <ChildMenu
          setFilterOptions={setFilterOptions}
          setIsFilterValueOpen={setIsFilterValueOpen}
          selectedFilterField={selectedFilterField}
          onCancelClick={() => setIsFilterValueOpen(false)}
          onClickDelete={() => {
            setIsFilterValueOpen(false);
            setSelectedOptions([]);
          }}
          options={filteredOptions}
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
};

AddFilterButton.propTypes = {
  filterTypeOptions: PropTypes.array,
  filterValueOptions: PropTypes.array,
  label: PropTypes.string,
  color: PropTypes.string,
  buttonClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  filters: PropTypes.array,
  setFilters: PropTypes.func,
};

AddFilterButton.defaultProps = {
  labelClassName:
    'text-gray-600 text-right font-normal sm:text-xs leading-none border-none shadow-none',
  buttonClassName: 'items-center',
  iconClassName: 'w-0 h-0',
  filterTypeOptions: [],
  filterValueOptions: [],
  filters: [],
  setFilters: () => {},
};

export default AddFilterButton;
