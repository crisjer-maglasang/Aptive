import { useMemo } from 'react';
import classNames from 'classnames';

const CustomRadioGroup = ({
  radioOptions,
  orientation,
  onChange,
  isOpen,
  outerClassName,
  innerClassName,
  panelWrapperClassName,
  radioWrapperClassName,
  radioClassName,
  labelClassName,
  childClassName,
  register,
  name,
  checked,
  disabled,
}) => {
  const outerClasses = useMemo(() => classNames(
    outerClassName,
    {
      'border': orientation === 'horizontal',
    },
    { 'shadow-sm rounded-md': isOpen === false },
    { 'rounded-t-lg shadow-0 border-b-0': isOpen },
    { 'border-b border-gray-300 rounded-md': isOpen === undefined },
    'bg-white',
  ), [
    outerClassName,
    orientation,
    isOpen,
  ]);

  const innerClasses = useMemo(() => classNames(
    innerClassName,
    { 'rounded-md': !isOpen && orientation === 'horizontal' },
    { 'space-y-1': orientation === 'vertical' },
    {
      'flex items-center space-x-6 border-b border-gray-200 px-3 py-1.5': orientation === 'horizontal',
    },
    { 'rounded-t-lg rounded-b-0': isOpen },
    { 'text-gray-400' : disabled },
  ), [
    orientation,
    isOpen,
    innerClassName,
  ]);

  const panelWrapperClasses = useMemo(() => classNames(
    panelWrapperClassName,
    {
      'flex items-center': orientation === 'vertical',
    },
  ), [panelWrapperClassName, orientation]);

  const radioWrapperClasses = useMemo(() => classNames(
    radioWrapperClassName,
    'flex items-center',
  ), [radioWrapperClassName]);

  const radioClasses = useMemo(() => classNames(
    radioClassName,
    'mr-2 focus:ring-aptivegreen focus:border-aptivegreen',
    { 'flex items-center': orientation === 'horizontal' },
    disabled ? 'cursor-default' : 'cursor-pointer',
  ), [orientation, radioClassName]);

  const labelClasses = useMemo(() => classNames(
    labelClassName,
    disabled ? 'cursor-default' : 'cursor-pointer',
  ), [labelClassName]);

  const childClasses = useMemo(() => classNames(
    childClassName,
  ), [childClassName]);

  return (
    <div className={outerClasses}>
      <fieldset className={innerClasses} disabled={disabled}>
        {radioOptions.map(({ label, value, id, child }, i) => {
          return (
            <div key={`${id}${i}`} className={panelWrapperClasses}>
              <div className={radioWrapperClasses}>
                <input
                  {...(register && { ...register(name) })}
                  id={id}
                  name={name}
                  type="radio"
                  className={radioClasses}
                  value={value}
                  {...(checked && { checked: checked === value })}
                  onChange={onChange}
                />
                <label className={labelClasses} htmlFor={id}>
                  {label}
                </label>
              </div>
              <div className={childClasses}>{child}</div>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
};

export default CustomRadioGroup;
