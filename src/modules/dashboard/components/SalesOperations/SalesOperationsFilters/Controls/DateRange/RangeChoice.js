import { mergeClassName } from '@/lib'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const RangeChoice = forwardRef(({
  id,
  label,
  value,
  checked,
  onChange,
}, ref) => {
  return (
    <label
      htmlFor={id}
      className={
        mergeClassName(
          'relative bg-white rounded-md py-1.5 px-3 text-sm text-gray-600 text-center hover:text-primary-300 cursor-pointer',
          'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-300',
          { 'bg-gray-100 text-primary-300 font-bold': value === checked },
        )
      }
    >
      <input
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        checked={value === checked}
        className="sr-only"
        type="radio"
        name="range"
        tabIndex={0}
      />
      {label}
    </label>
  )
})

RangeChoice.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default RangeChoice
