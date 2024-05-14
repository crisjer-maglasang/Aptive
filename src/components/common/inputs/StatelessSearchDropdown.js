import React, { useEffect, useMemo, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';
import { CustomErrorMessage, generateBaseClasses } from '../Form';
import classNames from 'classnames';

export default function StatelessSearchDropdown({
  label,
  items,
  displayProp = 'name',
  selected,
  onChange,
  button,
  error,
  className,
}) {
  const splitIndex = 20;
  const [displayItems, setDisplayItems] = useState(items.slice(0, splitIndex));
  const [hiddenItems, setHiddenItems] = useState(items.slice(splitIndex));
  const [searchText, setSearchText] = useState('');

  const { errorClasses, standardClasses } = useMemo(() => generateBaseClasses('select'), ['select']);

  const onSelect = (item) => {
    onChange(item);
  };

  const onSearchTextChanged = (e) => {
    setSearchText(e.target.value);
  };

  const scrollHandler = (e) => {
    const element = e.target;
    if(element.scrollTop + element.clientHeight > element.scrollHeight - 20) {
      // Adds more items to render (if there are still hidden items)
      if(hiddenItems.length) {
        let newDisplayItems = [...displayItems];
        const newHiddenItems = [...hiddenItems];
        const itemsToAdd = newHiddenItems.splice(0, splitIndex);
        newDisplayItems = newDisplayItems.concat(itemsToAdd);
        setDisplayItems(newDisplayItems);
        setHiddenItems(newHiddenItems);
      }
    }
  };

  useEffect(() => {
    const tempFilteredItems = searchText !== '' ? items.filter(
      (item) => item[displayProp].toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
    ) : items;
    setDisplayItems(tempFilteredItems.slice(0, splitIndex));
    setHiddenItems(tempFilteredItems.slice(splitIndex));
  }, [displayProp, items, searchText]);

  return (
    <Listbox value={selected} onChange={onSelect}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm w-full font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="mt-1 flex w-full">
            <div className="relative w-full">
              <Listbox.Button
                className={classNames(
                  className,
                  error ? errorClasses : standardClasses,
                  'bg-white relative h-full w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm',
                )}
                open={open}
              >
                <span className="block truncate">{selected ? selected[displayProp] : ''}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                unmount={false}
                show={open}
                as="div"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >

                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  onScroll={scrollHandler}
                >
                  <div className="p-1 flex shadow-sm sticky top-0 z-30 bg-white">
                    <div className="relative flex items-stretch flex-grow focus-within:z-20">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="searchText"
                        id="searchText"
                        className="border border-gray-300 bg-white focus:ring-aptivegreen focus:border-aptivegreen block w-full rounded-md pl-10 sm:text-sm border-gray-300"
                        placeholder="Search"
                        onChange={onSearchTextChanged}
                        onKeyDown={(e) => {
                          if (e.code === 'Space') {
                            e.stopPropagation();
                          }
                        }}
                        value={searchText}
                        autoComplete="none"
                      />
                    </div>
                  </div>
                  {displayItems.map((item) => (
                    <Listbox.Option
                      key={item.id || item.value}
                      className={({ active }) =>
                        classNames(
                          className,
                          active ? 'text-white bg-aptivegreen' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9',
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {item[displayProp]}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-aptivegreen',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
            <div className="ml-1">
              {button}
            </div>
          </div>
          {error?.message && (
            <CustomErrorMessage text={error?.message} />
          )}
        </>
      )}
    </Listbox>
  );
}
