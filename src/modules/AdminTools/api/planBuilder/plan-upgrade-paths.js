import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/plan-builder/plan-upgrade-paths';

export const updatePlanUpgradePath = (id) =>
  Api.patch({ path: `${path}/${id}`, api });

export const createPlanUpgradePath = Api.post({ path, api });

export const removePlanUpgradePath = (id) =>
  Api.remove({ path: `${path}/${id}`, api });

export const getPlanUpgradePaths = Api.get({ path, api });
