import * as Api from '@/api/api';

const api = process.env.REACT_APP_HOUSING_API;

export const getTeamsSummaries = Api.get({ path: '/api/v1/housing/area/teams-summaries', api });
export const getBranchesSummaires = Api.get({ path: '/api/v1/housing/area/branches-summaries', api });
export const getDealers = Api.get({ path: '/api/v1/housing/area/branches-summaries', api });
