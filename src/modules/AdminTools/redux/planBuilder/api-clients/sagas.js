import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { addErrorAction } from '@/redux/errors';
import { createRequestSaga } from '@/redux/helpers';
import {
  removePlanBuilderApiClientAsync,
  updatePlanBuilderApiClientAsync,
  createPlanBuilderApiClientAsync,
  requestPlanBuilderApiClientsAsync,
  clearPlanBuilderApiTokens,
} from './actions';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* updateApiClientSaga({ payload: { client } }) {
  const response = yield call(
    Api.updatePlanBuilderApiClient(client.id),
    client,
    {
      withCredentials: false,
    }
  );

  yield put(updatePlanBuilderApiClientAsync.success(response));
}

function* createApiClientSaga({ payload: { client } }) {
  const response = yield call(Api.createPlanBuilderApiClient, client, {
    withCredentials: false,
  });

  yield put(createPlanBuilderApiClientAsync.success(response));
}

function* clearApiClientTokenSaga() {
  yield put(clearPlanBuilderApiTokens.success(true));
}

function* removeApiClientSaga({ payload: { id } }) {
  yield call(
    Api.removePlanBuilderApiClient(id),
    {},
    { withCredentials: false }
  );

  yield put(removePlanBuilderApiClientAsync.success(id));
}

function* requestApiClientsSaga() {
  const response = yield call(
    Api.getPlanBuilderApiClients,
    {},
    { withCredentials: false }
  );

  yield put(requestPlanBuilderApiClientsAsync.success(response));
}

export function* planBuilderApiClientWatcher() {
  yield takeLatest(
    clearPlanBuilderApiTokens.request.type,
    createRequestSaga(clearApiClientTokenSaga, {
      keyNew: 'updateApiClient',
      errKey: 'updateApiClient',
      write: false,
    })
  );

  yield takeLatest(
    updatePlanBuilderApiClientAsync.request.type,
    createRequestSaga(updateApiClientSaga, {
      keyNew: 'updateApiClient',
      errKey: 'updateApiClient',
      write: false,
      onError: createOnErrorHandler('updateApiClient'),
    })
  );

  yield takeLatest(
    createPlanBuilderApiClientAsync.request.type,
    createRequestSaga(createApiClientSaga, {
      keyNew: 'updateApiClient',
      errKey: 'updateApiClient',
      write: false,
      onError: createOnErrorHandler('updateApiClient'),
    })
  );

  yield takeLatest(
    removePlanBuilderApiClientAsync.request.type,
    createRequestSaga(removeApiClientSaga, {
      keyNew: 'ApiClient',
      errKey: 'ApiClient',
      write: false,
    })
  );

  yield takeLatest(
    requestPlanBuilderApiClientsAsync.request.type,
    createRequestSaga(requestApiClientsSaga, {
      keyNew: 'ApiClient',
      errKey: 'ApiClient',
      write: false,
    })
  );
}
