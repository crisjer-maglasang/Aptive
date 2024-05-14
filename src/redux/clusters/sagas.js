import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';

import Api from '../../api';

import {
  requestClusterStatsAsync,
} from './actions';


function* requestClusterStatsSaga({ payload }) {

  const clusterStats = yield call(
    Api.getClusterStats,
    { 
      company_id: 1,
      ...payload
    },
    { withCredentials: false }
  );

  yield put(requestClusterStatsAsync.success(clusterStats));
}

export function* clusterStatsActionWatcher() {
  yield takeLatest(
    requestClusterStatsAsync.request.type,
    createRequestSaga(requestClusterStatsSaga, {
      keyNew: 'clusterStats',
      errKey: 'clusterStats',
      write: false,
    })
  );
}