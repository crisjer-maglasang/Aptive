import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/promo-code/promotion-usages';

export const filterPromotionUsages = Api.post({ path: `${path}/filter`, api });

export const createPromotionUsage = Api.post({ path, api });
