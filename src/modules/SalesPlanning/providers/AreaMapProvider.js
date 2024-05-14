import PropTypes from 'prop-types';
import { createContext, useCallback, useState, useMemo } from 'react';
import { DRAW_MODE } from '../lib';

export const AreaMapContext = createContext({});

const AreaMapProvider = ({ children }) => {
  const [drawMode, setDrawMode] = useState(DRAW_MODE.EDIT);

  const handleDrawModeChange = useCallback(() => {
    if(drawMode !== DRAW_MODE.EDIT) {
      setDrawMode(DRAW_MODE.EDIT);
    } else {
      setDrawMode(DRAW_MODE.CREATE);
    }
  }, [drawMode]);

  const state = useMemo(() => ({
    drawMode,
    setDrawMode,
    handleDrawModeChange,
  }), [drawMode, handleDrawModeChange]);

  return (
    <AreaMapContext.Provider value={state}>
      {children}
    </AreaMapContext.Provider>
  );
};

AreaMapProvider.propTypes = {
  children: PropTypes.node,
};

export default AreaMapProvider;
