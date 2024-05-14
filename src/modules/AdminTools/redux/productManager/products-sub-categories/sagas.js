import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/productManager';
import { createRequestSaga } from '@/redux/helpers';
import { requestSubCategoriesAsync } from './actions';

function* requestSubCategoriesSaga() {
  const response = yield call(Api.getProductSubCategories, null, {
    withCredentials: false,
  });

  yield put(requestSubCategoriesAsync.success(response));
}

export function* productSubCategoriesWatcher() {
  yield takeLatest(
    requestSubCategoriesAsync.request.type,
    createRequestSaga(requestSubCategoriesSaga, {
      keyNew: 'productSubCategories',
      errKey: 'productSubCategories',
      write: false,
    })
  );
}
