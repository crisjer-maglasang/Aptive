import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const FormSection = forwardRef(({
  title,
  viewHistory,
  onViewHistory,
  children,
}, ref) => (
  <div ref={ref} className="px-6 py-6 border-b border-gray-200">
    <div className="flex">
      <h2 className="text-lg font-bold text-aptivegreen">{title}</h2>
      {viewHistory && (
        <div className="ml-auto">
          <button
            type="button"
            className="inline-block text-primary-300 text-sm font-medium rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300"
            onClick={onViewHistory}
          >
            View History
          </button>
        </div>
      )}
    </div>
    <div className="px-4 py-4">{children}</div>
  </div>
));

FormSection.defaultProps = {
  viewHistory: false,
  onViewHistory: () => {},
};

FormSection.propTypes = {
  title: PropTypes.string,
  viewHistory: PropTypes.bool,
  onViewHistory: PropTypes.func,
  children: PropTypes.node,
};

export default FormSection;
