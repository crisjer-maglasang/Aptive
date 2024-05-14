import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/product-manager/product-categories';

export const getProductCategories = Api.get({ path, api });

export const updateProductCategory = (id) =>
  Api.patch({ path: `${path}/${id}`, api });

export const removeProductCategory = (id) =>
  Api.remove({ path: `${path}/${id}`, api });

export const createProductCategory = Api.post({ path, api });

export const getProductCategoriesWithSubCategories = Api.get({
  path: `${path}?sub_categories=true`,
  api,
});
