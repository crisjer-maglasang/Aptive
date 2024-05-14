import { useMemo, useState, useRef } from 'react';
import classNames from 'classnames';
import { useOnClickOutside } from '@/hooks';

const CustomInput = ({
  id,
  name,
  type,
  disabled,
  formValue,
  value,
  hasError,
  max,
  className,
  onChange,
  register,
  childOrientation,
  ariaDescribedBy,
  placeholder,
  autoComplete,
  baseClasses,
  children,
  onBlur,
  required,
  onKeyDown,
  onHoverClick,
  autoDropdownClickAction,
  autoDropdownOptions,
}) => {
  const [hovered, setHovered] = useState(false);
  const [autoDropdownVisible, setAutoDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClickOutsideDropdownButton = () => {
    setAutoDropdownVisible(false);
  };

  const ref = useRef();

  useOnClickOutside(ref, handleClickOutsideDropdownButton);
  
  const handleAutoDropdownClick = (option) => {
    setAutoDropdownVisible(false);
    autoDropdownClickAction(option);
  };

  const handleOnChange = (e) => {
    if (autoDropdownOptions && autoDropdownOptions.length) {
      setAutoDropdownVisible(true);
      setInputValue(e.target.value);
    } else {
      onChange(e);
    }
  };

  const filteredOptions = autoDropdownOptions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const classes = useMemo(() => {
    const base =
      type !== 'checkbox'
        ? baseClasses?.[hasError ? 'errorClasses' : 'standardClasses'] || ''
        : '';

    return classNames(
      'shadow-sm block w-full sm:text-sm rounded-md',
      base,
      className,
      { 'text-gray-400': disabled },
    );
  }, [hasError, className, baseClasses, type]);

  return (
    <div className="flex relative">
      {childOrientation === 'left' ? children : null}
      <input
        {...(register && { ...register(name) })}
        id={id}
        max={max}
        name={name}
        type={type}
        value={register ? formValue : value}
        className={classes}
        onChange={autoDropdownClickAction? handleOnChange : onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError}
        autoComplete={autoComplete}
        {...(onBlur && { onBlur })}
        required={required || false}
        onKeyDown={onKeyDown}
        onMouseEnter={onHoverClick ? () => setHovered(true) : () => {}}
      />
      {childOrientation === 'right' ? children : null}
      {onHoverClick && hovered && (
        <div
          className="absolute inset-0 flex justify-center items-center cursor-pointer bg-transparent border hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-md"
          onClick={onHoverClick}
          onMouseLeave={onHoverClick ? () => setHovered(false) : () => {}}
        >
          Unassign
        </div>
      )}
      {autoDropdownOptions && autoDropdownOptions.length && autoDropdownVisible && (
        <div ref={ref} className="absolute w-56 top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAutoDropdownClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Warning!
 *
 * Don't use `React.memo()` in order to optimize the form component in conjunction with React Hook Form.
 *
 * The `reset()` function from the `useForm()` won't reset the value of the DOM input element during the form reset process.
 * It instead assumes that the component will be re-rendered and a correct value will be set during DOM input element registration.
 */
export default CustomInput;
