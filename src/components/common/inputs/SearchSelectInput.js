import React, { useCallback } from 'react';
import Select, { components } from 'react-select';
import classNames from 'classnames';
import { mergeClassName } from '@/lib/utils';

const Input = ({ ...props }) => {
  return (
    <components.Input {...props} className="!text-inherit" inputClassName="focus:ring-0" />
  );
};

const Option = ({ ...props }) => {
  const {
    isSelected,
    isFocused,
    children,
    innerProps,
  } = props;

  return (
    <div
      {...innerProps}
      className={classNames(
        'hover:bg-aptivegreen hover:text-white cursor-default select-none relative py-2 pl-3 pr-9',
        isSelected ? (isFocused ? 'bg-aptivegreen text-white font-semibold' : 'font-semibold') : 'text-black',
      )}
    >
      <span>{children}</span>
    </div>
  );
};

const style = {
  control: (base, state) => ({
    ...base,
    borderWidth: !state.isFocused ? '1px' : '2px',
    boxShadow: 'none',
    opacity: state.isDisabled ? 1 : 1,
    backgroundColor: 'white',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 1 : 1;
    const color = 'black';

    return { ...provided, opacity, color };
  },
};

const Control = ({ children, ...props }) => {
  const { isFocused } = props;

  return (
    <components.Control {...props} className={classNames(
      isFocused ? 'ring-2 border-b border-aptivegreen border-2' : 'border-aptivegray-light',
    )}
    >
      {children}
    </components.Control>
  );
};

export default function SearchSelectInput({ name, formValue, options, onChange, onBlur, disabled, className }) {
  const handleSelectChange = useCallback((item) => {
    if (onChange) {
      onChange({
        target: {
          value: item.value,
          name,
        },
      });
    }
  }, [name, onChange]);

  return (
    <Select
      className={mergeClassName('text-sm', className)}
      options={options}
      components={{ Input, Option, Control, IndicatorSeparator: null }}
      onChange={handleSelectChange}
      styles={style}
      onBlur={onBlur}
      value={options?.filter((option) => option.value === formValue)}
      maxMenuHeight={200}
      isDisabled={disabled}
    />
  );
}
