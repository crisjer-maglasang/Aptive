import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import { requestDealersAsync, requestPartnershipsAsync } from './actions';

function* requestDealersSaga({ payload }) {
  const response = yield call(
    Api.getDealers,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestDealersAsync.success(Mapper.getDealers(response)));
}

function* requestPartnershipsSaga({ payload }) {
  const response = yield call(
    Api.getPartnerships,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestPartnershipsAsync.success(Mapper.getPartnerships(response)));
}

export function* partnershipWatcher() {
  yield takeLatest(
    requestDealersAsync.request.type,
    createRequestSaga(requestDealersSaga, {
      keyNew: 'dealers',
      errKey: 'dealers',
      write: true,
    }),
  );
  yield takeLatest(
    requestPartnershipsAsync.request.type,
    createRequestSaga(requestPartnershipsSaga, {
      keyNew: 'partnerships',
      errKey: 'partnerships',
      write: true,
    }),
  );
}
