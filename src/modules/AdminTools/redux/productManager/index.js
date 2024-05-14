import { productsReducer, productsWatcher } from './products';
import {
  productCategoriesReducer,
  productCategoriesWatcher,
} from './product-categories';
import {
  productSubCategoriesReducer,
  productSubCategoriesWatcher,
} from './products-sub-categories';

export const productManagerReducers = {
  ...productsReducer,
  ...productCategoriesReducer,
  ...productSubCategoriesReducer,
};

export const productManagerSagas = [
  productsWatcher(),
  productCategoriesWatcher(),
  productSubCategoriesWatcher(),
];
