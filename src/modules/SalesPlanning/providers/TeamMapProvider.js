import { createContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DRAW_MODE, sptConstants } from '../lib';

export const TeamMapContext = createContext({});

const TeamMapProvider = ({ children }) => {
  const [isPolygons, setIsPolygons] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [displayPins, setDisplayPins] = useState(true);
  const [displayPinsOutcomes, setDisplayPinsOutcomes] = useState(false);
  const [heatMap, setHeatMap] = useState(sptConstants.QUALIFIED_ADDRESSES_MAP_TYPE);
  const [isPinsScoreMode, setIsPinsScoreMode] = useState(true);
  const [drawMode, setDrawMode] = useState(DRAW_MODE.EDIT);

  const toggleDisplayPinsOutcomes = useCallback(() => {
    setDisplayPinsOutcomes(!displayPinsOutcomes);
  }, [displayPinsOutcomes]);

  const toggleDisplayPinsMode = useCallback(() => {
    setDisplayPins(!displayPins);
  }, [displayPins]);

  const togglePinsScoreMode = useCallback(() => {
    setIsPinsScoreMode(!isPinsScoreMode);
  }, [isPinsScoreMode]);

  const handleDrawModeChange = useCallback(() => {
    if(drawMode !== DRAW_MODE.EDIT) {
      setDrawMode(DRAW_MODE.EDIT);
    } else {
      setDrawMode(DRAW_MODE.CREATE);
    }
  }, [drawMode]);

  const state = useMemo(() => ({
    pinMode,
    heatMap,
    drawMode,
    isPolygons,
    displayPins,
    isPinsScoreMode,
    setPinMode,
    setHeatMap,
    setDrawMode,
    setIsPolygons,
    togglePinsScoreMode,
    handleDrawModeChange,
    toggleDisplayPinsMode,
    displayPinsOutcomes,
    toggleDisplayPinsOutcomes,
  }), [
    displayPins,
    drawMode,
    handleDrawModeChange,
    heatMap,
    isPinsScoreMode,
    isPolygons,
    pinMode,
    toggleDisplayPinsMode,
    togglePinsScoreMode,
    displayPinsOutcomes,
    toggleDisplayPinsOutcomes,
  ]);

  return (
    <TeamMapContext.Provider value={state}>
      {children}
    </TeamMapContext.Provider>
  );
};

TeamMapProvider.propTypes = {
  children: PropTypes.node,
};

export default TeamMapProvider;
