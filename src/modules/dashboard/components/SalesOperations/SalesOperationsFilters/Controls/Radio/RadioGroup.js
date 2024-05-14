import PropTypes from 'prop-types'
import { createContext } from 'react'

export const RadioGroupContext = createContext({})

const RadioGroup = ({
  name,
  checked,
  onChange,
  children,
}) => (
  <RadioGroupContext.Provider value={{ name, checked, onChange }}>
    {children}
  </RadioGroupContext.Provider>
)

RadioGroup.defaultProps = {
  name: '',
  checked: '',
  onChange: () => {},
}

RadioGroup.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.string,
  onChange: PropTypes.func,
}

export default RadioGroup
