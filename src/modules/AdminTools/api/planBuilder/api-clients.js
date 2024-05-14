import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/api-clients';

export const updatePlanBuilderApiClient = (id) =>
  Api.patch({ path: `${path}/${id}`, api });

export const createPlanBuilderApiClient = Api.post({ path, api });

export const removePlanBuilderApiClient = (id) =>
  Api.remove({ path: `${path}/${id}`, api });

export const getPlanBuilderApiClients = Api.get({ path, api });
