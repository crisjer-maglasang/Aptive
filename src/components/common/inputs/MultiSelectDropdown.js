import React, { useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Icon } from '../Icon'
import { addFsExcludeClass } from '@/lib/utils';

const MultiSelectDropdown = ({
  label,
  items,
  setSelected,
  initialSelections = [],
  displayProp = 'name',
  idProp = 'id',
  selectAllOption = true
}) => {
  const [allOptions, setAllOptions] = useState(items);
  const [selectAll, setSelectAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [displayedSelection, setDisplayedSelection] = useState('');

  const displayRef = useRef();

  const isSelected = (value) => {
    if (selectAll) {
      return true;
    }

    return !!selectedOptions.find((el) => el === value);
  };

  const onSelect = (value) => {
    if (!isSelected(value)) {
      handleSelect(value);
    } else {
      handleDeselect(value);
    }
  };

  const hasSpaceToDisplayOption = (displayElements, option) => {
    const tempElements = [
      ...displayElements,
    ];
    tempElements.push(option);
    displayRef.current.innerText = tempElements.join(', ');
    const scrollWidth = displayRef.current.scrollWidth;
    const offsetWidth = displayRef.current.offsetWidth;

    return scrollWidth <= offsetWidth;
  };

  const createDisplayedSelections = (options) => {
    const displayElements = [];
    let plusMessage = '';
    for (let i = 0 ; i < options.length ; i++) {
      const option = options[i];
      if (hasSpaceToDisplayOption(displayElements, option[displayProp])) {
        displayElements.push(option[displayProp]);
      } else {
        plusMessage = ` + ${(options.length - displayElements.length)} more`;
        if (!hasSpaceToDisplayOption(displayElements, plusMessage)) {
          displayElements.pop();
          plusMessage = ` + ${(options.length - displayElements.length)} more`;
        }
        break;
      }
    }

    const display = displayElements.join(', ') + plusMessage;
    setDisplayedSelection(display);
  }
  const updateSelectionValues = (selections) => {
    setSelectedOptions(selections);
    createDisplayedSelections(selections);
    setSelected(selections);
    if (selections.length === allOptions.length) {
      setSelectAll(true);
    }
  }
  const handleSelect = (value) => {
    setSelectAll(false);
    let selectedOptionsUpdated;
    if (value.id === 'SELECT_ALL_OPTIONS') {
      setSelectAll(true);
      selectedOptionsUpdated = [...allOptions]
    } else {
      selectedOptionsUpdated = [
        ...selectedOptions,
        allOptions.find((el) => el === value),
      ];
    }

    updateSelectionValues(selectedOptionsUpdated);
    setIsOpen(true);
  };

  const handleDeselect = (value) => {
    setSelectAll(false);
    let selectedOptionsUpdated;
    if (value.id === 'SELECT_ALL_OPTIONS') {
      selectedOptionsUpdated = [];
    } else {
      selectedOptionsUpdated = selectedOptions.filter((el) => el !== value);
    }
    updateSelectionValues(selectedOptionsUpdated);
    setIsOpen(true);
  };

  const SelectAllOption = ({ onClick }) => {
    if (selectAllOption) {
      const value = {
        id: 'SELECT_ALL_OPTIONS',
        [displayProp]: 'Select All'
      }

      return (
        <MultiSelectOption
          value={value}
          onClick={onClick}
          key={value.id}
        />
      )
    }

    return null
  }

  const MultiSelectOption = ({ value, onClick }) => {
    return (
      <li
        role="option"
      >
        <div
          className="flex py-2"
        >
          <div
            onClick={() => onClick(value)}
            className={classNames(
              isSelected(value) ? 'text-white' : 'text-aptivegreen',
              'inset-y-0 flex items-center px-4'
            )}
          >
           {isSelected(value) ?
             <Icon icon="checkBoxSelected" className="w-4 h-4 text-aptivegreen inline"/>
             :
             <Icon icon="checkBoxUnselected" className="w-4 h-4 text-gray-600 inline"/>
           }
          </div>
          <div className={classNames(isSelected(value) ? 'font-semibold' : 'font-normal text-gray-700', addFsExcludeClass('block truncate'))}>
            {value[displayProp]}
          </div>
        </div>
      </li>
    )
  }

  useEffect(() => {
    const initialSelectedOptions = [];
    for(const selectionId of initialSelections) {
      const selectedItem = items.find((item) => item[idProp] === selectionId);
      if(selectedItem) {
        initialSelectedOptions.push(selectedItem);
      }
    }
    updateSelectionValues(initialSelectedOptions);
  }, [initialSelections]);

  return (
    <div className=" w-full">
      <label
        className="block text-sm w-full font-medium text-gray-700">
        {label}
      </label>
      <button
        className="bg-white relative h-9 w-full border rounded-md shadow-sm pl-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm"
        onClick={() => {setIsOpen(!isOpen)}}
      >
        <div className="flex">
          <div className={addFsExcludeClass('flex-1 block overflow-hidden whitespace-nowrap')} ref={displayRef}>{displayedSelection}</div>
          <div className="inset-y-0 right-0 flex-none items-center pr-2 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </div>
        </div>
      </button>
      <Transition
        unmount={false}
        show={isOpen}
        as="div"
        className="relative w-full"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ul
          role="listbox"
          className="w-full absolute touch-pan-auto z-[99999] mt-1  bg-white shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <SelectAllOption
            onClick={onSelect}
          />
          {allOptions?.map((item, i) => (
            <MultiSelectOption
              key={`selectOption-${i}`}
              onClick={onSelect}
              value={item}
            />
          ))}
        </ul>
      </Transition>
    </div>
  );
};

export default MultiSelectDropdown;
