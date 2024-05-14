import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/productManager';
import { createRequestSaga } from '@/redux/helpers';
import {
  requestProductsAsync,
  removeProductAsync,
  removeProductImageAsync,
  updateProductAsync,
  createProductAsync,
  requestProductImageFileSizeAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* requestProductsSaga() {
  const response = yield call(Api.getProducts, undefined, {
    withCredentials: false,
  });

  yield put(requestProductsAsync.success(response));
}

function* requestProductImageFileSizeSaga() {
  const response = yield call(Api.getProductImageUploadSize, undefined, {
    withCredentials: false,
  });

  yield put(requestProductImageFileSizeAsync.success(response));
}

function* removeProductSaga({ payload: id }) {
  yield call(Api.removeProduct(id), undefined, { withCredentials: false });

  yield put(removeProductAsync.success(id));
}

function* removeProductImageSaga({ payload: id }) {
  const response = yield call(Api.removeProductImage(id), undefined, {
    withCredentials: false,
  });

  yield put(removeProductImageAsync.success(response));
}

function* updateProductSaga({ payload: { formData, id } }) {
  formData.append('_method', 'PATCH');

  const response = yield call(Api.updateProduct(id), formData, {
    withCredentials: false,
  });

  yield put(updateProductAsync.success(response));
}

function* createProductSaga({ payload: { formData } }) {
  const response = yield call(Api.createProduct, formData, {
    withCredentials: false,
  });

  yield put(createProductAsync.success(response));
}

export function* productsWatcher() {
  yield takeLatest(
    requestProductsAsync.request.type,
    createRequestSaga(requestProductsSaga, {
      keyNew: 'products',
      errKey: 'products',
      write: false,
    })
  );

  yield takeLatest(
    requestProductImageFileSizeAsync.request.type,
    createRequestSaga(requestProductImageFileSizeSaga, {
      keyNew: 'productsFileSize',
      errKey: 'productsFileSize',
      write: false,
    })
  );

  yield takeLatest(
    removeProductAsync.request.type,
    createRequestSaga(removeProductSaga, {
      keyNew: 'products',
      errKey: 'products',
      write: false,
    })
  );

  yield takeLatest(
    removeProductImageAsync.request.type,
    createRequestSaga(removeProductImageSaga, {
      keyNew: 'productsImage',
      errKey: 'productsImage',
      write: false,
    })
  );

  yield takeLatest(
    updateProductAsync.request.type,
    createRequestSaga(updateProductSaga, {
      keyNew: 'productsUpdate',
      errKey: 'productsUpdate',
      write: false,
      onError: createOnErrorHandler('productsUpdate'),
    })
  );

  yield takeLatest(
    createProductAsync.request.type,
    createRequestSaga(createProductSaga, {
      keyNew: 'productsUpdate',
      errKey: 'productsUpdate',
      write: false,
      onError: createOnErrorHandler('productsUpdate'),
    })
  );
}
