import { planBuilderReducers, planBuilderSagas } from './planBuilder';
import { productManagerReducers, productManagerSagas } from './productManager';
import { promoCodeReducers, promoCodeSagas } from './promoCode';

export const adminToolsReducers = {
  ...planBuilderReducers,
  ...productManagerReducers,
  ...promoCodeReducers,
};

export const adminToolsSagas = [
  ...planBuilderSagas,
  ...productManagerSagas,
  ...promoCodeSagas,
];
