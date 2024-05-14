import { Loader } from '@/components';
import { mergeClassName } from '@/lib';
import PropTypes from 'prop-types';
import { forwardRef, useCallback, useMemo } from 'react';
import { components, default as BaseSelect } from 'react-select';

const Control = ({
  isFocused,
  children,
  selectProps: { hasError },
  ...props
}) => (
  <components.Control
    {...props}
    className={mergeClassName(
      'bg-white border rounded-md text-sm',
      { 'ring-1 ': isFocused },
      { 'text-gray-500': !hasError },
      { 'text-red-300': hasError },
      { 'border-gray-300': !isFocused && !hasError },
      { 'border-red-300': !isFocused && hasError },
      { 'ring-primary-300 border-primary-300': isFocused && !hasError },
      { 'ring-red-500 border-red-500': isFocused && hasError }
    )}
  >
    {children}
  </components.Control>
);

const Input = ({ ...props }) => (
  <components.Input {...props} inputClassName="focus:ring-0" />
);

const LoadingIndicator = () => <Loader size={6} />;

const IndicatorSeparator = () => null;

const Menu = ({ children, ...props }) => (
  <components.Menu
    {...props}
    className="border border-gray-300 text-sm text-gray-600"
  >
    {children}
  </components.Menu>
);

const MenuList = ({ children, ...props }) => (
  <components.MenuList {...props} className="divide-y divide-gray-100">
    {children}
  </components.MenuList>
);

const Option = ({ isSelected, isFocused, children, ...props }) => (
  <components.Option
    {...props}
    className={mergeClassName({
      'bg-gray-50': isSelected,
      'text-primary-300': isFocused || isSelected,
    })}
  >
    {children}
  </components.Option>
);

const Select = ({
  inputId,
  name,
  value,
  options,
  defaultOption,
  onChange,
  isLoading,
  className,
  styles,
  isMulti,
  closeMenuOnSelect,
  required,
  hasError,
  onInputChange,
  filterOption,
  defaultInputValue,
  placeholder,
  disabled,
  ref,
}) => {
  const onChangeWrapper = useCallback(
    (newValue) => {
      if (Array.isArray(newValue)) {
        newValue = newValue.map(({ value }) => value);
      } else {
        newValue = newValue?.value;
      }

      onChange({
        target: {
          name: name,
          value: newValue,
        },
      });
    },
    [name, onChange]
  );

  const defaultStyles = useMemo(
    () => ({
      control: (provided) => ({
        ...provided,
        '&:hover': null,
        borderColor: null,
        borderRadius: null,
        transition: null,
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: '2px 12px',
      }),
      singleValue: (provided) => ({
        ...provided,
        marginLeft: null,
        marginRight: null,
        color: null,
      }),
      input: (provided) => ({
        ...provided,
        margin: null,
        color: null,
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        ':hover': null,
        color: null,
      }),
      menu: (provided) => ({
        ...provided,
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: null,
        marginTop: '4px',
        marginBottom: '4px',
      }),
      menuList: (provided) => ({
        ...provided,
        maxHeight: 4 + 7 * 41 + 4, // paddingTop + 7 options + paddingBottom
      }),
      menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999,
      }),
      option: (provided) => ({
        ...provided,
        ':active': null,
        padding: '10px 16px',
        backgroundColor: null,
        color: null,
        cursor: 'pointer',
      }),
      loadingMessage: (provided) => ({
        ...provided,
        padding: '10px 16px',
        color: null,
      }),
      noOptionsMessage: (provided) => ({
        ...provided,
        padding: '10px 16px',
        color: null,
      }),
    }),
    []
  );

  const baseValue = useMemo(() => {
    if (isMulti) {
      return options.filter((option) => value?.includes(option.value));
    }

    return options.find((option) => option.value === value) || defaultOption;
  }, [defaultOption, isMulti, options, value]);

  return (
    <BaseSelect
      inputId={inputId}
      name={name}
      value={baseValue}
      options={options}
      onChange={onChangeWrapper}
      isLoading={isLoading}
      className={className}
      styles={{ ...defaultStyles, ...styles }}
      components={{
        Control,
        Input,
        LoadingIndicator,
        IndicatorSeparator,
        Menu,
        MenuList,
        Option,
      }}
      menuPortalTarget={document.body}
      isMulti={isMulti}
      closeMenuOnSelect={closeMenuOnSelect}
      required={required}
      hasError={hasError}
      placeholder={placeholder}
      isDisabled={disabled}
      {...(onInputChange && { onInputChange })}
      {...(filterOption && { filterOption })}
      {...(defaultInputValue && { defaultInputValue })}
      {...(ref && { ref })}
      menuPosition={'fixed'}
    />
  );
};

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.array,
]);

const optionShape = PropTypes.shape({
  value: valueType.isRequired,
  label: PropTypes.string.isRequired,
});

Select.defaultProps = {
  isLoading: false,
};

Select.propTypes = {
  inputId: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: valueType,
  options: PropTypes.arrayOf(optionShape).isRequired,
  defaultOption: optionShape,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  styles: PropTypes.object,
  isMulti: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  required: PropTypes.bool,
  hasError: PropTypes.bool,
  onInputChange: PropTypes.func,
  filterOption: PropTypes.func,
  defaultInputValue: PropTypes.string,
  placeholder: PropTypes.any,
  disabled: PropTypes.bool,
  ref: PropTypes.object,
};

export default forwardRef((props, ref) => Select({ ...props, ref }));
