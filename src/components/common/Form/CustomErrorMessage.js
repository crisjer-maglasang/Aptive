import { memo } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { mergeClassName } from '@/lib';
import PropTypes from 'prop-types';

const CustomErrorMessage = ({ className, text }) => (
  <div className={mergeClassName('flex mt-2 text-sm', className)}>
    <div className="w-5 h-5">
      <ExclamationCircleIcon
        className="w-5 h-5 text-red-500"
        aria-hidden="true"
      />
    </div>
    <div className="font-medium text-sm text-red-600">{text}</div>
  </div>
);

CustomErrorMessage.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

export default memo(CustomErrorMessage);
