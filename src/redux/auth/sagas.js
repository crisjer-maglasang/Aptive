import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api, { Mapper } from '../../api';
import { createRequestSaga } from '@/redux/helpers';
import {
  authenticateWithTokenActionAsync,
  forgotPasswordAsync,
  loginAsync,
  logoutAction,
  logoutAsync,
  requestAuthUserAsync,
  resetPasswordAsync,
  logUserSessionAsync,
} from './actions';
import { isTeamLeaderSelector, isBranchManagerSelector } from '@/redux/auth';
import { HandleCookies } from '@/lib/api';
import { addToastsAction } from '@/redux/toasts';
import { saveDefaultTeamAction } from '@/redux/teams';
import { addErrorAction } from '@/redux/errors';

function* authenticateWithTokenSaga({ payload }) {
  const { token } = payload;
  try {
    const result = yield call(
      Api.authenticateWithToken,
      { token },
      { withCredentials: false },
    );

    const { payload, sig } = result?.data ?? {};
    yield call(HandleCookies.set, { name: 'tokenPayload', value: `${payload}.${sig}` });

    yield put(requestAuthUserAsync.request());
  } catch (error) {
    yield put(addToastsAction(Mapper.authenticateWithTokenErrors(error)));
  }
}

function* loginSaga({ payload }) {
  const { email, password } = payload;

  const response = yield call(
    Api.login,
    { email, password },
    { withCredentials: false },
  );

  const { access_token } = response?.data?.attributes ?? {};
  yield call(HandleCookies.set, { name: 'tokenPayload', value: access_token });

  yield put(requestAuthUserAsync.request());
}

function* logoutSaga() {
  yield put(logoutAction());

  // interval is added to complete processing all requests before logout process is finished
  setTimeout(() => call(HandleCookies.remove, 'tokenPayload'), 0);
}

function* forgotPasswordSaga({ payload }) {
  const { email, successCallback } = payload;
  yield call(
    Api.forgotPassword,
    { email },
    { withCredentials: false },
  );

  yield call(successCallback);
}

function* resetPasswordSaga({ payload }) {
  const { email, password, repeatPassword, token, successCallback } = payload;
  yield call(
    Api.resetPassword,
    { email, password, password_confirmation: repeatPassword, token },
    { withCredentials: false },
  );

  yield call(successCallback);
}

export function* handleResetResponseError(
  response,
  { action: { payload } = {} },
) {
  if (response?.data?.attributes?.issue_type) {
    const { tokenErrorCallback } = payload;

    yield call(tokenErrorCallback, response.data.attributes.issue_type);
  } else {
    yield put(addErrorAction({
      errKey: 'resetPassword',
      error: response?.errors?.map((error) => error.detail),
    }));
  }
}

function* requestAuthUserSaga() {
  try {
    const response = yield call(
      Api.getAuthUser,
      {},
      { withCredentials: false },
    );

    const { attributes: user } = response?.data ?? {};
    yield put(requestAuthUserAsync.success({ user }));

    const isTeamLead = yield select(isTeamLeaderSelector);
    const isBranchManager = yield select(isBranchManagerSelector);
    if (isTeamLead || isBranchManager) {
      const response = yield call(
        Api.getTeam(),
        {},
        { withCredentials: false },
      );
      yield put(saveDefaultTeamAction(Mapper.getDefaultTeamId(response)));
    }
  } catch (error) {
    yield put(logoutAsync.request());
  }
}

export function* logUserSessionSaga({ payload }) {
  const { sessionStartedAt, sessionFinishedAt, userId } = payload;

  yield call(
    Api.logUserSession,
    { session_started_at: sessionStartedAt, session_finished_at: sessionFinishedAt, user_id: userId },
    { withCredentials: false },
  );
}

export function* authWatcher() {
  yield takeLatest(
    authenticateWithTokenActionAsync.request.type,
    createRequestSaga(authenticateWithTokenSaga, {
      keyNew: 'oneTimeToken',
      errKey: 'oneTimeToken',
      write: false,
    }),
  );
  yield takeLatest(
    loginAsync.request.type,
    createRequestSaga(loginSaga, {
      keyNew: 'login',
      errKey: 'login',
      write: true,
    }),
  );
  yield takeLatest(
    logoutAsync.request.type,
    createRequestSaga(logoutSaga, {
      keyNew: 'logout',
      errKey: 'logout',
      write: true,
    }),
  );
  yield takeLatest(
    forgotPasswordAsync.request.type,
    createRequestSaga(forgotPasswordSaga, {
      keyNew: 'forgotPassword',
      errKey: 'forgotPassword',
      write: true,
    }),
  );
  yield takeLatest(
    resetPasswordAsync.request.type,
    createRequestSaga(resetPasswordSaga, {
      keyNew: 'resetPassword',
      errKey: 'resetPassword',
      write: true,
      onError: handleResetResponseError,
    }),
  );
  yield takeLatest(
    requestAuthUserAsync.request.type,
    createRequestSaga(requestAuthUserSaga, {
      keyNew: 'authUser',
      errKey: 'authUser',
      write: true,
    }),
  );
  yield takeLatest(
    logUserSessionAsync.request.type,
    createRequestSaga(logUserSessionSaga, {
      keyNew: 'userSession',
      errKey: 'userSession',
      write: true,
    }),
  );
}
