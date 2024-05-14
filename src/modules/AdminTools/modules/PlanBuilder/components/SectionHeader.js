import PropTypes from 'prop-types';

const SectionHeader = ({ number, label, description }) => (
  <div className="my-8">
    <div className="flex">
      {number && (
        <>
          <div className="text-gray-500">
            {'Step'}
            {' '}
            {number}
          </div>
          <div className="w-2" />
        </>
      )}
      <div>{label}</div>
    </div>
    <div>{description}</div>
  </div>
);

SectionHeader.propTypes = {
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  number: PropTypes.number,
};

export default SectionHeader;
