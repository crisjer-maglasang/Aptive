import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import {
  requestTeamPolygonsAsync,
  requestPolygonStatisticsAsync,
  requestPolygonDispositionsAsync,
  requestPreviewAsync,
  requestCreateAsync,
  requestUpdateBoundaryAsync,
  requestUpdateRepsAsync,
  requestRemoveRepsAsync,
  requestActivateAsync,
  requestDeactivateAsync,
  requestDeletePolygonAsync,
  requestClearOutcomesAsync,
} from './actions';
import { requestRepsListAsync } from './../teams/actions';
import { userSelector } from '@/redux/auth';
import { addErrorAction } from '@/redux/errors';
import { addToastsAction } from '@/redux/toasts';

function* requestTeamPolygonsSaga({ payload }) {
  const { team_id, callback } = payload;
  try {
    const limit = 1000;
    const firstPage = yield call(
      Api.getTeamPolygons(payload.team_id),
      {
        page: 1,
        limit: limit,
        team_id: team_id,
      },
      { withCredentials: false },
    );

    // If there are more pages of data, they must be retrieved
    if(firstPage.data.current_page !== firstPage.data.last_page) {
      const allRequests = [];

      // Create all the requests needed depending on the pages left
      for(let i = 2; i <= firstPage.data.last_page; i++) {
        allRequests.push(call(
          Api.getTeamPolygons(payload.team_id),
          {
            page: i,
            limit: limit,
            team_id: team_id,
          },
          { withCredentials: false },
        ));
      }

      // Make all requests asynchronously
      const teamPolygonsList = yield all(allRequests);

      // Format response by adding subsequent clusters to those from initial request
      let allPolygons = firstPage?.data?.data ?? [];

      for(const thisTeamPolygonSet of teamPolygonsList) {
        allPolygons = allPolygons.concat(thisTeamPolygonSet?.data?.data);
      }

      yield call(callback(allPolygons));
    } else {
      // Only had 1 page of data to return
      yield call(callback(firstPage?.data?.data ?? []));
    }
  } catch(error) {
    yield put(addErrorAction({ errKey: 'teamPolygons', error: error.response.data.errors }));
  }
}

function* requestPolygonStatisticsSaga({ payload }) {
  const { polygon_id } = payload;

  const response = yield call(
    Api.getPolygonStatistics(polygon_id),
    {},
    { withCredentials: false },
  );

  const data = Mapper.getPolygonStatData(response);

  yield put(requestPolygonStatisticsAsync.success({ data, polygonId: polygon_id }));
}

function* requestPolygonDispositionsSaga({ payload }) {
  const { id, type, page, limit, sort_by, order, search } = payload;
  try {
    if(type === 'area') {
      const { data } = yield call(
        Api.getAreaDispositions(id),
        { area_id: id, page, limit, sort_by, order, search },
        { withCredentials: false },
      );
      yield put(requestPolygonDispositionsAsync.success(Mapper.getPolygonDispositions(data)));
    } else {
      const { data } = yield call(
        Api.getTeamDispositions(id),
        { team_id: id, page, limit, sort_by, order },
        { withCredentials: false },
      );

      yield put(requestPolygonDispositionsAsync.success(Mapper.getPolygonDispositions(data)));
    }
  } catch(error) {
    yield put(addErrorAction({ errKey: 'polygonDispositions', error: error.response.data.errors }));
  }
}

function* requestPreviewSaga({ payload }) {
  const { boundary, team_id } = payload;
  try {
    const response = yield call(
      Api.preview,
      { boundary, team_id },
      { withCredentials: false },
    );

    const data = Mapper.getPolygonStatData(response);

    yield put(requestPreviewAsync.success({ data }));
  } catch(error) {
    yield put(addErrorAction({ errKey: 'polygonPreview', error: error.response.data.errors }));
  }
}

function* requestCreateSaga({ payload }) {
  const { team_id, reps, boundary, callback } = payload;

  try {
    const { data } = yield call(
      Api.createPolygon,
      {
        team_id,
        reps,
        boundary,
      },
      { withCredentials: false },
    );
    yield put(addToastsAction(Mapper.getCreatePolygonToastData(data)));
    yield loadReps(team_id);
    yield call(callback(data?.polygon));
  } catch(error) {
    const errorResponseData = error?.response?.data;

    if (errorResponseData?.data?.polygon) {
      const { data } = errorResponseData ?? {};
      yield put(addToastsAction(Mapper.getCreatePolygonToastData(data)));
      yield loadReps(team_id);
      yield call(callback, data?.polygon, Mapper.getLicensingRestrictionsForPolygon(data));
    } else {
      yield put(addErrorAction({ errKey: 'createPolygon', error: errorResponseData?.errors }));
    }
  }
}

