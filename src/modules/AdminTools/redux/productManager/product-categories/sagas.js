import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/productManager';
import { createRequestSaga } from '@/redux/helpers';
import {
  createProductCategoryAsync,
  removeProductCategoryAsync,
  requestCategoriesAsync,
  updateProductCategoryAsync,
} from './actions';

function* updateProductCategorySaga({ payload: { productCategory } }) {
  const response = yield call(
    Api.updateProductCategory(productCategory.id),
    productCategory,
    {
      withCredentials: false,
    }
  );

  yield put(updateProductCategoryAsync.success(response));
}

function* createProductCategorySaga({ payload: { productCategory } }) {
  const response = yield call(Api.createProductCategory, productCategory, {
    withCredentials: false,
  });

  yield put(createProductCategoryAsync.success(response));
}

function* requestCategoriesSaga({ payload }) {
  let request = Api.getProductCategories;

  if (payload) {
    request = Api.getProductCategoriesWithSubCategories;
  }

  const response = yield call(request, null, {
    withCredentials: false,
  });

  yield put(requestCategoriesAsync.success(response));
}

function* removeCategorySaga({ payload: { id } }) {
  yield call(Api.removeProductCategory(id), null, {
    withCredentials: false,
  });

  yield put(removeProductCategoryAsync.success(id));
}

const errorHandler = (err) => {
  console.error(err);
};

export function* productCategoriesWatcher() {
  yield takeLatest(
    updateProductCategoryAsync.request.type,
    createRequestSaga(updateProductCategorySaga, {
      keyNew: 'updateProductCategory',
      errKey: 'updateProductCategory',
      write: false,
      onError: errorHandler,
    })
  );

  yield takeLatest(
    createProductCategoryAsync.request.type,
    createRequestSaga(createProductCategorySaga, {
      keyNew: 'updateProductCategory',
      errKey: 'updateProductCategory',
      write: false,
      onError: errorHandler,
    })
  );

  yield takeLatest(
    requestCategoriesAsync.request.type,
    createRequestSaga(requestCategoriesSaga, {
      keyNew: 'productCategories',
      errKey: 'productCategories',
      write: false,
    })
  );

  yield takeLatest(
    removeProductCategoryAsync.request.type,
    createRequestSaga(removeCategorySaga, {
      keyNew: 'productCategories',
      errKey: 'productCategories',
      write: false,
    })
  );
}
