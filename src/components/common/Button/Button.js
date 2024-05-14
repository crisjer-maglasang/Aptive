import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ onClick, color, children, className, disabled, name }) => {
  const colorMap = {
    white:
      'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-aptivegreen',
    green:
      'border-transparent bg-primary-300 text-white hover:bg-primary-300 focus:ring-primary-300',
    gray:
      'bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-0',
    red:
      'bg-red-600 focus:outline-none focus:ring-0 text-white',
    blue:
      'bg-blue-600 focus:outline-none focus:ring-0 text-white',
    red_transparent:
      'border-transparent bg-transparent text-red-600',
    green_transparent:
      'border-transparent bg-transparent text-primary-300',
    disabled: 'text-gray-300 cursor-default',
    default: 'text-gray-600 leading-none text-right font-normal font-["Inter"] sm:text-xs',
  };
  const classes = classNames(
    className,
    'inline-flex justify-center py-2 text-base font-medium sm:text-sm',
    !['green_transparent', 'red_transparent'].includes(color)
      ? 'rounded-md border shadow-sm px-4 focus:outline-none focus:ring-2 focus:ring-offset-2'
      : '',
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
  color: 'green',
  className: '',
  disabled: false,
};

export default Button;
