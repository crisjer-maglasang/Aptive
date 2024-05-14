import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FeatureGroup } from 'react-leaflet';
import { useLeafletContext } from '@react-leaflet/core';
import { v4 as uuidv4 } from 'uuid';
import { sptConstants } from '../../../../lib';
import { CheckboxControl } from '../../../controls';
import { weeksSinceKnockedCellsSelector } from '@/redux/teams';
import HeatMapLayer from './HeatMapLayer';

const WeeksSinceKnockedLayer = ({ cells }) => {
  const refMap = {
    1: useRef(),
    2: useRef(),
    3: useRef(),
    4: useRef(),
    5: useRef(),
  };
  const context = useLeafletContext();
  const [selections, setSelections] = useState([]);

  const getCheckboxControlLabel = (color, label) => {
    return (
      <div className="flex gap-x-2 justify-start">
        <div style={{ background: color, borderRadius: 2 }} className="mt-0.5 w-3 h-3" />
        <div className="text-xs">{label}</div>
      </div>
    );
  };
  const controlOptions = [
    {
      label: getCheckboxControlLabel(sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[0].color, sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_LABELS[0]),
      value: sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[0],
    },
    {
      label: getCheckboxControlLabel(sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[1].color, sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_LABELS[1]),
      value: sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[1],
    },
    {
      label: getCheckboxControlLabel(sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[2].color, sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_LABELS[2]),
      value: sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[2],
    },
    {
      label: getCheckboxControlLabel(sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[3].color, sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_LABELS[3]),
      value: sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[3],
    },
    {
      label: getCheckboxControlLabel(sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[4].color, sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_LABELS[4]),
      value: sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[4],
    },
  ];

  const allFeatures = useMemo(() => {
    return Object.keys(cells).map((key, i) => {
      return (
        <FeatureGroup key={uuidv4()} ref={refMap[i + 1]}>
          <HeatMapLayer cells={cells[key]} />
        </FeatureGroup>
      );
    });
  }, [cells]);

  useEffect(() => {
    const container = context.layerContainer || context.map;

    if(selections.indexOf(sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[0]) !== -1) {
      container.addLayer(refMap[1].current);
    } else {
      container.removeLayer(refMap[1].current);
    }

    if(selections.indexOf(sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[1]) !== -1) {
      container.addLayer(refMap[2].current);
    } else {
      container.removeLayer(refMap[2].current);
    }

    if(selections.indexOf(sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[2]) !== -1) {
      container.addLayer(refMap[3].current);
    } else {
      container.removeLayer(refMap[3].current);
    }

    if(selections.indexOf(sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[3]) !== -1) {
      container.addLayer(refMap[4].current);
    } else {
      container.removeLayer(refMap[4].current);
    }

    if(selections.indexOf(sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[4]) !== -1) {
      container.addLayer(refMap[5].current);
    } else {
      container.removeLayer(refMap[5].current);
    }
  }, [selections]);

  return (
    <div>
      <CheckboxControl
        onChange={setSelections}
        options={controlOptions}
        defaultSelections={[
          sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[0],
          sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[1],
          sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[2],
          sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[3],
          sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[4],
        ]}
      />
      {allFeatures}
    </div>
  );
};

WeeksSinceKnockedLayer.propTypes = {
  cells: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cells: weeksSinceKnockedCellsSelector(state),
});

export default connect(mapStateToProps, null)(WeeksSinceKnockedLayer);
