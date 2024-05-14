import { createReducer } from '@/redux/root';
import { logoutAction } from '@/redux/auth';
import {
  areaNameSpace,
  requestBranchesSummariesAsync,
  requestTeamsSummariesAsync,
  resetTeamsSummariesAction,
} from './actions';

const initialState = {
  teamsSummaries: null,
  branchesSummaries: null,
};

export const areaReducer = createReducer(areaNameSpace, initialState, {
  [requestTeamsSummariesAsync.success]: ({ state, action }) => {
    state.teamsSummaries = action.payload ?? [];
  },

  [requestBranchesSummariesAsync.success]: ({ state, action }) => {
    state.branchesSummaries = action.payload ?? [];
  },

  [resetTeamsSummariesAction]: ({ state }) => {
    state.teamsSummaries = initialState.teamsSummaries;
  },

  [logoutAction]: ({ state }) => {
    state.teamsSummaries = initialState.teamsSummaries;
    state.branchesSummaries = initialState.branchesSummaries;
  },
});
