import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/plan-builder/rep-details';

export const getPlanBuilderRepDetails = Api.get({ path, api });

export const getPlanBuilderRepPlans = Api.get({ path: `${path}/plans`, api });
