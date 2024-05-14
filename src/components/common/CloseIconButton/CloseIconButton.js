import { XIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { memo } from 'react';
import classNames from 'classnames';

const CloseIconButton = ({ classes, onClose }) => {
  return (
    <button
      type="button"
      onClick={onClose}
      className={classNames('p-1 flex items-center justify-center bg-transparent', classes)}
    >
      <XIcon className="w-full h-full" aria-hidden="true" />
      <span className="sr-only">Close</span>
    </button>
  );
};

CloseIconButton.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.string,
};

export default memo(CloseIconButton);
