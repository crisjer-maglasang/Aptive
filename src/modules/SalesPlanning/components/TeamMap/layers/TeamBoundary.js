import {
  GeoJSON,
} from 'react-leaflet';
import PropTypes from 'prop-types';
import { sptConstants } from '../../../lib';

const TeamBoundary = ({
  boundary,
  layerChoice,
}) => {
  const layerStyles = {
    [sptConstants.OPEN_STREET_MAP]: { fillOpacity: 0.05, color: '#303030' },
    [sptConstants.GOOGLE_MAPS]: { fillOpacity: 0.07, color: '#303030' },
    [sptConstants.GOOGLE_HYBRID]: { fillOpacity: 0.05, color: '#FFFFFF' },
    [sptConstants.GOOGLE_SATELLITE]: { fillOpacity: 0.05, color: '#FFFFFF' },
  };

  const getLayerStyles = () => {
    const style = { fillOpacity: 0.05 };
    const pathOptions = {
      weight: 2,
      dashArray: '8,4',
      color: '#303030'
    };

    if (layerStyles[layerChoice]) {
      const { fillOpacity, color } = layerStyles[layerChoice];

      style.fillOpacity = fillOpacity;
      pathOptions.color = color;
    }

    return { style, pathOptions };
  };

  return (
    <GeoJSON
      interactive={false}
      style={getLayerStyles().style}
      pathOptions={getLayerStyles().pathOptions}
      data={boundary}
    />
  );
};

TeamBoundary.propTypes = {
  boundary: PropTypes.object,
  layerChoice: PropTypes.string,
};

export default TeamBoundary;
