import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = (props) => {
  const {
    value,
    id,
    name,
    type,
    max,
    className,
    required,
    onChange,
    onBlur,
    autoComplete,
    placeholder,
    hasError,
    ariaDescribedBy,
    children,
    childOrientation,
    baseClasses,
  } = props;
  const { errorClasses, standardClasses } = baseClasses;
  const classes = classNames(
    className,
    'shadow-sm block w-full sm:text-sm rounded-md',
    `${hasError ? errorClasses : standardClasses}`
  );
  return (
    <div className="flex">
      {childOrientation === 'left' ? children : null}
      <input
        value={value}
        id={id}
        name={name}
        type={type}
        max={max}
        className={classes}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError}
      />
      {childOrientation === 'right' ? children : null}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  hasError: PropTypes.bool,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  childOrientation: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  hasError: false,
  rows: 10,
  onChange: () => {},
  required: false,
  childOrientation: 'left',
};

export default Input;