function* loadReps(team_id) {
  try{
    const teamMap = yield call(
      Api.getRepsList(team_id),
      {},
      { withCredentials: false },
    );

    yield put(requestRepsListAsync.success(teamMap));
  } catch(error) {
    yield put(addErrorAction({ errKey: 'teamReps', error: error.response.data.errors }));
  }
}

function* requestUpdateBoundarySaga({ payload }) {
  try {
    const { polygon_id, boundary, team_id, callback } = payload;

    const response = yield call(
      Api.updateBoundary(polygon_id),
      { boundary },
      { withCredentials: false },
    );
    const data = Mapper.getUpdatedPolygonStatData(response);
    yield put(requestPolygonStatisticsAsync.success({ data, polygonId: polygon_id }));
    yield loadReps(team_id);
    yield call(callback());
  } catch(error) {
    yield put(addErrorAction({ errKey: 'updateBoundary', error: error.response.data.errors }));
  }
}

function* requestUpdateRepsSaga({ payload }) {
  const { polygon_ids, team_id, reps, callback } = payload;
  try {
    const body = {
      ...(typeof team_id !== 'undefined' && { team_id: team_id }),
      ...(typeof reps !== 'undefined' && { reps: reps }),
    };

    const { data } = yield call(
      Api.assignRepsToPolygon,
      { polygon_ids, ...body },
      { withCredentials: false },
    );

    if (reps.length) {
      yield put(addToastsAction(Mapper.getAssignPolygonData(data, reps)));
      yield loadReps(team_id);
    }
    yield call(callback, Mapper.getLicensingRestrictionsForPolygons(data), Mapper.getRestrictedReps(data));
  } catch(error) {
    const errorResponseData = error?.response?.data;

    if (errorResponseData?.errors) {
      yield put(addErrorAction({ errKey: 'updateReps', error: errorResponseData?.errors }));
    } else {
      const licensingRestrictionsInformation = Mapper.getLicensingRestrictionsForPolygons(errorResponseData?.data);
      const restrictedReps = Mapper.getRestrictedReps(errorResponseData.data);
      yield put(addToastsAction(Mapper.getAssignPolygonData(errorResponseData?.data, reps)));
      yield loadReps(team_id);
      yield call(callback, licensingRestrictionsInformation, restrictedReps);
    }
  }
}

function* requestRemoveRepsSaga({ payload }) {
  const { polygon_ids, team_id, callback } = payload;

  try {
    const { data } = yield call(
      Api.unassignRepsFromPolygons,
      { polygon_ids },
      { withCredentials: false },
    );
    const unassignedPolygons = Mapper.getSuccessfulPolygonIds(data);
    yield put(addToastsAction(Mapper.getUnassignPolygonData(data)));
    yield loadReps(team_id);
    yield call(callback(unassignedPolygons));
  } catch(error) {
    const unassignedPolygons = Mapper.getSuccessfulPolygonIds(error.response.data);
    yield put(addToastsAction(Mapper.getUnassignPolygonData(error.response.data)));
    yield call(callback(unassignedPolygons));
  }
}

function* requestClearOutcomesSaga({ payload }) {
  try {
    const { team_id, polygon_ids, callback } = payload;
    const user = yield select(userSelector);

    yield call(
      Api.clearOutcomes,
      { polygon_ids, season_id: user?.sales_season_id },
      { withCredentials: false },
    );
    yield put(addToastsAction(Mapper.getClearOutcomesToastData()));
    yield loadReps(team_id);
    yield call(callback());
  } catch(error) {
    yield put(addErrorAction({ errKey: 'clearOutcomes', error: error.response.data.errors }));
  }
}

function* requestActivateSaga({ payload }) {
  const { polygon_id, team_id, reps, callback } = payload;

  try {
    const activateRequest = call(Api.activate(polygon_id), {}, { withCredentials: false });
    const assignRepsRequest = reps.length
      ? call(
        Api.assignRepsToPolygon,
        { reps, team_id, polygon_ids: [polygon_id] },
        { withCredentials: false },
      )
      : null;

    const [activateResponse] = yield all([activateRequest, assignRepsRequest]);

    yield put(addToastsAction(Mapper.getActivatePolygonToastData(activateResponse?.data)));
    yield loadReps(team_id);
    yield call(callback);
  } catch (error) {
    const errorResponseData = error?.response?.data;

    if (errorResponseData?.errors) {
      yield put(addErrorAction({ errKey: 'activatePolygon', error: errorResponseData?.errors }));
    } else {
      const polygon = errorResponseData?.data[polygon_id]?.polygon;
      yield put(addToastsAction(Mapper.getActivatePolygonToastData(polygon)));
      const licensingRestrictionsInformation = Mapper.getLicensingRestrictionsForPolygons(errorResponseData?.data);
      const restrictedReps = Mapper.getRestrictedReps(errorResponseData.data);
      yield loadReps(team_id);
      yield call(callback, licensingRestrictionsInformation, restrictedReps);
    }
  }
}

