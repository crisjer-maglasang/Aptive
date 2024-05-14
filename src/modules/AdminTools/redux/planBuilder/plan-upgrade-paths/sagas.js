import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { createRequestSaga } from '@/redux/helpers';
import {
  requestPlanUpgradePathsAsync,
  removePlanUpgradePathAsync,
  updatePlanUpgradePathAsync,
  createPlanUpgradePathAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* requestPlanUpgradePathsSaga() {
  const response = yield call(Api.getPlanUpgradePaths, null, {
    withCredentials: false,
  });

  yield put(requestPlanUpgradePathsAsync.success(response));
}

function* removePlanUpgradePathSaga({ payload: { id } }) {
  yield call(Api.removePlanUpgradePath(id), null, { withCredentials: false });

  yield put(removePlanUpgradePathAsync.success(id));
}

function* updatePlanUpgradePathSaga({ payload }) {
  const response = yield call(Api.updatePlanUpgradePath(payload.id), payload, {
    withCredentials: false,
  });

  yield put(updatePlanUpgradePathAsync.success(response));
}

function* createPlanUpgradePathSaga({ payload }) {
  if (typeof payload['use_to_plan_price'] === 'string') {
    payload['use_to_plan_price'] = payload['use_to_plan_price'] === 'true';
  }

  const response = yield call(Api.createPlanUpgradePath, payload, {
    withCredentials: false,
  });

  yield put(createPlanUpgradePathAsync.success(response));
}

export function* planUpgradePathsWatcher() {
  yield takeLatest(
    requestPlanUpgradePathsAsync.request.type,
    createRequestSaga(requestPlanUpgradePathsSaga, {
      keyNew: 'planUpgradePaths',
      errKey: 'planUpgradePaths',
      write: false,
    })
  );

  yield takeLatest(
    removePlanUpgradePathAsync.request.type,
    createRequestSaga(removePlanUpgradePathSaga, {
      keyNew: 'planUpgradePaths',
      errKey: 'planUpgradePaths',
      write: false,
    })
  );

  yield takeLatest(
    updatePlanUpgradePathAsync.request.type,
    createRequestSaga(updatePlanUpgradePathSaga, {
      keyNew: 'planUpgradePathsUpdate',
      errKey: 'planUpgradePathsUpdate',
      write: false,
      onError: createOnErrorHandler('planUpgradePathsUpdate'),
    })
  );

  yield takeLatest(
    createPlanUpgradePathAsync.request.type,
    createRequestSaga(createPlanUpgradePathSaga, {
      keyNew: 'planUpgradePathsUpdate',
      errKey: 'planUpgradePathsUpdate',
      write: false,
      onError: createOnErrorHandler('planUpgradePathsUpdate'),
    })
  );
}
