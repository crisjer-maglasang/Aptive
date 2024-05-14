import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';

const TextInput = ({
  id,
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
  max,
  validateForm,
  rows,
  isDisabled,
}) => {
  const [validationError, setValidationError] = useState(error);

  useEffect(() => {
    if (validateForm === true) {
      onChangeValue(value);
    }
  }, [validateForm]);

  const validateRequired = (value) => {
    return !(required && !value.trim());
  };

  const validate = (value) => {
    if (!validationRegex) {
      return true;
    }

    const re = new RegExp(validationRegex);
    return re.test(value);
  };

  const onChangeValue = (value) => {
    let error = null;

    if (!validateRequired(value)) {
      error = 'Field is required';
    } else if (!validate(value)) {
      error = 'Please enter a valid value';
    }

    setValidationError(error);
    onChange && onChange(value, error);
  };

  const onBlurField = (e) => {
    if (onBlur && typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        {type === 'textarea' ? (
          <textarea
            id={id || name}
            className={`${
              validationError || error
                ? 'focus:ring-red-500 focus:border-red-500 border-red-300 placeholder-red-300 focus:outline-none'
                : 'focus:ring-aptivegreen focus:border-aptivegreen border-gray-100 placeholder-gray-100'
            } ${textAlign} h-${height} max-w-lg shadow-sm block w-full sm:text-sm border rounded-md`}
            rows={rows}
            onKeyUp={(e) => {onKeyUp && onKeyUp(e)}}
            onChange={(e) => onChangeValue(e.target.value)}
            value={value || ''}
            required={required}
          />
        ) : (
          <input
            id={id || name}
            name={name}
            type={type || 'text'}
            autoComplete={autoComplete}
            className={`${
              validationError || error
                ? 'focus:ring-red-500 focus:border-red-500 border-red-300 placeholder-red-300 focus:outline-none'
                : 'focus:ring-aptivegreen focus:border-aptivegreen border-gray-300 placeholder-gray-300'
            } ${textAlign} h-${height} shadow-sm block w-full sm:text-sm rounded-md`}
            value={value}
            onKeyUp={(e) => {onKeyUp && onKeyUp(e)}}
            onChange={(e) => onChangeValue(e.target.value)}
            onBlur={(e) => onBlurField(e.target.value)}
            placeholder={placeholder}
            aria-describedby={validationError ? `${name}-error` : null}
            aria-invalid={validationError ? 'true' : 'false'}
            max={max || ''}
            disabled={isDisabled}
          />
        )}
        {validationError || error ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
      {validationError || error ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {validationError || error}
        </p>
      ) : null}
    </div>
  );
};

export default TextInput;
