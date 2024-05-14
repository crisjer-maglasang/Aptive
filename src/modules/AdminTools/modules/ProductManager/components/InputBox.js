import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputBox = ({ children, className }) => {
  const baseClassName =
    'mt-0.5 shadow-sm border bg-white flex flex-row rounded-md border-b border-gray-300 text-left';

  return <div className={classNames(className, baseClassName)}>{children}</div>;
};

InputBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
};

export default InputBox;
