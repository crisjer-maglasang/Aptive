import { createReducer } from '@/redux/root';

import {
  nameSpace,
  requestTeamPolygonsAsync,
  requestPolygonAsync,
  requestPolygonStatisticsAsync,
  requestPolygonPreviewAsync,
  requestCreateAsync,
  requestUpdateBoundaryAsync,
  requestPreviewAsync,
  requestUpdateRepsAsync,
  requestRemoveRepsAsync,
  requestActivateAsync,
  requestDeactivateAsync,
  requestDeletePolygonAsync,
  requestPolygonDispositionsAsync,
  resetPreview,
} from './actions';

const initialState = {
  teamPolygons: null,
  polygonStatistics: {},
  polygonDispositions: null,
  preview: null,
};

export const polygonsReducer = createReducer(nameSpace, initialState, {
  [requestTeamPolygonsAsync.success]: ({ state, action }) => {
    state.teamPolygons = action.payload;
  },

  [requestPolygonAsync.success]: ({ state, action }) => {
    state.polygon = action.payload;
  },

  [requestPreviewAsync.success]: ({ state, action }) => {
    const { data } = action.payload;

    state.preview = data;
  },

  [resetPreview]: ({ state }) => {
    state.preview = initialState.preview;
  },

  [requestUpdateBoundaryAsync.success]: ({ state, action }) => {
    state.updateBoundary = action.payload;
  },

  [requestPolygonStatisticsAsync.success]: ({ state, action }) => {
    const { data, polygonId } = action.payload;

    state.polygonStatistics[polygonId] = data;
  },

  [requestPolygonPreviewAsync.success]: ({ state, action }) => {
    state.preview = action.payload;
  },

  [requestCreateAsync.success]: ({ state, action }) => {
    state.newPolygon = action.payload;
  },

  [requestUpdateRepsAsync.success]: ({ state, action }) => {
    state.updateReps = action.payload;
  },

  [requestRemoveRepsAsync.success]: ({ state, action }) => {
    state.removeReps = action.payload;
  },

  [requestActivateAsync.success]: ({ state, action }) => {
    state.activatePolygon = action.payload;
  },

  [requestDeactivateAsync.success]: ({ state, action }) => {
    state.deactivatePolygon = action.payload;
  },

  [requestDeletePolygonAsync.success]: ({ state, action }) => {
    state.deletePolygon = action.payload;
  },

  [requestPolygonDispositionsAsync.success]: ({ state, action }) => {
    state.polygonDispositions = action.payload;
  },
});
