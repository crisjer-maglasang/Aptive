import * as Api from '../../api';

const api = process.env.REACT_APP_SPT_API;

export const getTeamPolygons = (team) => Api.get({ path: `/api/v2/teams/${team}/polygons`, api });

export const getPolygonStatistics = (polygon) => Api.get({ path: `/api/v1/polygons/${polygon}/statistics`, api });

export const getTeamDispositions = (team) => Api.get({ path: `/api/v2/teams/${team}/dispositions`, api });

export const getAreaDispositions = (area) => Api.get({ path: `/api/v2/areas/${area}/dispositions`, api });

export const clearOutcomes = Api.remove({ path: '/api/v2/polygons/clear-pin-dispositions', api });

export const createPolygon = Api.post({ path: '/api/v2/polygons', api });

export const preview = Api.post({ path: '/api/v2/polygons/preview', api });

export const updateBoundary = (polygon) => Api.patch({ path: `/api/v2/polygons/${polygon}/boundary`, api });

export const activate = (polygon) => Api.post({ path: `/api/v2/polygons/${polygon}/activate`, api });

export const deactivatePolygons = Api.post({ path: '/api/v2/polygons/deactivate', api });

export const assignRepsToPolygon = Api.put({ path: '/api/v2/polygons/reps', api });

export const unassignRepsFromPolygons = Api.remove({ path: '/api/v2/polygons/reps', api });

export const deletePolygons = Api.remove({ path: '/api/v2/polygons/delete', api });
