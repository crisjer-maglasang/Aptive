import { call, put, takeLatest } from 'redux-saga/effects';
import Api, { Mapper } from '../../api';
import {
  requestBedsHistoryAsync,
  exportBedsHistoriesAsync,    
} from './actions';
import { createRequestSaga } from '@/redux/helpers';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData } from '@/lib/api';

function* requestBedsHistory({ payload }){
  try {
    const response = yield call(
      Api.getBedsHistory,
      { ...payload },
      { withCredentials: false },
    );

    yield put(requestBedsHistoryAsync.success(Mapper.getBedsHistory(response)));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* exportBedsHistoriesSaga({ payload }) {
  try {
    const response = yield call(
      Api.exportBedsHistories,
      { ...payload },
      { withCredentials: false },
    );

    yield put(exportBedsHistoriesAsync.success(response));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

export function* bedsHistoryActionWatcher() {
  yield takeLatest(
    requestBedsHistoryAsync.request.type,
    createRequestSaga(requestBedsHistory, {
      keyNew: 'bedsHistoryList',
      errKey: 'bedsHistoryList',
      write: true,
    }),
  );

  yield takeLatest(
    exportBedsHistoriesAsync.request.type,
    createRequestSaga(exportBedsHistoriesSaga, {
      keyNew: 'exportBedsHistories',
      errKey: 'exportBedsHistories',
      write: true,
    }),
  );
};
