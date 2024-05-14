import * as Api from '@/api/api';

const api = process.env.REACT_APP_HOUSING_API;

export const getDealers = Api.get({ path: '/api/v1/partnership/dealers', api });

export const getPartnerships = Api.get({ path: '/api/v1/partnership/partnerships', api });
