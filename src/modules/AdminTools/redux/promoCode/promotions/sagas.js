import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/promoCode';
import { createRequestSaga } from '@/redux/helpers';
import {
  requestPromotionsAsync,
  removePromotionAsync,
  updatePromotionAsync,
  createPromotionAsync,
  requestPromotionTypesAsync,
  disablePromotionAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* requestPromotionsSaga() {
  const response = yield call(Api.getPromotions, undefined, {
    withCredentials: false,
  });

  yield put(requestPromotionsAsync.success(response));
}

function* requestPromotionTypesSaga() {
  const response = yield call(Api.getPromotionTypes, undefined, {
    withCredentials: false,
  });

  yield put(requestPromotionTypesAsync.success(response));
}

function* removePromotionSaga({ payload: { id } }) {
  yield call(Api.removePromotion(id), undefined, {
    withCredentials: false,
  });

  yield put(removePromotionAsync.success(id));
}

function* disablePromotionSaga({ payload }) {
  const response = yield call(Api.disablePromotion(payload.id), undefined, {
    withCredentials: false,
  });

  yield put(updatePromotionAsync.success(response));
}

function* updatePromotionSaga({ payload }) {
  payload.initial_discount_value = payload.initial_discount_value * 100;
  payload.max_discount_value = payload.max_discount_value * 100;
  payload.recurring_discount_value = payload.recurring_discount_value * 100;
  payload.referral_value = payload.referral_value * 100;
  const response = yield call(Api.updatePromotion(payload.id), payload, {
    withCredentials: false,
  });

  yield put(updatePromotionAsync.success(response));
}

function* createPromotionSaga({ payload }) {
  const response = yield call(Api.createPromotion, payload, {
    withCredentials: false,
  });

  yield put(createPromotionAsync.success(response));
}

export function* promotionsWatcher() {
  yield takeLatest(
    requestPromotionsAsync.request.type,
    createRequestSaga(requestPromotionsSaga, {
      keyNew: 'promotions',
      errKey: 'promotions',
      write: false,
    })
  );

  yield takeLatest(
    requestPromotionTypesAsync.request.type,
    createRequestSaga(requestPromotionTypesSaga, {
      keyNew: 'promotions',
      errKey: 'promotions',
      write: false,
    })
  );

  yield takeLatest(
    removePromotionAsync.request.type,
    createRequestSaga(removePromotionSaga, {
      keyNew: 'promotions',
      errKey: 'promotions',
      write: false,
    })
  );

  yield takeLatest(
    disablePromotionAsync.request.type,
    createRequestSaga(disablePromotionSaga, {
      keyNew: 'promotions',
      errKey: 'promotions',
      write: false,
    })
  );

  yield takeLatest(
    updatePromotionAsync.request.type,
    createRequestSaga(updatePromotionSaga, {
      keyNew: 'promotionsUpdate',
      errKey: 'promotionsUpdate',
      write: false,
      onError: createOnErrorHandler('promotionsUpdate'),
    })
  );

  yield takeLatest(
    createPromotionAsync.request.type,
    createRequestSaga(createPromotionSaga, {
      keyNew: 'promotionsUpdate',
      errKey: 'promotionsUpdate',
      write: false,
      onError: createOnErrorHandler('promotionsUpdate'),
    })
  );
}
