import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/promoCode';
import { createRequestSaga } from '@/redux/helpers';
import {
  filterReferralUsagesAsync,
  createReferralUsageAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* filterReferralUsagesSaga({ payload }) {
  const response = yield call(Api.filterReferralUsages, payload, {
    withCredentials: false,
  });

  yield put(filterReferralUsagesAsync.success(response));
}

function* createReferralUsageSaga({ payload: { createData, filter } }) {
  yield call(Api.createReferralUsage, createData, {
    withCredentials: false,
  });

  const response = yield call(Api.filterReferralUsages, filter, {
    withCredentials: false,
  });

  yield put(filterReferralUsagesAsync.success(response));
}

export function* referralUsagesWatcher() {
  yield takeLatest(
    filterReferralUsagesAsync.request.type,
    createRequestSaga(filterReferralUsagesSaga, {
      keyNew: 'referralUsages',
      errKey: 'referralUsages',
      write: false,
    })
  );

  yield takeLatest(
    createReferralUsageAsync.request.type,
    createRequestSaga(createReferralUsageSaga, {
      keyNew: 'referralUsagesUpdate',
      errKey: 'referralUsagesUpdate',
      write: false,
      onError: createOnErrorHandler('referralUsagesUpdate'),
    })
  );
}
