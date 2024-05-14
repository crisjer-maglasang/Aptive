import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/promoCode';
import { createRequestSaga } from '@/redux/helpers';
import {
  requestCampaignsAsync,
  removeCampaignAsync,
  updateCampaignAsync,
  createCampaignAsync,
  requestCampaignChannelsAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* requestCampaignsSaga() {
  const response = yield call(Api.getCampaigns, undefined, {
    withCredentials: false,
  });

  yield put(requestCampaignsAsync.success(response));
}

function* requestCampaignChannelsSaga() {
  const response = yield call(Api.getCampaignChannels, undefined, {
    withCredentials: false,
  });

  yield put(requestCampaignChannelsAsync.success(response));
}

function* removeCampaignSaga({ payload: { id } }) {
  yield call(Api.removeCampaign(id), undefined, { withCredentials: false });

  yield put(removeCampaignAsync.success(id));
}

function* updateCampaignSaga({ payload }) {
  const response = yield call(Api.updateCampaign(payload.id), payload, {
    withCredentials: false,
  });

  yield put(updateCampaignAsync.success(response));
}

function* createCampaignSaga({ payload }) {
  const response = yield call(Api.createCampaign, payload, {
    withCredentials: false,
  });

  yield put(createCampaignAsync.success(response));
}

export function* campaignsWatcher() {
  yield takeLatest(
    requestCampaignsAsync.request.type,
    createRequestSaga(requestCampaignsSaga, {
      keyNew: 'campaigns',
      errKey: 'campaigns',
      write: false,
    })
  );

  yield takeLatest(
    requestCampaignChannelsAsync.request.type,
    createRequestSaga(requestCampaignChannelsSaga, {
      keyNew: 'campaigns',
      errKey: 'campaigns',
      write: false,
    })
  );

  yield takeLatest(
    removeCampaignAsync.request.type,
    createRequestSaga(removeCampaignSaga, {
      keyNew: 'campaigns',
      errKey: 'campaigns',
      write: false,
    })
  );

  yield takeLatest(
    updateCampaignAsync.request.type,
    createRequestSaga(updateCampaignSaga, {
      keyNew: 'campaignsUpdate',
      errKey: 'campaignsUpdate',
      write: false,
      onError: createOnErrorHandler('campaignsUpdate'),
    })
  );

  yield takeLatest(
    createCampaignAsync.request.type,
    createRequestSaga(createCampaignSaga, {
      keyNew: 'campaignsUpdate',
      errKey: 'campaignsUpdate',
      write: false,
      onError: createOnErrorHandler('campaignsUpdate'),
    })
  );
}
