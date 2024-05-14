import { useMemo } from 'react';
import classNames from 'classnames';

const CustomSelect = (
  {
    id,
    formValue,
    value,
    register,
    name,
    autoComplete,
    className,
    onChange,
    selectOptions,
    ariaDescribedBy,
    hasError,
    baseClasses,
    disabled,
    onBlur,
  }) => {
  const classes = useMemo(() => classNames(
      className,
      'shadow-sm block w-full sm:text-sm rounded-md disabled:opacity-100 disabled:select-text',
      `${ hasError ? baseClasses?.errorClasses : baseClasses?.standardClasses }`,
      { 'text-gray-400': disabled },
    ),
    [baseClasses, className, hasError]
  );

  return (
    <>
      <select
        id={id}
        name={name}
        value={register ? formValue : value}
        {...(register &&  { ...register(name) })}
        autoComplete={autoComplete}
        className={classes}
        onChange={onChange}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError}
        disabled={disabled}
        {...onBlur && {onBlur}}
      >
        {selectOptions &&
        selectOptions.map(({ name: label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </>
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
export default CustomSelect;
