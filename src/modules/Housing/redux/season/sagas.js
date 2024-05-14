import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import { requestSeasonSummaries } from './actions';

function* requestSeasonSummariesSaga({ payload }) {
  const response = yield call(
    Api.getSeasonSummaries,
    { ...payload },
    { withCredentials: false }
  );

  yield put(
    requestSeasonSummaries.success(Mapper.getSeasonSummaries(response))
  );
}

export function* seasonWatcher() {
  yield takeLatest(
    requestSeasonSummaries.request.type,
    createRequestSaga(requestSeasonSummariesSaga, {
      keyNew: 'seasonSummaries',
      errKey: 'seasonSummaries',
      write: true,
    })
  );
}
