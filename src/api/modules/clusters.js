import * as Api from '../api';

const api = process.env.REACT_APP_SPT_API;

export const getClusterStats = Api.post({ path: '/api/v1/clusters/statistics', api });
