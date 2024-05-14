import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import { requestSalesSeasonAsync } from './actions';

function* requestSalesSeasonSaga({ payload }) {
  const response = yield call(
    Api.getSalesSeason,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestSalesSeasonAsync.success(Mapper.getSalesSeason(response)));
}

export function* seasonsActionWatcher() {
  yield takeLatest(
    requestSalesSeasonAsync.request.type,
    createRequestSaga(requestSalesSeasonSaga, {
      keyNew: 'seasons',
      errKey: 'seasons',
      write: true,
    }),
  );
}
