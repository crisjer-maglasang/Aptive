import { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMapEvents } from 'react-leaflet';
import * as turf from '@turf/turf';
import { requestTeamCellsAsync, requestTeamPinsAsync, selectTeamCells } from '@/redux/teams';
import { sptConstants, doPolygonsIntersect, unionPolygons } from '../../lib';
import { PixiOverlay } from '../PixiOverlay';
import { DropdownControl, LoaderControl } from '../controls';
import { HeatMap, WeeksSinceKnockedLayer } from './layers/HeatMap';
import { TeamMapContext } from '../../providers/TeamMapProvider';

const {
  QUALIFIED_ADDRESSES,
  QUALIFIED_ADDRESSES_MAP_TYPE,
  WEEKS_SINCE_KNOCKED,
  WEEKS_SINCE_KNOCKED_MAP_TYPE,
  PIN_SCORE,
  PIN_SCORE_MAP_TYPE,
  NONE,
  NONE_MAP_TYPE,
} = sptConstants;

const TeamChoropleth = ({
  loading,
  getTeamCells,
  getTeamPins,
  teamCells,
  teamId,
  selectedPolygonId,
  setViewBoundary,
}) => {
  const [pixiLoaded, setPixiLoaded] = useState(true);
  const [dropdownLabel, setDropdownLabel] = useState(QUALIFIED_ADDRESSES);

  const { heatMap, setHeatMap, pinMode, setPinMode, displayPins, isPinsScoreMode, displayPinsOutcomes } = useContext(TeamMapContext);

  const dropdownOptions = [
    {
      key: QUALIFIED_ADDRESSES_MAP_TYPE,
      label: QUALIFIED_ADDRESSES,
      onClick: () => {
        setDropdownLabel(QUALIFIED_ADDRESSES);
        setHeatMap(QUALIFIED_ADDRESSES_MAP_TYPE);
      },
    },
    {
      key: WEEKS_SINCE_KNOCKED_MAP_TYPE,
      label: WEEKS_SINCE_KNOCKED,
      onClick: () => {
        setDropdownLabel(WEEKS_SINCE_KNOCKED);
        setHeatMap(WEEKS_SINCE_KNOCKED_MAP_TYPE);
      },
    },
    {
      key: PIN_SCORE_MAP_TYPE,
      label: PIN_SCORE,
      onClick: () => {
        setDropdownLabel(PIN_SCORE);
        setHeatMap(PIN_SCORE_MAP_TYPE);
      },
    },
    {
      key: NONE_MAP_TYPE,
      label: NONE,
      onClick: () => {
        setDropdownLabel(NONE);
        setHeatMap(NONE_MAP_TYPE);
      },
    },
  ];

  const map = useMapEvents({
    dragend: () => {
      if (!map) {
        return;
      };
      if(!loading.teamCells) {
        handleMapChange();
      }
    },
    zoomend: () => {
      if (!map) {
        return;
      };
      if(!loading.teamCells) {
        handleMapChange();
      }
    },
  });

  const requestTeamCells = () => {
    getTeamCells({
      team_id: teamId,
      resolution: 8,
      //window: getBoundsWindow(),
    });
  };

  const requestTeamPins = (pinRequestBoundary) => {
    getTeamPins({
      team_id: teamId,
      boundary: pinRequestBoundary,
    });
  };

  /* This might come back if the choropleth will handle multiple resolutions
   const getResolution = () => {
   const zoom = map.getZoom();

   if(zoom <= 10) {
   return 6;
   } else if(zoom >= 11 && zoom <= 12) {
   return 7;
   } else if(zoom >= 13 && zoom <= 14) {
   return 8;
   } else if(zoom >= 15) {
   return 9;
   }
   };*/

  const getBoundsWindow = () => {
    const bounds = map.getBounds();
    const northWest = bounds.getNorthWest();
    const northEast = bounds.getNorthEast();
    const southEast = bounds.getSouthEast();
    const southWest = bounds.getSouthWest();

    return [
      [
        [northEast.lng, northEast.lat],
        [southEast.lng, southEast.lat],
        [southWest.lng, southWest.lat],
        [northWest.lng, northWest.lat],
        [northEast.lng, northEast.lat],
      ],
    ];
  };

  const handleMapChange = () => {
    const viewBounds = turf.polygon(getBoundsWindow());
    let totalAddresses = 0;
    const viewableCells = [];
    if(teamCells.length) {
      teamCells.forEach((thisCell) => {
        const intersects = doPolygonsIntersect(thisCell?.geometry, viewBounds);

        if (intersects) {
          viewableCells.push(thisCell);
          totalAddresses += thisCell?.properties?.qualified_addresses ?? 0;
        }
      });
    }

    if(totalAddresses <= 5000 && viewableCells.length) {
      setPinMode(true);
      const combinedCells = unionPolygons(viewableCells);
      const pinRequestBoundary = turf.intersect(viewBounds, combinedCells);
      setViewBoundary(pinRequestBoundary.geometry);
      requestTeamPins(pinRequestBoundary.geometry);
    } else {
      setPinMode(false);
    }
  };

  useEffect(() => {
    requestTeamCells();
  }, []);

  return (
    <div>
      {(!pixiLoaded) && <LoaderControl />}

      <PixiOverlay
        setLoading={setPixiLoaded}
        isPinMode={pinMode && displayPins}
        heatMap={isPinsScoreMode ? heatMap : QUALIFIED_ADDRESSES_MAP_TYPE}
        isPinOutcomesMode={pinMode && displayPinsOutcomes}
        selectedPolygon={selectedPolygonId}
      />

      {!pinMode &&
        !loading.teamCells &&
        (
          <div>
            <DropdownControl
              label={dropdownLabel}
              options={dropdownOptions}
            />
            {heatMap === QUALIFIED_ADDRESSES_MAP_TYPE && <HeatMap mapType={QUALIFIED_ADDRESSES_MAP_TYPE} />}
            {heatMap === WEEKS_SINCE_KNOCKED_MAP_TYPE && <WeeksSinceKnockedLayer />}
            {heatMap === PIN_SCORE_MAP_TYPE && <HeatMap mapType={PIN_SCORE_MAP_TYPE} />}
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, teams, errors } = state;

  return {
    loading: {
      teamCells: Boolean(loading?.teamCells?.isLoading) || !teams.teamCells,
      teamPins: Boolean(loading?.teamPins?.isLoading) || !teams.teamPins,
    },
    teamCells: selectTeamCells(state),
    errors: errors.errors,
  };
};

const mapDispatchToProps = {
  getTeamCells: requestTeamCellsAsync.request,
  getTeamPins: requestTeamPinsAsync.request,
};

TeamChoropleth.propTypes = {
  loading: PropTypes.object,
  getTeamCells: PropTypes.func,
  teamCells: PropTypes.array,
  getTeamPins: PropTypes.func,
  teamPins: PropTypes.array,
  teamId: PropTypes.string,
  pinMode: PropTypes.bool,
  setPinMode: PropTypes.func,
  displayPins: PropTypes.bool,
  selectedPolygonId: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamChoropleth);
