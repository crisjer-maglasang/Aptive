import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FeatureGroup } from 'react-leaflet';
import { v4 as uuidv4 } from 'uuid';
import HeatMapLayer from './HeatMapLayer';
import { teamCellsMapSelector } from '@/redux/teams';

const HeatMap = ({ cells }) => {
  return (
    <FeatureGroup>
      {Object.keys(cells)?.map((key) => (
        <HeatMapLayer key={uuidv4()} cells={cells[key]} />
      ))}
    </FeatureGroup>
  );
};

HeatMap.propTypes = {
  cells: PropTypes.object,
};

const mapStateToProps = (state, { mapType }) => ({
  cells: teamCellsMapSelector(state, mapType),
});

export default connect(mapStateToProps, null)(HeatMap);
