import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/polygons';

export const requestTeamPolygonsAsync = createAsyncAction(`${nameSpace}/REQUEST_TEAM_POLYGONS`);

export const requestPolygonAsync = createAsyncAction(`${nameSpace}/REQUEST_POLYGON`);

export const requestPolygonStatisticsAsync = createAsyncAction(`${nameSpace}/REQUEST_POLYGON_STATISTICS`);

export const requestPolygonDispositionsAsync = createAsyncAction(`${nameSpace}/REQUEST_POLYGON_DISPOSITIONS`);

export const requestPolygonPreviewAsync = createAsyncAction(`${nameSpace}/REQUEST_POLYGON_PREVIEW`);

export const requestCreateAsync = createAsyncAction(`${nameSpace}/REQUEST_CREATE_POLYGON`);

export const requestPreviewAsync = createAsyncAction(`${nameSpace}/REQUEST_PREVIEW_POLYGON`);

export const resetPreview = createAction(`${nameSpace}/RESET_PREVIEW`);

export const requestUpdateBoundaryAsync = createAsyncAction(`${nameSpace}/REQUEST_UPDATE_BOUNDARY`);

export const requestActivateAsync = createAsyncAction(`${nameSpace}/REQUEST_ACTIVATE_POLYGON`);

export const requestDeactivateAsync = createAsyncAction(`${nameSpace}/REQUEST_DEACTIVATE_POLYGON`);

export const requestUpdateRepsAsync = createAsyncAction(`${nameSpace}/REQUEST_UPDATE_POLYGON_REPS`);

export const requestRemoveRepsAsync = createAsyncAction(`${nameSpace}/REQUEST_REMOVE_POLYGON_REPS`);

export const requestDeletePolygonAsync = createAsyncAction(`${nameSpace}/REQUEST_DELETE_POLYGON`);

export const requestClearOutcomesAsync = createAsyncAction(`${nameSpace}/REQUEST_CLEAR_OUTCOMES_POLYGON`);
