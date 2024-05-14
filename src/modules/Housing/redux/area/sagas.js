import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import { requestTeamsSummariesAsync, requestBranchesSummariesAsync } from './actions';

function* requestTeamsSummariesSaga({ payload }) {
  const response = yield call(
    Api.getTeamsSummaries,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestTeamsSummariesAsync.success(Mapper.getTeamsSummaries(response)));
}

function* requestBranchesSummariesSaga({ payload }) {
  const response = yield call(
    Api.getBranchesSummaires,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestBranchesSummariesAsync.success(Mapper.getBranchesSummaries(response)));
}

export function* areaWatcher() {
  yield takeLatest(
    requestTeamsSummariesAsync.request.type,
    createRequestSaga(requestTeamsSummariesSaga, {
      keyNew: 'teamsSummaries',
      errKey: 'teamsSummaries',
      write: true,
    }),
  );
  yield takeLatest(
    requestBranchesSummariesAsync.request.type,
    createRequestSaga(requestBranchesSummariesSaga, {
      keyNew: 'branchesSummaries',
      errKey: 'branchesSummaries',
      write: true,
    }),
  );
}
