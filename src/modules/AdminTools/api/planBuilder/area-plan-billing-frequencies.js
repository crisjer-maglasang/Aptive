import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/plan-builder/area-plan-billing-frequencies';

export const getPlanBuilderAreaPlanBillingFrequencies = Api.get({ path, api });

export const getPlanBuilderBillingFrequencies = Api.get({ path: `${path}/billing-frequencies`, api });
