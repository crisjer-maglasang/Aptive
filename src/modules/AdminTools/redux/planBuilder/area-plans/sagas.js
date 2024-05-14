import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { createRequestSaga } from '@/redux/helpers';
import {
  requestAreaPlansAsync,
  requestBillingFrequenciesAsync,
} from './actions';

function* requestAreaPlansSaga() {
  const response = yield call(Api.getPlanBuilderAreaPlans, null, {
    withCredentials: false,
  });

  yield put(requestAreaPlansAsync.success(response));
}

function* requestBillingFrequenciesSaga() {
  const response = yield call(Api.getPlanBuilderBillingFrequencies, null, {
    withCredentials: false,
  });

  yield put(requestBillingFrequenciesAsync.success(response));
}

export function* areaPlansWatcher() {
  yield takeLatest(
    requestAreaPlansAsync.request.type,
    createRequestSaga(requestAreaPlansSaga, {
      keyNew: 'areaPlans',
      errKey: 'areaPlans',
      write: false,
    })
  );

  yield takeLatest(
    requestBillingFrequenciesAsync.request.type,
    createRequestSaga(requestBillingFrequenciesSaga, {
      keyNew: 'billingFrequencies',
      errKey: 'billingFrequencies',
      write: false,
    })
  );
}
