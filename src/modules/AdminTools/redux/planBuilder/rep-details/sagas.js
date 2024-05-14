import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { createRequestSaga } from '@/redux/helpers';
import {
  clearRepPlans,
  requestRepDetailsAsync,
  requestRepPlansAsync,
} from './actions';

function* requestRepDetailsSaga() {
  const response = yield call(Api.getPlanBuilderRepDetails, null, {
    withCredentials: false,
  });

  yield put(requestRepDetailsAsync.success(response));
}

function* requestRepPlansSaga({ payload }) {
  const response = yield call(Api.getPlanBuilderRepPlans, payload, {
    withCredentials: false,
  });

  yield put(requestRepPlansAsync.success(response));
}

function* clearRepPlansSaga() {
  yield put(requestRepPlansAsync.success([]));
}

export function* repDetailsWatcher() {
  yield takeLatest(
    requestRepDetailsAsync.request.type,
    createRequestSaga(requestRepDetailsSaga, {
      keyNew: 'repDetails',
      errKey: 'repDetails',
      write: false,
    })
  );

  yield takeLatest(
    requestRepPlansAsync.request.type,
    createRequestSaga(requestRepPlansSaga, {
      keyNew: 'repDetails',
      errKey: 'repDetails',
      write: false,
    })
  );

  yield takeLatest(
    clearRepPlans.type,
    createRequestSaga(clearRepPlansSaga, {
      keyNew: 'repDetails',
      errKey: 'repDetails',
      write: false,
    })
  );
}
