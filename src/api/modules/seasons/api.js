import * as Api from '../../api';

const api = process.env.REACT_APP_ONB_API;

export const getSalesSeason = Api.get({ path: '/api/v1/reps/sales-season', api });
