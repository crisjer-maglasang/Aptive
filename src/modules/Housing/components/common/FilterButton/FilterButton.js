import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import FilterMenu from './FilterMenu';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '@/hooks';
import { TrashIcon } from '@heroicons/react/outline';
import {
  countNumberOfFilters,
  parseLabel,
} from '@/modules/Housing/modules/BedsHistory/lib';

const initialMiddleFilters = {
  default: '',
};

const FilterButton = ({
  label,
  color,
  buttonClassName,
  labelClassName,
  options,
  setSelectedFilters,
  selectedFilters,
}) => {
  const [open, setOpen] = useState(false);
  const [middleFilters, setMiddleFilters] = useState({});

  useEffect(() => {
    if (Object.keys(selectedFilters).length !== 0) {
      setMiddleFilters(selectedFilters);
    } else {
      setMiddleFilters(initialMiddleFilters);
    }
  }, [selectedFilters]);

  const handleClickOutsideDropdownButton = () => {
    setOpen(false);
  };

  const handleAddFilter = () => {
    setMiddleFilters((prevFilters) => {
      return { ...prevFilters, default: '' };
    });
  };

  const handleClickTrash = (index) => {
    setMiddleFilters((prevFilters) => {
      const newFilters = {};
      Object.keys(prevFilters).forEach((key, i) => {
        if (i !== index) {
          newFilters[key] = prevFilters[key];
        }
      });

      return newFilters;
    });
  };

  const handleClickCancel = () => {
    setOpen(false);
    setMiddleFilters(selectedFilters);
  };

  const handleClickSubmit = () => {
    setOpen(false);
    setSelectedFilters(middleFilters);
  };

  const isEnableSubmit = countNumberOfFilters(middleFilters) > 0;

  const ref = useRef();

  useOnClickOutside(ref, handleClickOutsideDropdownButton);

  return (
    <div className="relative" ref={ref}>
      <Button
        id="dropdownButton"
        className={buttonClassName}
        color={color}
        onClick={() => setOpen(!open)}
        data-dropdown-toggle="dropdown"
      >
        <div className={labelClassName}>{label || 'Select Filter'}</div>
      </Button>

      {open && (
        <div
          id="dropdown"
          className="absolute z-10 right-0 w-[290px] bg-white rounded-lg shadow-lg  text-xs  text-gray-600 font-normal divide-y divide-gray-200"
        >
          <div className="h-[42px] flex items-center">
            <p className="pl-4">Filter page by</p>
          </div>
          <div className="flex flex-col">
            {Object.keys(middleFilters).map((key, index) => {
              return (
                <div
                  key={index}
                  className="pt-4 px-4 pb-[5px] flex gap-4 items-center"
                >
                  <FilterMenu
                    index={index}
                    options={options}
                    label={parseLabel(middleFilters, key)}
                    setMiddleFilters={setMiddleFilters}
                    middleFilters={middleFilters}
                  />
                  <TrashIcon
                    onClick={() => handleClickTrash(index)}
                    className="w-6 h-6 font-light text-gray-300 cursor-pointer"
                  />
                </div>
              );
            })}
            <div className="flex justify-end mr-4 my-2">
              <button onClick={handleAddFilter}>+ Add filter</button>
            </div>
          </div>
          <div className="h-16 flex items-center justify-between">
            <button
              className="pl-4"
              onClick={() => setMiddleFilters(initialMiddleFilters)}
            >
              Clear all filters
            </button>
            <div className="flex pr-4 gap-[9px]">
              <Button
                onClick={handleClickCancel}
                className="border rounded-lg py-2 px-3 border-gray-200 font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleClickSubmit}
                color="blue"
                className="border rounded-lg py-2 px-3 border-gray-200 font-semibold"
                disabled={!isEnableSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FilterButton.propTypes = {
  label: PropTypes.any,
  color: PropTypes.string,
  buttonClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  options: PropTypes.array,
  setSelectedFilters: PropTypes.func,
  selectedFilters: PropTypes.object,
};

FilterButton.defaultProps = {
  color: 'white',
  buttonClassName:
    'px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex',
  labelClassName:
    'text-right text-xs font-normal font-["Inter"] leading-none flex items-center',
  options: [],
  setSelectedFilters: () => {},
  selectedFilters: {},
};

export default FilterButton;
