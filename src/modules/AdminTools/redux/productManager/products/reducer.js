import { createReducer } from '@/redux/root';
import {
  productNameSpace,
  requestProductsAsync,
  updateProductAsync,
  createProductAsync,
  removeProductAsync,
  removeProductImageAsync,
  requestProductImageFileSizeAsync,
} from './';
import { NAME } from './selectors';

const toOptions = (arr) =>
  arr.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

const Products = (products) => {
  const productsMap = new Map();
  products.forEach((product) => productsMap.set(+product.id, product));

  return {
    get: (id) => productsMap.get(+id),
    products,
    options: toOptions(products),
    create: (product) => Products([...products, product]),
    remove: (productId) =>
      Products(products.filter(({ id }) => id !== productId)),
  };
};

const productsInitialState = {
  products: Products([]),
  maxFileSizeInBytes: 2097152,
};

export const productsReducer = {
  [NAME]: createReducer(productNameSpace, productsInitialState, {
    [requestProductsAsync.success]: ({ state, action: { payload } }) => {
      state.products = Products(payload);
    },

    [requestProductImageFileSizeAsync.success]: ({
      state,
      action: { payload },
    }) => {
      state.maxFileSizeInBytes = payload;
    },

    [updateProductAsync.success]: ({ state, action: { payload } }) => {
      state.products.products.forEach((product, index) => {
        if (product.id === payload.id) {
          state.products.products[index] = payload;
        }
      });
    },

    [createProductAsync.success]: ({ state, action: { payload } }) => {
      state.products = state.products.create(payload);
    },

    [removeProductAsync.success]: ({ state, action: { payload } }) => {
      state.products = state.products.remove(payload);
    },

    [removeProductImageAsync.success]: ({ state, action: { payload } }) => {
      state.products.products.forEach((product, index) => {
        if (product.id === payload.id) {
          state.products.products[index].image = payload.image;
          state.products.products[index].image_name = payload.image_name;
        }
      });
    },
  }),
};
