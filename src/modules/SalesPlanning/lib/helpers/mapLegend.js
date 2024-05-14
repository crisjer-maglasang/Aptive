import { sptConstants } from '../constants';

const {
  QUALIFIED_ADDRESSES,
  QUALIFIED_ADDRESSES_MAP_TYPE,
  WEEKS_SINCE_KNOCKED,
  WEEKS_SINCE_KNOCKED_MAP_TYPE,
  PIN_SCORE,
  PIN_SCORE_MAP_TYPE,
  NONE,
  NONE_MAP_TYPE,
  QUALIFIED_ADDRESS_CHOROPLETH_SCALE,
  WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE,
  QUALIFIED_AREAS_CHOROPLETH_SCALE,
  TEAM_PINS,
  QUALIFIED_AREAS_PINS,
} = sptConstants;

export const prepareTeamMapLegendData = (mapType, isPinMode, isPolygons, isPinsScoreMode) => {
  const heatMapLegend = {
    [QUALIFIED_ADDRESSES_MAP_TYPE]: {
      title: QUALIFIED_ADDRESSES,
      legend: QUALIFIED_ADDRESS_CHOROPLETH_SCALE,
      isPolygons,
      isIcons: false,
    },
    [WEEKS_SINCE_KNOCKED_MAP_TYPE]: {
      title: WEEKS_SINCE_KNOCKED,
      legend: WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE,
      isPolygons,
      isIcons: false,
    },
    [PIN_SCORE_MAP_TYPE]: {
      title: PIN_SCORE,
      legend: QUALIFIED_AREAS_CHOROPLETH_SCALE,
      isPolygons,
      isIcons: false,
    },
    [NONE_MAP_TYPE]: {
      title: NONE,
      legend: [],
      isPolygons,
      isIcons: false,
    },
  };

  const pinsLegend = {
    [QUALIFIED_ADDRESSES_MAP_TYPE]: {
      legend: TEAM_PINS,
      isPolygons,
      isIcons: true,
    },
    [WEEKS_SINCE_KNOCKED_MAP_TYPE]: {
      legend: TEAM_PINS,
      isPolygons,
      isIcons: true,
    },
    [PIN_SCORE_MAP_TYPE]: {
      legend: isPinsScoreMode ? QUALIFIED_AREAS_PINS : TEAM_PINS,
      isPolygons,
      isIcons: !isPinsScoreMode,
    },
    [NONE_MAP_TYPE]: {
      legend: TEAM_PINS,
      isPolygons,
      isIcons: true,
    },
  };

  return isPinMode ? pinsLegend[mapType] : heatMapLegend[mapType];
};
