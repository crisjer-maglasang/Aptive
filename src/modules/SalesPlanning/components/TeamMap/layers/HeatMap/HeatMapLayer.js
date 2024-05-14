import { memo } from 'react';
import { FeatureGroup, GeoJSON } from 'react-leaflet';
import HeatMapCellDetails from './HeatMapCellDetails';

const HeatMapLayer = ({ cells }) => {
  return cells?.map((cell, i) => {
    if (cell) {
      return (
        <FeatureGroup key={`${cell.type}-${i}`}>
          <HeatMapCellDetails
            qualifiedAddresses={cell.properties?.qualified_addresses}
            weeksSinceKnocked={cell.properties?.avg_weeks_since_last_knocked}
            pinsScore={cell.properties?.avg_qualified_area_quartile}
          />
          <GeoJSON style={cell.style} data={cell} />
        </FeatureGroup>
      );
    }
  });
};

export default memo(HeatMapLayer);
