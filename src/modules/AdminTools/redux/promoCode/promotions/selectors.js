import { createSelector } from 'reselect';

export const NAME = 'promotions';

export const promotionsSelector = createSelector(
  (state) => state[NAME],
  (promotions) => promotions.promotions.promotions,
);

export const promotionReferralOptionsSelector = createSelector(
  (state) => state[NAME],
  (promotions) => promotions.promotions.referralOptions,
);

export const promotionNonReferralOptionsSelector = createSelector(
  (state) => state[NAME],
  (promotions) => promotions.promotions.promoOptions,
);

export const promotionTypesSelector = createSelector(
  (state) => state[NAME],
  (promotions) => promotions.types,
);

export const getPromotionSelector = createSelector(
  (state) => state[NAME],
  (promotions) => promotions.promotions.get,
);

export const updatingPromotionsLoadingSelector = createSelector(
  (state) => state.loading,
  (state) => state?.promotionsUpdate?.isLoading,
);
