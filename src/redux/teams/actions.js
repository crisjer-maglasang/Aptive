import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/teams';

export const requestRepsListAsync = createAsyncAction(`${nameSpace}/REQUEST_REPS_LIST`);

export const requestTeamAsync = createAsyncAction(`${nameSpace}/REQUEST_TEAM`);

export const requestTeamsAsync = createAsyncAction(`${nameSpace}/REQUEST_TEAMS`);

export const assignTeamZipsAsync = createAsyncAction(`${nameSpace}/REQUEST_ASSIGN_ZIPS`);

export const unassignTeamZipsAsync = createAsyncAction(`${nameSpace}/REQUEST_UNASSIGN_ZIPS`);

export const requestTeamCellsAsync = createAsyncAction(`${nameSpace}/REQUEST_TEAM_CELLS`);

export const requestTeamPinsAsync = createAsyncAction(`${nameSpace}/REQUEST_TEAM_PINS`);

export const requestTeamStatisticsAsync = createAsyncAction(`${nameSpace}/REQUEST_TEAM_STATISTICS`);

export const requestTeamsListAsync = createAsyncAction(`${nameSpace}/REQUEST_TEAMS_LIST`);

export const saveDefaultTeamAction = createAction(`${nameSpace}/SAVE_DEFAULT_TEAM`);
