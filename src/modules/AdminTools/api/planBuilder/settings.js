import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/plan-builder/';

export const getPlanBuilderSettings = Api.get({ path: `${path}settings`, api });

const ID = (id) => `${id ? '/' : ''}${id || ''}`;

export const updatePlanSettingField = (id, setting) =>
  Api.patch({ path: `${path}${setting}/field${ID(id)}`, api });

export const updatePlanSetting = (id, setting) =>
  Api.patch({ path: `${path}${setting}${ID(id)}`, api });

export const createPlanSetting = (setting) =>
  Api.post({ path: `${path}${setting}`, api });

export const removePlanSetting = (id, setting) =>
  Api.remove({ path: `${path}${setting}${ID(id)}`, api });

export const getPlanSetting = (setting) =>
  Api.get({ path: `${path}${setting}`, api });

export const getAgreementLengthUnits = Api.get({
  path: `${path}agreement-lengths/units`,
  api,
});
