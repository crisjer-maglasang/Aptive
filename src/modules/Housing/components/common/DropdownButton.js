import { useState, useRef } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '@/hooks';
import classNames from 'classnames';

const DropdownButton = ({
  label,
  options,
  color,
  buttonClassName,
  labelClassName,
  iconClassName,
  onChange,
  dropdownPosition,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOutsideDropdownButton = () => {
    setOpen(false);
  };

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
        <div className={labelClassName}>{label}</div>
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

      {open && (
        <div
          id="dropdown"
          className={classNames(
            'absolute z-10 w-44 text-base list-none bg-white rounded divide-y shadow-lg',
            dropdownPosition === 'left' ? 'right-0' : 'left-0'
          )}
        >
          <ul className="py-1 divide-y" aria-labelledby="dropdownButton">
            {options.map(({ label, isHidden, ...option }, i) => {
              const onClickOption = (event) => {
                onChange(option);
                setOpen(false);
              };

              return isHidden ? null : (
                <li key={i}>
                  <button
                    className="w-full py-2 px-4 text-sm hover:bg-gray-100 text-left"
                    onClick={onClickOption}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

DropdownButton.propTypes = {
  options: PropTypes.array,
  label: PropTypes.any,
  color: PropTypes.string,
  buttonClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  onChange: PropTypes.func,
  dropdownPosition: PropTypes.string,
};

DropdownButton.defaultProps = {
  options: [],
  label: 'Select item',
  color: 'white',
  buttonClassName:
    'px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex',
  labelClassName: 'text-right text-xs font-normal font-["Inter"] leading-none',
  iconClassName: 'w-3 h-3 relative',
  onChange: () => {},
  dropdownPosition: 'right',
};

export default DropdownButton;
