import { createReducer } from '@/redux/root';
import {
  categoriesNameSpace,
  createProductCategoryAsync,
  removeProductCategoryAsync,
  requestCategoriesAsync,
  updateProductCategoryAsync,
} from './';
import { NAME } from './selectors';

const toOptions = (arr) =>
  arr.map(({ name, id }) => ({
    name,
    value: id,
  }));

const Categories = (categories) => {
  const categoriesMap = new Map();
  categories.forEach((product_category) =>
    categoriesMap.set(+product_category.id, product_category)
  );

  return {
    get: (id) => categoriesMap.get(+id),
    categories,
    options: toOptions(categories),
    create: (category) => Categories([...categories, category]),
    remove: (categoryId) =>
      Categories(categories.filter(({ id }) => id !== categoryId)),
  };
};

const productsInitialState = {
  categories: Categories([]),
};

export const productCategoriesReducer = {
  [NAME]: createReducer(categoriesNameSpace, productsInitialState, {
    [updateProductCategoryAsync.success]: ({ state, action: { payload } }) => {
      state.categories.categories.forEach(({ id }, index) => {
        if (id === payload.id) {
          state.categories.categories[index] = payload;
        }
      });
    },

    [createProductCategoryAsync.success]: ({ state, action: { payload } }) => {
      state.categories = state.categories.create(payload);
    },

    [removeProductCategoryAsync.success]: ({ state, action: { payload } }) => {
      state.categories = state.categories.remove(payload);
    },

    [requestCategoriesAsync.success]: ({ state, action: { payload } }) => {
      state.categories = Categories(payload);
    },
  }),
};
