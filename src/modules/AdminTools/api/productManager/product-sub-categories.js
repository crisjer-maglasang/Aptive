import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/product-manager/product-sub-categories';

export const getProductSubCategories = Api.get({ path, api });
