import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { createRequestSaga } from '@/redux/helpers';
import {
  removePlanAsync,
  requestPlanAsync,
  requestPlansAsync,
  updatePlanAsync,
  createPlanAsync,
  massUpdateAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';
import { addToastsAction } from '@/redux/toasts';
import { mapMassUpdateToast } from '@/modules/AdminTools/api/planBuilder/mapResponseToToasts';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* requestPlansSaga() {
  const response = yield call(Api.getPlans, {}, { withCredentials: false });

  yield put(requestPlansAsync.success(response));
}

function* requestPlanSaga({ payload: { id } }) {
  const response = yield call(Api.getPlan(id), {}, { withCredentials: false });

  yield put(requestPlanAsync.success(response));
}

function* updatePlanSaga({ payload: { plan } }) {
  const response = yield call(Api.updatePlan(plan.id), plan, {
    withCredentials: false,
  });

  yield put(updatePlanAsync.success(response));
}

function* massUpdateSaga({ payload }) {
  const response = yield call(Api.massUpdatePlan, payload, {
    withCredentials: false,
  });

  yield put(massUpdateAsync.success(response));

  yield put(addToastsAction(mapMassUpdateToast(response)));
}

function* createPlanSaga({ payload: { plan } }) {
  const response = yield call(Api.createPlan, plan, { withCredentials: false });

  yield put(createPlanAsync.success(response));
}

function* removePlanSaga({ payload: { id } }) {
  yield call(Api.removePlan(id), {}, { withCredentials: false });

  yield put(removePlanAsync.success(id));
}

export function* plansWatcher() {
  yield takeLatest(
    requestPlansAsync.request.type,
    createRequestSaga(requestPlansSaga, {
      keyNew: 'plans',
      errKey: 'plans',
      write: false,
    })
  );

  yield takeLatest(
    requestPlanAsync.request.type,
    createRequestSaga(requestPlanSaga, {
      keyNew: 'plan',
      errKey: 'plan',
      write: false,
    })
  );

  yield takeLatest(
    updatePlanAsync.request.type,
    createRequestSaga(updatePlanSaga, {
      keyNew: 'updatePlan',
      errKey: 'updatePlan',
      write: false,
      onError: createOnErrorHandler('updatePlan'),
    })
  );

  yield takeLatest(
    massUpdateAsync.request.type,
    createRequestSaga(massUpdateSaga, {
      keyNew: 'updatePlan',
      errKey: 'updatePlan',
      write: false,
      onError: createOnErrorHandler('updatePlan'),
    })
  );

  yield takeLatest(
    createPlanAsync.request.type,
    createRequestSaga(createPlanSaga, {
      keyNew: 'updatePlan',
      errKey: 'updatePlan',
      write: false,
      onError: createOnErrorHandler('updatePlan'),
    })
  );

  yield takeLatest(
    removePlanAsync.request.type,
    createRequestSaga(removePlanSaga, {
      keyNew: 'plan',
      errKey: 'plan',
      write: false,
    })
  );
}
