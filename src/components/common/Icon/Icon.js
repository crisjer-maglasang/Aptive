import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import { iconMap } from '.';

const Icon = ({
  icon,
  id,
  title,
  message,
  place,
  effect,
  className,
  tooltipClassName,
  allowHtml,
  onClick,
}) => {
  const classes = classNames(className, 'flex items-center');
  const tooltipClasses = classNames(tooltipClassName, 'max-w-xl');
  return (
    <span data-for={id} data-tip={message} className={classes} onClick={onClick}>
      <title>{title}</title>
      {iconMap[icon]}
      {message ? (
        <ReactTooltip
          id={id}
          place={place}
          effect={effect}
          className={tooltipClasses}
          html={allowHtml}
        />
      ) : null}
    </span>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  place: PropTypes.string,
  effect: PropTypes.string,
  className: PropTypes.string,
  tooltipClassName: PropTypes.string,
  allowHtml: PropTypes.bool
};

Icon.defaultProps = {
  id: '',
  title: '',
  message: '',
  place: 'bottom',
  effect: 'solid',
  className: '',
  tooltipClassName: '',
  allowHtml: false
};

export default Icon;
