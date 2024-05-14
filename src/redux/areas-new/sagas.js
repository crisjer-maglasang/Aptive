import { all, call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import { addErrorAction } from '@/redux/errors';

import Api from '../../api';

import {
  requestAreasAsync,
  requestAreaMapAsync,
  requestAreasListAsync,
} from './actions';

function* requestAreasSaga({ payload }) {
  const areas = yield call(
    Api.getAreas,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestAreasAsync.success(areas));
}

function* requestAreaMapSaga({ payload }) {
  try {
    const allRequests = [];
    allRequests.push(call(Api.getArea(payload), {}, { withCredentials: false }));
    allRequests.push(call(Api.getAreaZipcodePolygons(payload), {}, { withCredentials: false }));

    const allResponses = yield all(allRequests);
    const data = {
      ...allResponses[0].data,
      ...allResponses[1].data,
    };

    yield put(requestAreaMapAsync.success(data));
  } catch(error) {
    yield put(addErrorAction({ errKey: 'areaMap', error: error.response.data.errors }));
  }
}

function* requestAreasListSaga() {
  const response = yield call(
    Api.getAreasList,
    {},
    { withCredentials: false },
  );

  yield put(requestAreasListAsync.success({ areas: response?.data }));
}

export function* areasActionWatcher() {
  yield takeLatest(
    requestAreasAsync.request.type,
    createRequestSaga(requestAreasSaga, {
      keyNew: 'areas',
      errKey: 'areas',
      write: false,
    }),
  );

  yield takeLatest(
    requestAreaMapAsync.request.type,
    createRequestSaga(requestAreaMapSaga, {
      keyNew: 'areaMap',
      errKey: 'areaMap',
      write: false,
    }),
  );

  yield takeLatest(
    requestAreasListAsync.request.type,
    createRequestSaga(requestAreasListSaga, {
      keyNew: 'areasList',
      errKey: 'areasList',
      write: false,
    }),
  );
}
