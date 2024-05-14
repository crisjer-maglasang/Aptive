import { useContext } from 'react';
import PropTypes from 'prop-types';
import { LassoControl } from '../controls';
import { MapControlsContainer } from '../MapControlsContainer';
import { AreaMapContext } from '../../providers/AreaMapProvider';

const AreasMapControlsBar = () => {
  const { drawMode, handleDrawModeChange } = useContext(AreaMapContext);

  return (
    <MapControlsContainer>
      <LassoControl drawMode={drawMode} changeDrawMode={handleDrawModeChange} />
    </MapControlsContainer>
  );
};

AreasMapControlsBar.propTypes = {
  children: PropTypes.node,
};

export default AreasMapControlsBar;
