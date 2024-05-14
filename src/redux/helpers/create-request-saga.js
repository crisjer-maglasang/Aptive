import { all, call, delay, put, select } from 'redux-saga/effects';

import { setLoadingAction } from '@/redux/loading';
import { addErrorAction, removeAllErrorsAction } from '@/redux/errors';
import { logoutAsync, userSelector } from '@/redux/auth';

import { ErrorCodes } from '@/lib/constants';

// TODO: rework this handler to get errors properly formatted:
//       1. should be always array of object with known shape.
//       2. display errors as toasts at UI.
export function* handleResponseError(
  { code, fields = [], message, errors },
  { action: { onError } = {}, errKey },
) {
  switch (code) {
    case ErrorCodes.VALIDATION_ERROR: {
      if (typeof onError === 'function') {
        yield call(onError, fields);
      } else {
        yield put(addErrorAction({
          errKey,
          error: message || errors?.map(({ detail }) => ({ message: detail })),
        }));
      }
      break;
    }
    default:
      yield put(addErrorAction({
        errKey,
        error: code || errors?.map(({ detail, message }) => ({ message: detail || message })),
      }));
      break;
  }
}

const defaultCreateRequestSaga = (
  reqFn,
  {
    keyNew,
    errKey,
    onError = handleResponseError,
    write = false,
  },
) => function* createRequestSaga(action) {
  const user = yield select(userSelector);
  const readOnly = user?.readOnly; // TODO: the `readOnly` attribute does not exist in the `user` model.

  // Disable write actions in readOnly mode.
  if (write && readOnly) {
    return;
  }

  // Clear out any errors and update loading.
  yield all([
    put(removeAllErrorsAction()),
    keyNew && put(setLoadingAction({ keyNew, value: true })),
  ]);

  try {
    yield call(reqFn, action);
  } catch (err) {
    const statusCode = err.response ? err.response.status : '';
    if (statusCode === 401) {
      yield put(logoutAsync.request());
      yield put(addErrorAction({ errKey: 'auth', error: 'Session expired. Please login again' }));
    }
    const error = err.response
      ? err.response.data
        ? err.response.data.error
          ? err.response.data.error
          : err.response.data
        : err.response
      : err.error
        ? err.error
        : err;

    yield call(onError, error, {
      action,
      errKey,
    });
  } finally {

    if (keyNew) {
      yield put(setLoadingAction({ keyNew, value: false }));
    }
  }
};

export default defaultCreateRequestSaga;
