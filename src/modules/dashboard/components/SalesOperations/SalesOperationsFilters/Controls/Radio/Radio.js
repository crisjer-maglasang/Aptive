import { mergeClassName } from '@/lib'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { RadioGroupContext } from '.'

const Radio = ({
  label,
  value,
  name,
  checked,
  onChange,
}) => {
  ; // A semicolon is required because compiler may consider brackets as a function call in some cases.
  ({ name = name, checked = checked, onChange = onChange } = useContext(RadioGroupContext))

  const id = uuidv4()
  const isChecked = value === checked

  return (
    <>
      <label
        htmlFor={id}
        className={
          mergeClassName(
            'flex items-center justify-center w-full p-4 border-2 bg-gray-50 border-gray-50 rounded text-gray-500 cursor-pointer',
            { 'hover:border-gray-200 hover:text-gray-600': !isChecked },
            { 'bg-white border-primary-300 text-gray-900': isChecked },
          )
        }
      >
        <input
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          onChange={onChange}
          type="radio"
          className="mr-2 border-gray-300 hover:border-gray-400 text-primary-300 cursor-pointer focus:ring-primary-300"
        />
        <span className="text-sm">{label}</span>
      </label>
    </>
  )
}

Radio.defaultProps = {
  name: '',
  checked: '',
  onChange: () => {},
}

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  checked: PropTypes.string,
  onChange: PropTypes.func,
}

export default Radio
