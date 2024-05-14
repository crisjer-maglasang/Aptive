import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const categoriesNameSpace = `${nameSpace}/categories`;

export const requestCategoriesAsync = createAsyncAction(
  `${categoriesNameSpace}/REQUEST_CATEGORIES`
);

export const removeProductCategoryAsync = createAsyncAction(
  `${categoriesNameSpace}/REMOVE_CATEGORY`
);

export const updateProductCategoryAsync = createAsyncAction(
  `${categoriesNameSpace}/UPDATE_CATEGORY`
);

export const createProductCategoryAsync = createAsyncAction(
  `${categoriesNameSpace}/CREATE_CATEGORY`
);
