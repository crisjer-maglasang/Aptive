import { createSelector } from 'reselect';
import { buildTeamColors } from '@/modules/SalesPlanning/lib/buildTeamColors';
import { combineTeamsAndColors } from '@/modules/SalesPlanning/lib/combineTeamsAndColors';
import { buildTeamOptions } from '@/modules/SalesPlanning/lib/buildTeamOptions';
import { buildRepOptions } from '@/modules/SalesPlanning/lib/buildRepOptions';
import { sptConstants, parsePinOutcome } from '@/modules/SalesPlanning/lib';
import ActiveCustomerIcon from '@/modules/SalesPlanning/assets/activeCustomerPin.png';
import { getOutcomePinIcon } from '@/modules/SalesPlanning/lib/helpers/getPinIcon';

const teamSelector = (state) => state.teams;

export const areaTeamsSelector = createSelector(
  teamSelector,
  (state) => {
    return state.areaTeams;
  },
);

export const teamColorsSelector = createSelector(
  areaTeamsSelector,
  (areaTeams) => {
    return buildTeamColors(areaTeams);
  },
);

export const teamDataSelector = createSelector(
  [areaTeamsSelector, teamColorsSelector],
  (areaTeams, teamColors) => {
    return combineTeamsAndColors(areaTeams, teamColors);
  },
);

export const teamOptionsSelector = createSelector(
  areaTeamsSelector,
  (areaTeams) => {
    return buildTeamOptions(areaTeams);
  },
);

export const teamRepsSelector = createSelector(
  teamSelector,
  (state) => {
    return state.teamReps;
  },
);

export const repOptionsSelector = createSelector(
  teamSelector,
  (state) => {
    return buildRepOptions(state.teamReps);
  },
);

export const selectTeamCells = (state) => state.teams?.teamCells?.boundary?.features;

export const teamCellsMapSelector = createSelector(
  [selectTeamCells, (state, mapType) => mapType],
  (teamCells, mapType) => {
    let cells = {};

    switch (mapType) {
      case sptConstants.PIN_SCORE_MAP_TYPE:
        teamCells.forEach((cell) => {
          const quartile = cell.properties?.avg_qualified_area_quartile ?? 0;

          const quartileStyles = sptConstants.QUALIFIED_AREAS_CHOROPLETH_SCALE
            .find((style) => style.quartile === quartile);
          const cellProperties = {
            ...cell,
            style: quartileStyles,
          };

          if (cells[quartile]) {
            cells[quartile].push(cellProperties);
          } else {
            cells[quartile] = new Array(cellProperties);
          }
        });

        return cells;

      case sptConstants.QUALIFIED_ADDRESSES_MAP_TYPE:
        cells = {
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
          10: [],
        };

        teamCells.forEach((cell) => {
          const decile = cell.properties.decile_on_qualified_addresses;
          cells[decile].push({
            ...cell,
            style: sptConstants.QUALIFIED_ADDRESS_CHOROPLETH_SCALE[decile - 1],
          });
        });

        return cells;

      default:
        return cells;
    }
  },
);

export const weeksSinceKnockedCellsSelector = createSelector(
  selectTeamCells,
  (teamCells) => {
    const weeksSinceKnocked = {};

    weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[0]] = [];
    weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[1]] = [];
    weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[2]] = [];
    weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[3]] = [];
    weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[4]] = [];

    teamCells.forEach((cell) => {
      const average = cell.properties.avg_weeks_since_last_knocked;
      if(average === null) {
        weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[0]].push({
          ...cell,
          style: sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[0],
        });
      } else if(average <= 2) {
        weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[1]].push({
          ...cell,
          style: sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[1],
        });
      } else if(average >=3 && average <= 5) {
        weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[2]].push({
          ...cell,
          style: sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[2],
        });
      } else if(average >=6 && average <= 8) {
        weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[3]].push({
          ...cell,
          style: sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[3],
        });
      } else if(average >=9) {
        weeksSinceKnocked[sptConstants.WEEKS_SINCE_KNOCKED_OPTIONS_KEYS[4]].push({
          ...cell,
          style: sptConstants.WEEKS_SINCE_KNOCKED_CHOROPLETH_SCALE[4],
        });
      }
    });

    return weeksSinceKnocked;
  },
);

const selectTeamPins = (state) => state.teams?.teamPins?.pins ?? [];

export const teamPinsStyledSelector = createSelector(
  [selectTeamPins, (state, mapType) => mapType, (state, mapType, selectedPolygon) => selectedPolygon],
  (teamPins, mapType, selectedPolygon) => {
    const pins = [];

    teamPins.forEach((thisPin) => {
      let iconStyles;

      if (selectedPolygon?.pins?.includes(thisPin.pin_id)) {
        const { color, knockTimes, hasNote, type } = parsePinOutcome(thisPin.outcome_type);
        const pinScoreStyles = sptConstants.OUTCOME_PINS
          .find((item) => item.color === color + (knockTimes ? `-${knockTimes}` : ''));

        iconStyles = {
          iconStyles: pinScoreStyles,
          iconId: thisPin.outcome_type,
          customIcon: thisPin.is_active ?
            ActiveCustomerIcon :
            getOutcomePinIcon({ type, color, hasNote, ...pinScoreStyles }),
        };
      } else {
        switch (mapType) {
          case sptConstants.PIN_SCORE_MAP_TYPE:
            const pinScoreStyles = sptConstants.QUALIFIED_AREAS_PINS
              .find((item) => item.quartile === (thisPin.qualified_area_quartile ?? 0));
            iconStyles = { iconStyles: pinScoreStyles };

            break;

          default:
            const defaultStyles = sptConstants.TEAM_PINS
              .find((item) => item.isQualified === Boolean(thisPin.is_qualified));

            iconStyles = {
              iconStyles: defaultStyles,
              iconId: thisPin.is_active ? 'activeCustomer' : null,
              customIcon: thisPin.is_active ? ActiveCustomerIcon : null,
            };
        }
      }

      pins.push({
        position: [thisPin.lat, thisPin.lon],
        id: thisPin.pin_id,
        ...iconStyles,
      });
    });

    return pins;
  },
);

export const selectTeamsList = (state) => state?.teams?.teamsList?.data;
