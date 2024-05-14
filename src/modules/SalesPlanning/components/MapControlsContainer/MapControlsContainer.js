import PropTypes from 'prop-types';

const MapControlsContainer = ({ children }) => {
  return (
    <div className="absolute top-2.5 right-14 z-1000 flex items-center justify-between gap-x-4">
      {children}
    </div>
  );
};

MapControlsContainer.propTypes = {
  children: PropTypes.node,
};

export default MapControlsContainer;
