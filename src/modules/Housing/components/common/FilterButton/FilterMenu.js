import React, { useState, useRef, useCallback, useEffect } from 'react';
import Button from '../Button';
import { SearchBar } from '@/components/common';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '@/hooks';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { DateRange } from '@/modules/dashboard/components/SalesOperations/SalesOperationsFilters/Controls';

const FilterMenu = ({
  label,
  options,
  color,
  buttonClassName,
  labelClassName,
  iconClassName,
  setMiddleFilters,
  middleFilters,
  index,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const btnRefs = useRef([]);
  const menuRef = useRef();

  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, options.length);
    btnRefs.current = [
      ...btnRefs.current,
      ...new Array(Math.max(options.length - btnRefs.current, 0)),
    ];
  }, [options.length]);

  const toggleDisclosure = (index) => {
    btnRefs.current.forEach((btnRef, i) => {
      if (i !== index) {
        btnRef.click();
      }
    });
  };

  const handleChooseItem = (name, value) => {
    setMiddleFilters((prevFilters) => {
      const newFilters = {};
      Object.keys(prevFilters).forEach((key, i) => {
        if (i === index) {
          newFilters[name] = value;
        } else {
          newFilters[key] = prevFilters[key];
        }
      });

      return newFilters;
    });
    setIsMenuOpen(false);
  };

  const onDatesChange = useCallback((event) => {
    handleChooseItem(event.target.name, event.target.value);
  }, []);

  const handleClickOutsideDropdownButton = () => {
    setIsMenuOpen(false);
  };

  useOnClickOutside(menuRef, handleClickOutsideDropdownButton);

  return (
    <div>
      <Button
        id="dropdownButton"
        className={buttonClassName}
        color={color}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        data-dropdown-toggle="dropdown"
      >
        <div className={labelClassName}>{label}</div>
        <ChevronDownIcon
          className={iconClassName ? iconClassName : 'ml-2 w-4 h-4'}
        />
      </Button>

      {isMenuOpen && (
        <div
          id="dropdown"
          ref={menuRef}
          className="absolute z-20 w-[218px] text-base list-none bg-white rounded divide-y shadow-lg"
        >
          <ul className="py-1 divide-y" aria-labelledby="dropdownButton">
            {options.map(({ name, subItems }, i) => {
              return (
                <Disclosure as="li" key={i}>
                  {({ open, close }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          'w-full py-2 px-2 text-sm text-left flex justify-between items-center',
                          open && ' text-gray-900'
                        )}
                        onClick={() => toggleDisclosure(i)}
                      >
                        {name}
                        <ChevronDownIcon
                          className={classNames(
                            'ml-2 w-4 h-4',
                            open && 'rotate-180 transform h'
                          )}
                        />
                      </Disclosure.Button>
                      <Transition
                        show={open}
                        enter="transition duration-200 ease-out"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition duration-200 ease-in"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Disclosure.Panel className="text-sm divide-y border-t-[1px] bg-gray-50 text-gray-600">
                          {Array.isArray(subItems) &&
                            subItems.map(({ value }, j) => (
                              <div
                                key={j}
                                onClick={() => handleChooseItem(name, value)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              >
                                {value}
                              </div>
                            ))}
                          {subItems === 'searchForm' && (
                            <div className="p-1">
                              <SearchBar
                                searchText=""
                                placeholder="Search"
                                inputName={name}
                                onSearchClick={({ searchText }) =>
                                  handleChooseItem(name, searchText)
                                }
                                inputClassName="w-[170px] shadow-sm block sm:text-sm border-r-0 rounded-md rounded-r-none border-gray-300 focus:border-aptiveblue focus:border-r-2 focus:border-r-aptiveblue focus:outline-none focus:ring-1 focus:ring-aptiveblue"
                                iconClassName="px-2 border-l-0 rounded-l-none shadow-sm border-gray-300"
                              />
                            </div>
                          )}
                          {subItems === 'dateRange' && (
                            <div className="p-1">
                              <DateRange
                                name={name}
                                value={middleFilters[name] || '__default'}
                                onChange={onDatesChange}
                              />
                            </div>
                          )}
                        </Disclosure.Panel>
                      </Transition>
                      <button
                        ref={(ref) => {
                          btnRefs.current[i] = ref;
                        }}
                        onClick={() => {
                          close();
                        }}
                        className="hidden"
                      />
                    </>
                  )}
                </Disclosure>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

FilterMenu.propTypes = {
  options: PropTypes.array,
  label: PropTypes.any,
  color: PropTypes.string,
  buttonClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  setMiddleFilters: PropTypes.func,
  middleFilters: PropTypes.object,
  index: PropTypes.number,
};

FilterMenu.defaultProps = {
  options: [],
  label: 'Select an option',
  color: 'white',
  buttonClassName:
    'px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex w-[218px] justify-between',
  labelClassName:
    'text-right text-xs font-normal font-["Inter"] leading-none text-gray-600 overflow-x-hidden  whitespace-nowrap no-scrollbar',
  iconClassName: 'w-3 h-3 relative',
  setMiddleFilters: () => {},
  middleFilters: {},
  index: 0,
};

export default FilterMenu;
