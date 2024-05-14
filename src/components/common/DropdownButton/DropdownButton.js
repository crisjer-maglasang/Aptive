import React, { Fragment, useState, useRef } from 'react'
import { Button } from '@/components'
import PropTypes from 'prop-types'

const DropdownButton = ({
  label,
  options,
  color,
  className,
  labelClassName,
  iconClassName,
}) => {

  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button id="dropdownButton"  className={className} color={color} onClick={() => setOpen(!open)} data-dropdown-toggle="dropdown">

          <div className={labelClassName}>
            {label || 'Select item'}
          </div>
          <svg className={iconClassName ? iconClassName : "ml-2 w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
      </Button>

      {open &&
        <div id="dropdown" className="absolute z-10 w-44 right-0 text-base list-none bg-white rounded divide-y shadow">
            <ul className="py-1 divide-y" aria-labelledby="dropdownButton">
              {options.map(({ label, onClick, isHidden }, i) => {
                const onClickOption = () => {
                  onClick();
                  setOpen(false);
                }
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
      }
    </div>
  )
}

DropdownButton.propTypes = {
  options: PropTypes.array
}

DropdownButton.defaultProps = {
  options: [{
    onClick: () => {console.log('Clicked')},
    label: "Option 1"
  }]
}

export default DropdownButton
