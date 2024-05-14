import { createSelector } from 'reselect';

export const NAME = 'products';

export const productsSelector = createSelector(
  (state) => state[NAME],
  (products) => products.products
);

export const productImageFileSizeSelector = createSelector(
  (state) => state[NAME],
  (products) => products.maxFileSizeInBytes
);
