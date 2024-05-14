import FilterValueHeader from './FilterValueHeader';
import FilterValueFooter from './FilterValueFooter';
import classNames from 'classnames';
import { Icon } from '@/components/common/Icon';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

const FilterDropdownMenu = ({
  options,
  setFilterOptions,
  onClickDelete,
  onCancelClick,
  setSelectedOptions,
  selectedOptions,
  filters,
  setFilters,
  selectedFilterField,
  setIsFilterValueOpen,
  index,
}) => {
  const [isFilterValid, setIsFilterValid] = useState(selectedOptions.length !== 0);

  useEffect(() => {
    setIsFilterValid(selectedOptions.length !== 0);
  }, [selectedOptions]);

  const isSelected = (filterValue) => {
    return !!selectedOptions.find(
      (el) => JSON.stringify(el) === JSON.stringify(filterValue),
    );
  };

  const onApplyClick = () => {
    if(index === undefined) {
      const indexOfDuplicatedField = filters.findIndex(
        (el) => el.type.value === selectedFilterField.value,
      );
      if (indexOfDuplicatedField !== -1) {
        setFilters([
          ...filters.slice(0, indexOfDuplicatedField),
          ...filters.slice(indexOfDuplicatedField + 1),
          { type: selectedFilterField, value: selectedOptions },
        ]);
      } else {
        setFilters([
          ...filters,
          { type: selectedFilterField, value: selectedOptions },
        ]);
      }
      setSelectedOptions([]);
      setIsFilterValueOpen(false);
    }else{
      const newFilters = [...filters];
      newFilters[index].value = selectedOptions;
      setFilters(newFilters);
      setIsFilterValueOpen(false);
    }
  };

  return (
    <div
      id="dropdown"
      className="absolute right-0 z-10 w-56 text-base list-none bg-white rounded-lg shadow-md border border-gray-200"
    >
      <FilterValueHeader
        setFilterOptions={setFilterOptions}
        onClickDelete={onClickDelete}
      />
      <ul
        className="divide-y max-h-52 overflow-y-auto no-scrollbar"
        aria-labelledby="dropdownButton"
      >
        {options &&
          options.map(({ name, value }, i) => (
            <li key={i}>
              <div className="flex py-2.5 gap-3">
                <div
                  onClick={
                    selectedOptions.some(
                      (option) =>
                        JSON.stringify(option) ===
                        JSON.stringify({ label: name, value: value }),
                    )
                      ? () =>
                        setSelectedOptions(
                          selectedOptions.filter(
                            (el) =>
                              JSON.stringify(el) !==
                              JSON.stringify({ label: name, value: value }),
                          )
                        )
                      : () =>
                        setSelectedOptions([
                          ...selectedOptions,
                          { label: name, value: value },
                        ])
                  }
                  className={classNames(
                    isSelected({ label: name, value: value })
                      ? 'text-white'
                      : 'text-aptiveblue',
                    'inset-y-0 flex items-center pl-4',
                  )}
                >
                  {isSelected({ label: name, value: value }) ? (
                    <Icon
                      icon="checkBoxSelected"
                      className="w-4 h-4 text-aptiveblue inline"
                    />
                  ) : (
                    <Icon
                      icon="checkBoxUnselected"
                      className="w-4 h-4 text-gray-600 inline"
                    />
                  )}
                </div>
                <div className="text-sm text-gray-600 font-['Inter'] font-normal leading-4 text-left">
                  {name}
                </div>
              </div>
            </li>
          ))}
      </ul>
      <FilterValueFooter
        onCancelClick={onCancelClick}
        onApplyClick={onApplyClick}
        isFilterValid={isFilterValid}
      />
    </div>
  );
};

FilterDropdownMenu.propTypes = {
  options: propTypes.array,
  setFilterOptions: propTypes.func,
  onClickDelete: propTypes.func,
  onCancelClick: propTypes.func,
  setSelectedOptions: propTypes.func,
  selectedOptions: propTypes.array,
  filters: propTypes.array,
  setFilters: propTypes.func,
  selectedFilterField: propTypes.object,
  setIsFilterValueOpen: propTypes.func,
  index: propTypes.number,
};

export default FilterDropdownMenu;
