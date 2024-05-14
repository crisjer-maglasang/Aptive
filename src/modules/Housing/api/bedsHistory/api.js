import * as Api from '@/api/api';

const api = process.env.REACT_APP_HOUSING_API;

export const getBedsHistory = Api.get({ path: '/api/v1/housing/bed-management/allotments/history', api });

export const exportBedsHistories = Api.get({ path: '/api/v1/housing/bed-management/allotments/history/export', api });
