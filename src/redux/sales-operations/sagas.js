import Api from '@/api';
import { createRequestSaga } from '@/redux/helpers';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  requestSoRepsAsync,
  requestSoStatsAsync,
  requestSoTeamsAsync,
  exportSoRepsAsync,
  requestSoSeasonsAsync,
  updateRepsStatusAsync,
} from './actions';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData, mapSuccessToastsData } from '@/lib/api';
import { prepareDataForUpdateRepsStatus } from '@/modules/dashboard/lib';

function* requestSoStatsSaga({ payload }) {
  const response = yield call(
    Api.getSoStats,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestSoStatsAsync.success(response));
}

function* requestSoRepsSaga({ payload }) {
  try {
    const response = yield call(
      Api.getSoReps,
      { ...payload },
      { withCredentials: false },
    );

    yield put(requestSoRepsAsync.success(response));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* requestSoTeamsSaga() {
  const response = yield call(
    Api.getSoTeams,
    {},
    { withCredentials: false },
  );

  yield put(requestSoTeamsAsync.success(response));
}

function* exportSoRepsSaga({ payload }) {
  const { selectedReps, params } = payload;
  const response = yield call(
    Api.exportSoReps,
    {
      ids: selectedReps,
      ...params,
    },
    { withCredentials: false },
  );

  yield put(exportSoRepsAsync.success(response));
}

function* requestSoSeasonsSaga() {
  const response = yield call(
    Api.getSoSeasons,
    {},
    { withCredentials: false },
  );

  yield put(requestSoSeasonsAsync.success(response));
}

function* updateRepsStatusSaga({ payload }) {
  try {
    const { statusParams, onSuccess } = payload;
    const data = prepareDataForUpdateRepsStatus(statusParams);
    const response = yield call(
      Api.updateRepsStatus,
      { ...data },
      { withCredentials: false },
    );

    yield put(addToastsAction(mapSuccessToastsData(response)));
    onSuccess();
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

export function* soActionWatcher() {
  yield takeLatest(
    requestSoStatsAsync.request,
    createRequestSaga(requestSoStatsSaga, {
      keyNew: 'soStats',
      errKey: 'soStats',
      write: false,
    }),
  );

  yield takeLatest(
    requestSoRepsAsync.request,
    createRequestSaga(requestSoRepsSaga, {
      keyNew: 'soReps',
      errKey: 'soReps',
      write: false,
    }),
  );

  yield takeLatest(
    requestSoTeamsAsync.request,
    createRequestSaga(requestSoTeamsSaga, {
      keyNew: 'soTeams',
      errKey: 'soTeams',
      write: false,
    }),
  );

  yield takeLatest(
    exportSoRepsAsync.request.type,
    createRequestSaga(exportSoRepsSaga, {
      keyNew: 'soExport',
      errKey: 'soExport',
      write: false,
    }),
  );

  yield takeLatest(
    requestSoSeasonsAsync.request,
    createRequestSaga(requestSoSeasonsSaga, {
      keyNew: 'soSeasons',
      errKey: 'soSeasons',
      write: false,
    }),
  );

  yield takeLatest(
    updateRepsStatusAsync.request,
    createRequestSaga(updateRepsStatusSaga, {
      keyNew: 'updateStatus',
      errKey: 'updateStatus',
      write: false,
    }),
  );
}
