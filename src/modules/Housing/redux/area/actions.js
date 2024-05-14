import { createAction, createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const areaNameSpace = `${nameSpace}/area`;

export const requestTeamsSummariesAsync = createAsyncAction(`${nameSpace}/GET_TEAMS_SUMMARIES`);

export const requestBranchesSummariesAsync = createAsyncAction(`${nameSpace}/GET_BRANCHES_SUMMARIES`);

export const resetTeamsSummariesAction = createAction(`${nameSpace}/RESET_TEAMS_SUMMARIES`);
