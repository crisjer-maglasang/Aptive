import PropTypes from 'prop-types';
import { memo } from 'react';

const ProgressBar = ({
  progress,
  message,
}) => (
  <div className="relative mb-7">
    <div className="relative overflow-hidden h-5 text-xs flex rounded bg-gray-300">
      <div
        style={{ width: `${progress}%` }}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-aptiveblue"
      />
      <span className={`text-sm absolute right-2 top-0 ${progress > 89 ? 'text-white' : 'text-gray-500'}`}>
        {`${progress}%`}
      </span>
    </div>
    {message && (
      <span className="absolute w-full mt-0.5 font-medium text-xs text-red-600">{message}</span>
    )}
  </div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  message: PropTypes.string,
};

export default memo(ProgressBar);
