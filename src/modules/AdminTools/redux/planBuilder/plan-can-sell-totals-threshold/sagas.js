import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { createRequestSaga } from '@/redux/helpers';
import {
  removePlanCanSellTotalsThresholdAsync,
  updatePlanCanSellTotalsThresholdAsync,
  createPlanCanSellTotalsThresholdAsync,
  requestPlanCanSellTotalsThresholdAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const setting = 'can-sell-totals-thresholds';

function* updatePlanCanSellTotalsThresholdSaga({ payload }) {
  const response = yield call(Api.updatePlanSetting('', setting), payload, {
    withCredentials: false,
  });

  yield put(updatePlanCanSellTotalsThresholdAsync.success(response));
}

function* createPlanCanSellTotalsThresholdSaga({ payload }) {
  const response = yield call(Api.createPlanSetting(setting), payload, {
    withCredentials: false,
  });

  yield put(createPlanCanSellTotalsThresholdAsync.success(response));
}

function* removePlanCanSellTotalsThresholdSaga() {
  yield call(Api.removePlanSetting('', setting), null, {
    withCredentials: false,
  });

  yield put(removePlanCanSellTotalsThresholdAsync.success());
}

function* requestPlanCanSellTotalsThresholdSaga() {
  const response = yield call(Api.getPlanSetting(setting), null, {
    withCredentials: false,
  });

  yield put(requestPlanCanSellTotalsThresholdAsync.success(response));
}

const settingError = function* onError({ errors }) {
  yield put(
    addErrorAction({
      errKey: 'updatePlanCanSellTotalsThreshold',
      error: errors,
    })
  );
};

export function* planCanSellTotalsThresholdWatcher() {
  yield takeLatest(
    updatePlanCanSellTotalsThresholdAsync.request.type,
    createRequestSaga(updatePlanCanSellTotalsThresholdSaga, {
      keyNew: 'updatePlanCanSellTotalsThreshold',
      errKey: 'updatePlanCanSellTotalsThreshold',
      write: false,
      onError: settingError,
    })
  );

  yield takeLatest(
    createPlanCanSellTotalsThresholdAsync.request.type,
    createRequestSaga(createPlanCanSellTotalsThresholdSaga, {
      keyNew: 'updatePlanCanSellTotalsThreshold',
      errKey: 'updatePlanCanSellTotalsThreshold',
      write: false,
      onError: settingError,
    })
  );

  yield takeLatest(
    removePlanCanSellTotalsThresholdAsync.request.type,
    createRequestSaga(removePlanCanSellTotalsThresholdSaga, {
      keyNew: 'PlanCanSellTotalsThreshold',
      errKey: 'PlanCanSellTotalsThreshold',
      write: false,
    })
  );

  yield takeLatest(
    requestPlanCanSellTotalsThresholdAsync.request.type,
    createRequestSaga(requestPlanCanSellTotalsThresholdSaga, {
      keyNew: 'PlanCanSellTotalsThreshold',
      errKey: 'PlanCanSellTotalsThreshold',
      write: false,
    })
  );
}
