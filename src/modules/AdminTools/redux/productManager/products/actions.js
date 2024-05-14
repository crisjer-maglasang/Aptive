import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const productNameSpace = `${nameSpace}/products`;

export const requestProductsAsync = createAsyncAction(
  `${productNameSpace}/REQUEST_PRODUCTS`
);

export const removeProductAsync = createAsyncAction(
  `${productNameSpace}/REMOVE_PRODUCT`
);

export const removeProductImageAsync = createAsyncAction(
  `${productNameSpace}/REMOVE_PRODUCT_IMAGE`
);

export const updateProductAsync = createAsyncAction(
  `${productNameSpace}/UPDATE_PRODUCT`
);

export const createProductAsync = createAsyncAction(
  `${productNameSpace}/CREATE_PRODUCT`
);

export const requestProductImageFileSizeAsync = createAsyncAction(
  `${productNameSpace}/REQUEST_PRODUCT_IMAGE_FILE_SIZE`
);
