import classNames from 'classnames';
import PropTypes from 'prop-types';

const Select = ({
  id,
  value,
  name,
  autoComplete,
  className,
  onChange,
  onBlur,
  selectOptions,
  ariaDescribedBy,
  hasError,
  baseClasses,
  disabled,
}) => {
  const { errorClasses, standardClasses } = baseClasses;
  const classes = classNames(
    className,
    'shadow-sm block w-full sm:text-sm rounded-md',
    `${hasError ? errorClasses : standardClasses}`
  );
  return (
    <>
      <select
        id={id}
        value={value}
        name={name}
        autoComplete={autoComplete}
        className={classes}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError}
        disabled={disabled}
      >
        {selectOptions &&
          selectOptions?.map(({ name, value }) => {
            return (
              <option key={value} value={value}>
                {name}
              </option>
            );
          })}
      </select>
    </>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  selectOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ariaDescribedBy: PropTypes.string,
};

Select.defaultProps = {
  id: '',
  onChange: () => {},
};

export default Select;
