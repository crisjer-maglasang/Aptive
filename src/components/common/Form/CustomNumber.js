import { useMemo } from 'react';
import classNames from 'classnames';

const CustomNumber = ({
  id,
  name,
  disabled,
  formValue,
  value,
  hasError,
  min,
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
  step,
  required,
}) => {
  const classes = useMemo(
    () =>
      classNames(
        className,
        'shadow-sm block w-full sm:text-sm rounded-md',
        `${
          hasError && baseClasses
            ? baseClasses?.errorClasses
            : baseClasses?.standardClasses
        }`
      ),
    [hasError, className, baseClasses]
  );

  const handleWheel = (event) => {
    event.target.blur();
    setTimeout(() => event.target.focus(), 0);
  };

  return (
    <div className="flex">
      {childOrientation === 'left' ? children : null}
      <input
        {...(register && { ...register(name) })}
        id={id}
        min={min}
        max={max}
        name={name}
        type={'number'}
        value={register ? formValue : value}
        className={classes}
        {...(onChange && { ...{ onChange } })}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError}
        autoComplete={autoComplete}
        {...(onBlur && { onBlur })}
        step={step || 0.01}
        required={required}
        onWheel={handleWheel}
      />
      {childOrientation === 'right' ? children : null}
    </div>
  );
};

export default CustomNumber;
