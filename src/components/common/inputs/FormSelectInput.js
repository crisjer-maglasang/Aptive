import FormInput from './FormInput';
import SelectInput from './SelectInput';
import PropTypes from 'prop-types';

const FormSelectInput = ({
  id,
  label,
  name,
  autoComplete,
  error,
  required,
  options,
  onChange,
  colSpan,
  value,
}) => {
  return (
    <FormInput htmlFor={id} label={label} colSpan={colSpan} required={required}>
      <SelectInput
        id={id}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        required={required}
        error={error}
        options={options}
      />
    </FormInput>
  );
};

FormSelectInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default FormSelectInput;
