import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { mergeClassName } from '@/lib';
import { CalendarIcon } from '@heroicons/react/outline';

const DateInput = forwardRef(({ placeholder }, ref) => (
  <div
    ref={ref}
    className={mergeClassName(
      'flex items-center bg-white border border-gray-300 rounded-md text-sm leading-4 text-gray-500',
      'focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500',
    )}
    tabIndex={0}
  >
    <span className="py-2.5 px-3 grow cursor-text">{placeholder}</span>
    <div className="flex items-center bg-gray-50 border-l border-inherit rounded-r-md ml-auto py-2 px-3 space-x-2 text-gray-300">
      <CalendarIcon
        className="w-5 h-5 hover:text-gray-400 cursor-pointer"
        aria-hidden="true"
      />
    </div>
  </div>
));

DateInput.propTypes = {
  placeholder: PropTypes.string,
};

export default DateInput;
