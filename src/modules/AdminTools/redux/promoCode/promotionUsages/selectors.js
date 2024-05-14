import { createSelector } from 'reselect';

export const NAME = 'promotionUsages';

export const filterPromotionUsagesSelector = createSelector(
  (state) => state[NAME],
  (promotionUsages) => promotionUsages.promotionUsages,
);
