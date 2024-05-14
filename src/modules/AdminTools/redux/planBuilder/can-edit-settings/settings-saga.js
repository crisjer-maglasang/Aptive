import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { createRequestSaga } from '@/redux/helpers';
import { addErrorAction } from '@/redux/errors';

const settingError = function* onError({ errors }) {
  yield put(addErrorAction({ errKey: 'settingUpdate', error: errors }));
};

export function* settingsWatcher(setting, actions) {
  const {
    removeAsync,
    updateAsync,
    createAsync,
    requestsAsync,
  } = actions;

  function* updateSaga({ payload }) {
    const response = yield call(
      Api.updatePlanSetting(payload.id, setting),
      payload,
      {
        withCredentials: false,
      }
    );

    yield put(updateAsync.success(response));
  }

  function* createSaga({ payload }) {
    const response = yield call(Api.createPlanSetting(setting), payload, {
      withCredentials: false,
    });

    yield put(createAsync.success(response));
  }

  function* removeSaga({ payload: { id } }) {
    yield call(Api.removePlanSetting(id, setting), null, {
      withCredentials: false,
    });

    yield put(removeAsync.success(id));
  }

  function* requestsSaga() {
    const response = yield call(Api.getPlanSetting(setting), null, {
      withCredentials: false,
    });

    yield put(requestsAsync.success(response));
  }

  yield takeLatest(
    updateAsync.request.type,
    createRequestSaga(updateSaga, {
      keyNew: 'updatePlanBuilderSetting',
      errKey: 'updatePlanBuilderSetting',
      write: false,
      onError: settingError,
    })
  );

  yield takeLatest(
    createAsync.request.type,
    createRequestSaga(createSaga, {
      keyNew: 'updatePlanBuilderSetting',
      errKey: 'updatePlanBuilderSetting',
      write: false,
      onError: settingError,
    })
  );

  yield takeLatest(
    removeAsync.request.type,
    createRequestSaga(removeSaga, {
      keyNew: 'planBuilderSetting',
      errKey: 'planBuilderSetting',
      write: false,
    })
  );

  yield takeLatest(
    requestsAsync.request.type,
    createRequestSaga(requestsSaga, {
      keyNew: 'planBuilderSetting',
      errKey: 'planBuilderSetting',
      write: false,
    })
  );
}
