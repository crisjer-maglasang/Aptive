import Api from '@/api'
import { createRequestSaga } from '@/redux/helpers'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  requestUsersAsync,
  restoreUserAsync,
  deleteUserAsync,
} from './actions';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData } from '@/lib/api';

function* requestUsersSaga({ payload }) {
  const isActive = payload?.filter?.is_active || false;

  try {
    const response = yield call(
      Api.getUsers(isActive),
      { ...payload },
      { withCredentials: false },
    );

    yield put(requestUsersAsync.success(response));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* restoreUserSaga({ payload }) {
  const { userId } = payload
  const result = yield call(
    Api.restoreUser(userId),
    {},
    { withCredentials: false }
  )

  yield put(restoreUserAsync.success(result))
  yield call(payload.callback)
}

function* deleteUserSaga({ payload }) {
  const { userId } = payload
  const result = yield call(
    Api.deleteUser(userId),
    {},
    { withCredentials: false }
  )

  yield put(deleteUserAsync.success(result))
  yield call(payload.callback)
}

export function* usersActionWatcher() {
  yield takeLatest(
    requestUsersAsync.request,
    createRequestSaga(requestUsersSaga, {
      keyNew: 'users',
      errKey: 'users',
      write: false
    })
  )
  yield takeLatest(
    deleteUserAsync.request.type,
    createRequestSaga(deleteUserSaga, {
      keyNew: 'deleteUser',
      errKey: 'deleteUser',
      write: true,
    })
  )
  yield takeLatest(
    restoreUserAsync.request.type,
    createRequestSaga(restoreUserSaga, {
      keyNew: 'restoreUser',
      errKey: 'restoreUser',
      write: true,
    })
  )
}
