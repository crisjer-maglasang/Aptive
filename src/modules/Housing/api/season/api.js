import * as Api from '@/api/api';

const api = process.env.REACT_APP_HOUSING_API;

export const getSeasonSummaries = Api.get({
  path: '/api/v1/housing/recruiting-seasons',
  api,
});
