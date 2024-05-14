import FormInput from './FormInput';
import Text from './Text';
import PropTypes from 'prop-types';

const FormTextInput = ({
  id,
  label,
  name,
  type,
  autoComplete,
  placeholder,
  required,
  error,
  value,
  onKeyUp,
  onChange,
  onBlur,
  textAlign,
  height,
  validationRegex,
  colSpan,
  validateForm,
  isDisabled,
}) => {
  return (
    <FormInput htmlFor={id} label={label} colSpan={colSpan} required={required}>
      <Text
        id={id}
        name={name}
        textAlign={textAlign}
        height={height}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        error={error}
        value={value}
        validationRegex={validationRegex}
        onKeyUp={onKeyUp}
        onChange={onChange}
        onBlur={onBlur}
        validateForm={validateForm}
        isDisabled={isDisabled}
      />
    </FormInput>
  );
};

FormTextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  textAlign: PropTypes.string,
  height: PropTypes.number,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onKeyUp: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  validationRegex: PropTypes.string,
  colSpan: PropTypes.number,
};

export default FormTextInput;
