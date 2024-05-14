import { createReducer } from '@/redux/root';

import {
  assignTeamZipsAsync,
  nameSpace,
  requestRepsListAsync,
  requestTeamsAsync,
  requestTeamAsync,
  requestTeamsListAsync,
  requestTeamStatisticsAsync,
  unassignTeamZipsAsync,
  requestTeamCellsAsync,
  requestTeamPinsAsync,
} from './actions';

const initialState = {
  teams: null,
  areaTeams: {},
  teamStatistics: {},
  team: null,
  teamReps: [],
  polygon: null,
  teamsList: null,
  teamCells: null,
};

export const teamsReducer = createReducer(nameSpace, initialState, {
  [requestRepsListAsync.success]: ({ state, action }) => {
    state.teamReps = action.payload.data;
  },

  [requestTeamAsync.success]: ({ state, action }) => {
    state.team = action.payload;
  },

  [requestTeamsAsync.success]: ({ state, action }) => {
    state.teams = action.payload;
  },

  [requestTeamCellsAsync.success]: ({ state, action }) => {
    state.teamCells = action.payload;
  },

  [requestTeamPinsAsync.success]: ({ state, action }) => {
    state.teamPins = action.payload;
  },

  [requestTeamsListAsync.success]: ({ state, action }) => {
    const areaTeams = {};
    for (const data of action.payload.data) {
      areaTeams[data.team_id] = data;
    }
    state.areaTeams = areaTeams;
    state.teamsList = action.payload;

    return state;
  },

  [requestTeamStatisticsAsync.success]: ({ state, action }) => {
    const areaTeams = state.areaTeams;
    const team_id = action.payload.data.team_id;
    areaTeams[team_id] = {...areaTeams[team_id], ...action.payload.data.statistics};

    state.areaTeams = areaTeams;
  },

  [assignTeamZipsAsync.success]: ({ state, action }) => {
    state.assignTeamZips = action.payload;
  },

  [unassignTeamZipsAsync.success]: ({ state, action }) => {
    state.unassignTeamZips = action.payload;
  },
});
