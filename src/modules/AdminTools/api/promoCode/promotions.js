import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/promo-code/promotions';

export const getPromotions = Api.get({ path, api });

export const getPromotion = (id) => Api.get({ path: `${path}/${id}`, api });

export const getPromotionTypes = Api.get({ path: `${path}/types`, api });

export const updatePromotion = (id) =>
  Api.patch({ path: `${path}/${id}`, api });

export const disablePromotion = (id) =>
  Api.post({ path: `${path}/disable/${id}`, api });

export const removePromotion = (id) =>
  Api.remove({ path: `${path}/${id}`, api });

export const createPromotion = Api.post({ path, api });
