import { createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/sales-operations';

export const requestSoStatsAsync = createAsyncAction(`${nameSpace}/REQUEST_STATS`);

export const requestSoRepsAsync = createAsyncAction(`${nameSpace}/REQUEST_REPS`);

export const requestSoTeamsAsync = createAsyncAction(`${nameSpace}/REQUEST_TEAMS`);

export const exportSoRepsAsync = createAsyncAction(`${nameSpace}/EXPORT_REPS`);

export const requestSoSeasonsAsync = createAsyncAction(`${nameSpace}/REQUEST_SEASONS`);

export const updateRepsStatusAsync = createAsyncAction(`${nameSpace}/UPDATE_REPS_STATUS`);
