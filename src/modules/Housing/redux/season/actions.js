import { createAsyncAction, createAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const seasonNameSpace = `${nameSpace}/season`;

export const requestSeasonSummaries = createAsyncAction(
  `${nameSpace}/GET_SEASON_SUMMARIES`
);

export const setSelectedSeason = createAction(
  `${nameSpace}/SET_SELECTED_SEASON`
);
