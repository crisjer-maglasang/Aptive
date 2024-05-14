import { useState } from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
  autoComplete,
  error,
  id,
  name,
  onChange,
  options,
  required,
  value,
}) => {
  const [validationError, setValidationError] = useState(error);

  const optionsHtml = (options || []).map((option) => {
    return typeof option === 'object' ? (
      <option key={`${option.value}`} value={`${option.value}`}>
        {option.name}
      </option>
    ) : (
      <option key={`${option}`} value={`${option}`}>
        {option}
      </option>
    );
  });

  const validateRequired = (value) => {
    return !(required && !value);
  };

  const onChangeValue = (value) => {
    if (!validateRequired(value)) {
      setValidationError('Field is required');
    } else {
      setValidationError(null);
    }

    onChange && onChange(value);
  };

  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <select
          id={id || name}
          value={value}
          name={name}
          autoComplete={autoComplete}
          className={`${
            validationError
              ? 'focus:ring-red-500 focus:border-red-500 border-red-300 placeholder-red-300 focus:outline-none'
              : 'focus:ring-aptivegreen focus:border-aptivegreen border-gray-300 placeholder-gray-300'
          } shadow-sm block w-full sm:text-sm rounded-md`}
          onChange={(e) => onChangeValue(e.target.value)}
          aria-describedby={validationError ? `${name}-error` : null}
        >
          {options.map(({ name, value }) => {
            return (
              <option key={value} value={value}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
      {validationError ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {validationError}
        </p>
      ) : null}
    </div>
  );
};

SelectInput.propTypes = {
  autoComplete: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
};

export default SelectInput;
