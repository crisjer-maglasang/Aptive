import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/product-manager/products';

export const getProducts = Api.get({ path, api });

export const removeProduct = (id) => Api.remove({ path: `${path}/${id}`, api });

export const removeProductImage = (id) => Api.remove({ path: `${path}/${id}/image`, api });

export const updateProduct = (id) => Api.post({ path: `${path}/${id}`, api });

export const createProduct = Api.post({ path, api });

export const getProductImageUploadSize = Api.get({ path: `${path}/file_size`, api });
