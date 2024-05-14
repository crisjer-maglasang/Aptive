import PropTypes from 'prop-types';

const ComplexInfoSidebar = ({
  complex,
}) => (
  <>
    <div className="mr-1 ml-1 p-6 border-b border-gray-200 text-lg font-semibold">
      {`Complex: ${complex?.name}`}
    </div>
    <div className="p-6">
      <div className="pb-3 font-medium text-base">Main Information:</div>
      <div className="flex flex-wrap justify-between border-t border-gray-200 py-3">
        <span className="text-gray-600">Address</span>
        <span className="font-medium">{complex?.street}</span>
      </div>
      <div className="flex flex-wrap justify-between border-t border-gray-200 py-3">
        <span className="text-gray-600">City</span>
        <span className="font-medium">{complex?.city}</span>
      </div>
      <div className="flex flex-wrap justify-between border-t border-gray-200 py-3">
        <span className="text-gray-600">State</span>
        <span className="font-medium">{complex?.state}</span>
      </div>
      <div className="flex flex-wrap justify-between border-t border-gray-200 py-3">
        <span className="text-gray-600">Zip Code</span>
        <span className="font-medium">{complex?.zip}</span>
      </div>
    </div>
  </>
);

ComplexInfoSidebar.propTypes = {
  complex: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
};

export default ComplexInfoSidebar;
