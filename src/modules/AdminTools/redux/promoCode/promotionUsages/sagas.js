import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/promoCode';
import { createRequestSaga } from '@/redux/helpers';
import {
  filterPromotionUsagesAsync,
  createPromotionUsageAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* filterPromotionUsagesSaga({ payload }) {
  const response = yield call(Api.filterPromotionUsages, payload, {
    withCredentials: false,
  });

  yield put(filterPromotionUsagesAsync.success(response));
}

function* createPromotionUsageSaga({ payload: { filter, createData } }) {
  yield call(Api.createPromotionUsage, createData, {
    withCredentials: false,
  });

  const response = yield call(Api.filterPromotionUsages, filter, {
    withCredentials: false,
  });

  yield put(filterPromotionUsagesAsync.success(response));
}

export function* promotionUsagesWatcher() {
  yield takeLatest(
    filterPromotionUsagesAsync.request.type,
    createRequestSaga(filterPromotionUsagesSaga, {
      keyNew: 'promotionUsages',
      errKey: 'promotionUsages',
      write: false,
    })
  );

  yield takeLatest(
    createPromotionUsageAsync.request.type,
    createRequestSaga(createPromotionUsageSaga, {
      keyNew: 'promotionUsagesUpdate',
      errKey: 'promotionUsagesUpdate',
      write: false,
      onError: createOnErrorHandler('promotionUsagesUpdate'),
    })
  );
}