function* requestDeactivateSaga({ payload }) {
  const { polygon_ids, team_id, callback } = payload;

  try {
    const { data } = yield call(
      Api.deactivatePolygons,
      { polygon_ids },
      { withCredentials: false },
    );
    const deactivatedPolygons = Mapper.getSuccessfulPolygonIds(data);
    yield put(addToastsAction(Mapper.getDeactivatePolygonToastsData(data)));
    yield loadReps(team_id);
    yield call(callback(deactivatedPolygons));
  } catch(error) {
    const deactivatedPolygons = Mapper.getSuccessfulPolygonIds(error.response?.data?.data);
    yield put(addToastsAction(Mapper.getDeactivatePolygonToastsData(error.response?.data?.data)));
    yield call(callback(deactivatedPolygons));
  }
}

function* requestDeletePolygonSaga({ payload }) {
  const { team_id, polygon_ids, callback } = payload;

  try {
    const { data } = yield call(
      Api.deletePolygons,
      { polygon_ids },
      { withCredentials: false },
    );
    const deletedPolygons = Mapper.getSuccessfulPolygonIds(data);
    yield put(addToastsAction(Mapper.getDeletePolygonToastsData(data)));
    yield loadReps(team_id);
    yield call(callback(deletedPolygons));
  } catch(error) {
    const deletedPolygons = Mapper.getSuccessfulPolygonIds(error.response?.data?.data);
    yield put(addToastsAction(Mapper.getDeletePolygonToastsData(error.response?.data?.data)));
    yield call(callback(deletedPolygons));
  }
}

export function* polygonsActionWatcher() {
  yield takeLatest(
    requestTeamPolygonsAsync.request.type,
    createRequestSaga(requestTeamPolygonsSaga, {
      keyNew: 'teamPolygons',
      errKey: 'teamPolygons',
      write: false,
    }),
  );

  yield takeLatest(
    requestPolygonStatisticsAsync.request.type,
    createRequestSaga(requestPolygonStatisticsSaga, {
      keyNew: 'polygonStatistics',
      errKey: 'polygonStatistics',
      write: false,
    }),
  );

  yield takeLatest(
    requestPolygonDispositionsAsync.request.type,
    createRequestSaga(requestPolygonDispositionsSaga, {
      keyNew: 'polygonDispositions',
      errKey: 'polygonDispositions',
      write: false,
    }),
  );

  yield takeLatest(
    requestPreviewAsync.request.type,
    createRequestSaga(requestPreviewSaga, {
      keyNew: 'polygonPreview',
      errKey: 'polygonPreview',
      write: false,
    }),
  );

  yield takeLatest(
    requestCreateAsync.request.type,
    createRequestSaga(requestCreateSaga, {
      keyNew: 'createPolygon',
      errKey: 'createPolygon',
      write: false,
    }),
  );

  yield takeLatest(
    requestUpdateBoundaryAsync.request.type,
    createRequestSaga(requestUpdateBoundarySaga, {
      keyNew: 'updateBoundary',
      errKey: 'updateBoundary',
      write: false,
    }),
  );

  yield takeLatest(
    requestUpdateRepsAsync.request.type,
    createRequestSaga(requestUpdateRepsSaga, {
      keyNew: 'updatePolygonReps',
      errKey: 'updatePolygonReps',
      write: false,
    }),
  );

  yield takeLatest(
    requestRemoveRepsAsync.request.type,
    createRequestSaga(requestRemoveRepsSaga, {
      keyNew: 'removePolygonReps',
      errKey: 'removePolygonReps',
      write: false,
    }),
  );

  yield takeLatest(
    requestDeletePolygonAsync.request.type,
    createRequestSaga(requestDeletePolygonSaga, {
      keyNew: 'deletePolygon',
      errKey: 'deletePolygon',
      write: false,
    }),
  );

  yield takeLatest(
    requestClearOutcomesAsync.request.type,
    createRequestSaga(requestClearOutcomesSaga, {
      keyNew: 'clearOutcomes',
      errKey: 'clearOutcomes',
      write: false,
    }),
  );

  yield takeLatest(
    requestActivateAsync.request.type,
    createRequestSaga(requestActivateSaga, {
      keyNew: 'activate',
      errKey: 'activate',
      write: false,
    }),
  );

  yield takeLatest(
    requestDeactivateAsync.request.type,
    createRequestSaga(requestDeactivateSaga, {
      keyNew: 'deactivate',
      errKey: 'deactivate',
      write: false,
    }),
  );
}
