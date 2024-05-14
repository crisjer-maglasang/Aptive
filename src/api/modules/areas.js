import * as Api from '../api';

const api = process.env.REACT_APP_SPT_API;

export const getArea = (area) => Api.get({ path: `/api/v2/areas/${area}`, api });

export const getAreas = Api.get({ path: '/api/v2/areas', api });

export const getAreaZipcodePolygons = (area) => Api.get({ path: `/api/v1/areas/${area}/zips`, api });

export const getAreasList = Api.get({ path: '/api/v2/areas/list', api });
