import { createReducer } from '@/redux/root';
import { logoutAction, nameSpace, requestAuthUserAsync } from './actions';
import { saveDefaultTeamAction } from '@/redux/teams';

const initialState = {
  user: null,
};

export const authReducer = createReducer(nameSpace, initialState, {
  [requestAuthUserAsync.success]: ({ state, action }) => {
    const { user } = action.payload;

    state.user = user;
  },

  [saveDefaultTeamAction]: ({ state, action }) => {
    const { teamId } = action.payload;

    state.user.defaultTeam = teamId;
  },

  [logoutAction]: ({ state }) => {
    state.user = initialState.user;
  },
});
