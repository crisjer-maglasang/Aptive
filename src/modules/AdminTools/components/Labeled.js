import PropTypes from 'prop-types';

const Labeled = ({ label, children }) => {
  return (
    <div className={'mb-6 mt-2'}>
      <div className="text-lg text-gray-700">{label}</div>
      <div>{children}</div>
    </div>
  );
};

Labeled.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Labeled;
