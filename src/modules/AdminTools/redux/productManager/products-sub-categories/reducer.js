import { createReducer } from '@/redux/root';
import { requestSubCategoriesAsync, subCategoriesNameSpace } from './';
import { NAME } from './selectors';

const toOptions = (arr) =>
  arr.map(({ name, id }) => ({
    name,
    value: id,
  }));

const SubCategories = (sub_categories) => {
  const subCategoriesMap = new Map();
  sub_categories.forEach((product_sub_category) =>
    subCategoriesMap.set(+product_sub_category.id, product_sub_category)
  );

  return {
    get: (id) => subCategoriesMap.get(+id),
    sub_categories,
    options: toOptions(sub_categories),
    getOptions: (category_id) =>
      toOptions(
        sub_categories.filter(
          ({ product_category_id }) => +category_id === +product_category_id
        )
      ),
  };
};

const productsInitialState = {
  sub_categories: SubCategories([]),
};

export const productSubCategoriesReducer = {
  [NAME]: createReducer(subCategoriesNameSpace, productsInitialState, {
    [requestSubCategoriesAsync.success]: ({ state, action: { payload } }) => {
      state.sub_categories = SubCategories(payload);
    },
  }),
};
