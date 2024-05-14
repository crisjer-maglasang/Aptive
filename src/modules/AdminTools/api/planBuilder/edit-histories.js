import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/edit-histories';

export const getEditHistories = Api.get({ path, api });
