import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '../helpers';
import Api, { Mapper } from '../../api';
import {
  requestRecruitersAsync,
  requestRecruiterManagersAsync,
  requestRecruitingOfficesAsync,
} from './actions';

function* getRecruitersSaga() {
  const response = yield call(
    Api.getRecruiters,
    {},
    { withCredentials: false },
  );

  const { items } = Mapper.getRecruiters(response);

  yield put(requestRecruitersAsync.success({ items }));
}

function* getRecruiterManagersSaga({ payload }) {
  const { recruiterId } = payload;

  const response = yield call(
    Api.getRecruiterManagers(recruiterId),
    {},
    { withCredentials: false },
  );

  const { items } = Mapper.getRecruiterManagers(response);

  yield put(requestRecruiterManagersAsync.success({ recruiterId, items }));
}

function* getRecruitingOfficesSaga() {
  const response = yield call(
    Api.getRecruitingOffices,
    {},
    { withCredentials: false },
  );

  const { items } = Mapper.getRecruitingOffices(response);

  yield put(requestRecruitingOfficesAsync.success({ items }));
}

export function* recruitersActionWatcher() {
  yield takeLatest(
    requestRecruitersAsync.request.type,
    createRequestSaga(getRecruitersSaga, {
      keyNew: 'recruiters',
      errKey: 'recruiters',
      write: false,
    }),
  );

  yield takeLatest(
    requestRecruiterManagersAsync.request.type,
    createRequestSaga(getRecruiterManagersSaga, {
      keyNew: 'recruiterManagers',
      errKey: 'recruiterManagers',
      write: false,
    }),
  );

  yield takeLatest(
    requestRecruitingOfficesAsync.request.type,
    createRequestSaga(getRecruitingOfficesSaga, {
      keyNew: 'recruitersOffices',
      errKey: 'recruitersOffices',
      write: false,
    }),
  );
}
