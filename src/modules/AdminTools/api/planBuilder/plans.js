import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/plan-builder/plans';

export const getPlans = Api.get({ path, api });

export const getPlan = (id) => Api.get({ path: `${path}/${id}`, api });

export const updatePlan = (id) => Api.patch({ path: `${path}/${id}`, api });

export const massUpdatePlan = Api.patch({ path: `${path}/mass-update`, api });

export const createPlan = Api.post({ path, api });

export const removePlan = (id) => Api.remove({ path: `${path}/${id}`, api });
