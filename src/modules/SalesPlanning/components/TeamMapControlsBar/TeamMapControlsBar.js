import { useContext } from 'react';
import { LassoControl, ToggleControl } from '../controls';
import { iconMap } from '@/components/common/Icon';
import { TeamMapContext } from '../../providers/TeamMapProvider';
import { sptConstants } from '../../lib';
import { MapControlsContainer } from '../MapControlsContainer';
import { ToggleControlLabeled } from '../controls';

const { PIN_SCORE_MAP_TYPE, PIN_SCORE, HIDE_PINS_LABEL } = sptConstants;

const TeamMapControlsBar = () => {
  const {
    heatMap,
    displayPins,
    toggleDisplayPinsMode,
    isPinsScoreMode,
    togglePinsScoreMode,
    drawMode,
    handleDrawModeChange,
  } = useContext(TeamMapContext);

  return (
    <MapControlsContainer>
      {displayPins && (heatMap === PIN_SCORE_MAP_TYPE) && (
        <ToggleControlLabeled
          checked={isPinsScoreMode}
          toggleName="Toggle pins score mode"
          label={PIN_SCORE}
          onChange={togglePinsScoreMode}
        />
      )}

      <ToggleControlLabeled
        checked={displayPins}
        toggleName="Hide pins"
        label={HIDE_PINS_LABEL}
        onChange={toggleDisplayPinsMode}
      />

      <LassoControl drawMode={drawMode} changeDrawMode={handleDrawModeChange} />
    </MapControlsContainer>
  );
};

export default TeamMapControlsBar;
