import { createSelector } from 'reselect';

export const NAME = 'productSubCategories';

export const productSubCategorySelector = createSelector(
  (state) => state[NAME],
  (productSubCategories) => productSubCategories.sub_categories
);
