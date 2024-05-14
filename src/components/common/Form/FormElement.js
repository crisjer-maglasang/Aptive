import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  validateFieldOnBlur,
  validateFieldOnChange,
  format,
} from '../../../lib';
import { Icon } from '..';
import {
  File,
  Input,
  Select,
  TextArea,
  FormLabel,
  RadioGroup,
  generateBaseClasses,
} from '.';
const FormElement = (props) => {
  const {
    id,
    name,
    type,
    value,
    label,
    errors,
    onBlur,
    colSpan,
    onChange,
    required,
    parentName,
    tooltipMessage,
    formElementWrapperClassName,
  } = props;
  const formElementWrapperClasses = classNames(
    formElementWrapperClassName,
    `sm:col-span-${colSpan || 3}`
  );
  const elementWrapperClasses = classNames('mt-0.5 block rounded-md shadow-sm');
  const [fieldErrors, setFieldError] = useState([]);
  const [allErrors, setAllErrors] = useState([...fieldErrors, ...errors]);

  const parsedName = name.replace(/[[\]0-9']+/g, '');

  useEffect(() => {
    setAllErrors([...errors, ...fieldErrors]);
  }, [errors, fieldErrors]);
  const handleChange = (e) => {
    const formatted = format(parsedName, type, e.target.value);
    onChange(formatted);
    validateFieldOnChange(
      parsedName,
      parentName,
      formatted,
      allErrors,
      setFieldError
    );
  };
  const handleBlur = (e) => {
    onBlur(e);
    validateFieldOnBlur(
      parsedName,
      parentName,
      value,
      allErrors,
      setFieldError
    );
  };
  const changeHandlerMap = {
    checkbox: (e) => handleChange(e, allErrors),
    textArea: (e) => handleChange(e, allErrors),
    text: (e) => handleChange(e, allErrors),
    date: (e) => handleChange(e, allErrors),
    select: (e) => handleChange(e, allErrors),
    file: (e) => handleChange(e, allErrors),
    radio: onChange,
  };
  const updatedProps = {
    ...props,
    onChange: changeHandlerMap[type],
    onBlur: handleBlur,
    baseClasses: generateBaseClasses(type),
    setFieldError,
  };
  const elementMap = {
    checkbox: () => <Input {...updatedProps} />,
    textArea: () => <TextArea {...updatedProps} />,
    text: () => <Input {...updatedProps} />,
    date: () => <Input {...updatedProps} />,
    select: () => <Select {...updatedProps} />,
    file: () => <File {...updatedProps} />,
    radio: () => <RadioGroup {...updatedProps} />,
  };

  return (
    <div className={formElementWrapperClasses}>
      <div className="flex items-center">
        {label.length > 0 && (
          <FormLabel label={label} required={required} htmlFor={id} />
        )}
        {tooltipMessage && (
          <div className="ml-1">
            <Icon id={id} place="top" icon="info" message={tooltipMessage} />
          </div>
        )}
      </div>
      <div className={elementWrapperClasses}>{elementMap[type].call()}</div>
      {allErrors.length > 0 && <FormLabel errors={allErrors} htmlFor={id} />}
    </div>
  );
};

FormElement.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string,
  colSpan: PropTypes.number,
  error: PropTypes.array,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  formElementWrapperClassName: PropTypes.string,
};

FormElement.defaultProps = {
  label: '',
  required: false,
  id: '',
  type: '',
  colSpan: null,
  errors: [],
  name: '',
  onBlur: () => {},
  formElementWrapperClassName: '',
};

export default FormElement;
