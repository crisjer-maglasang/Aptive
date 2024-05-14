import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ onClick, color, children, className, disabled, name }) => {
  const colorMap = {
    white:
      'bg-white text-gray-900',
    blue:
      'bg-blue-600 text-white',
    disabled:
      'text-gray-300 cursor-default',
    default: '',
  };
  const classes = classNames(
    className,
    colorMap[disabled ? 'disabled' : color]
  );

  return (
    <button
      name={name}
      type="button"
      className={classes}
      onClick={disabled ? () => {} : onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  color: 'default',
  className: '',
  disabled: false,
};

export default Button;
