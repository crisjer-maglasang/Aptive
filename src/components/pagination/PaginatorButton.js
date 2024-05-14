import PropTypes from 'prop-types';

const PaginatorButton = ({ icon: Icon, value, isDisabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`h-10 relative items-center px-2 rounded-md border border-gray-300 bg-white text-sm font-medium ${isDisabled ? 'text-gray-200 cursor-default' : 'text-gray-500 hover:bg-gray-50'}`}
    >
      <span className="sr-only">{value}</span>
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

PaginatorButton.propTypes = {
  icon: PropTypes.object,
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PaginatorButton;
