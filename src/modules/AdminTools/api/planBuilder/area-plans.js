import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/plan-builder/area-plans';

export const getPlanBuilderAreaPlans = Api.get({ path, api });
