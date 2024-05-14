import { createSelector } from 'reselect';

export const NAME = 'productCategories';

export const productCategorySelector = createSelector(
  (state) => state[NAME],
  (productCategories) => productCategories.categories
);
