import { mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';
import { memo } from 'react';

const IconButton = ({ children, onClick, actionTitle, disabled, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={mergeClassName(
        'p-1 flex items-center justify-center bg-transparent focus:outline-aptivegreen',
        className,
      )}
      disabled={disabled}
    >
      {children}
      <span className="sr-only">{actionTitle}</span>
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  actionTitle: PropTypes.string,
  className: PropTypes.string,
};

export default memo(IconButton);
