import classNames from 'classnames';

const TextArea = ({
  formValue,
  id,
  hasError,
  rows,
  onChange,
  onBlur,
  required,
  disabled,
  className,
  ariaDescribedBy,
  name,
  baseClasses,
  register,
}) => {
  const { errorClasses, standardClasses } = baseClasses;
  const classes = classNames(
    className,
    'shadow-sm block w-full sm:text-sm border rounded-md',
    `${hasError ? errorClasses : standardClasses}`
  );
  return (
    <>
      <textarea
        {...(register && { ...register(name) })}
        value={formValue}
        id={id}
        name={name}
        className={classes}
        rows={rows}
        onChange={onChange}
        {...onBlur && { onBlur }}
        required={required}
        disabled={disabled}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError}
      />
    </>
  );
};

export default TextArea;
