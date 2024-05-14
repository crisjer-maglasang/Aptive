import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';

import Api from '../../api';

import {
  assignTeamZipsAsync,
  requestRepsListAsync,
  requestTeamAsync,
  requestTeamCellsAsync,
  requestTeamPinsAsync,
  requestTeamsAsync,
  requestTeamsListAsync,
  requestTeamStatisticsAsync,
  unassignTeamZipsAsync,
} from './actions';

import { addErrorAction } from '@/redux/errors';
import { sptConstants } from '@/modules/SalesPlanning/lib';

function* requestRepsListSaga({ payload }) {
  try{
    const teamMap = yield call(
      Api.getRepsList(payload),
      {},
      { withCredentials: false },
    );

    yield put(requestRepsListAsync.success(teamMap));
  } catch(error) {
    yield put(addErrorAction({ errKey: 'teamReps', error: error.response.data.errors }));
  }
}

function* requestTeamSaga({ payload }) {
  try {
    const teams = yield call(
      Api.getTeam(payload),
      {},
      { withCredentials: false },
    );

    if(teams.data.boundary) {
      yield put(requestTeamAsync.success(teams));
    } else {
      // No boundary means no assignments and an error must be thrown
      yield put(addErrorAction({ errKey: 'team', error: sptConstants.NO_ASSIGNMENTS_ERROR }));
    }
  } catch(error) {
    yield put(addErrorAction({ errKey: 'team', error: error.response.data.errors }));
  }
}

function* requestTeamsSaga({ payload }) {
  const teams = yield call(
    Api.getTeams,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestTeamsAsync.success(teams));
}

function* requestTeamCellsSaga({ payload }) {
  try {
    const { team_id, resolution, window } = payload;
    const body = {
      ...(typeof resolution !== 'undefined' && { resolution: resolution }),
      ...(typeof window !== 'undefined' && {
        window: {
          'type': 'Polygon',
          'coordinates': window,
        },
      }),
    };

    const { data } = yield call(
      Api.getTeamCells(team_id),
      body,
      { withCredentials: false },
    );

    yield put(requestTeamCellsAsync.success(data));
  } catch(error) {
    yield put(addErrorAction({ errKey: 'teamCells', error: error.response.data.errors }));
  }
}

function* requestTeamPinsSaga({ payload }) {
  try {
    const { team_id, boundary } = payload;
    const body = {
      ...(typeof boundary !== 'undefined' && {
        boundary: boundary,
      }),
    };

    const { data } = yield call(
      Api.getTeamPins(team_id),
      body,
      { withCredentials: false },
    );

    yield put(requestTeamPinsAsync.success(data));
  } catch(error) {
    yield put(addErrorAction({ errKey: 'teamPins', error: error.response.data.errors }));
  }
}

function* requestTeamsListSaga({ payload }) {
  try {
    const teamsList = yield call(
      Api.getTeamsList,
      { ...payload },
      { withCredentials: false },
    );

    yield put(requestTeamsListAsync.success(teamsList));

    for(const teamData of teamsList.data) {
      const teamStatistics = yield call(
        Api.getTeamsStatistics(teamData.team_id),
        { },
        { withCredentials: false },
      );

      yield put(requestTeamStatisticsAsync.success(teamStatistics));
    }
  } catch(error) {
    yield put(addErrorAction({ errKey: 'teamsList', error: error.response.data.errors }));
  }
}

function* requestTeamStatisticsSaga({ payload }) {
  const { team_id } = payload;
  const teamStatistics = yield call(
    Api.getTeamsStatistics(team_id),
    { },
    { withCredentials: false },
  );

  yield put(requestTeamStatisticsAsync.success(teamStatistics));
}

const getAreaTeams = (state) => state.teams.areaTeams;
function* loadTeamStatistics() {
  const areaTeams = yield select(getAreaTeams);
  for(const teamId in areaTeams) {
    const teamStatistics = yield call(
      Api.getTeamsStatistics(teamId),
      { },
      { withCredentials: false },
    );

    yield put(requestTeamStatisticsAsync.success(teamStatistics));
  }
}

function* assignTeamZipsSaga({ payload }) {
  try {
    const response = yield call(
      Api.assignTeamZips(payload.team),
      { zips: payload.zips },
      { withCredentials: false },
    );
    yield put(assignTeamZipsAsync.success(response));

    yield loadTeamStatistics();
    yield call(payload.callback(response));
  } catch(error) {
    yield put(addErrorAction({ errKey: 'teamZips', error: error.response.data.errors }));
  }
}

function* unassignTeamZipsSaga({ payload }) {
  try {
    const response = yield call(
      Api.unassignTeamZips(payload.team),
      { zips: payload.zips },
      { withCredentials: false },
    );
    yield put(unassignTeamZipsAsync.success(response));

    yield loadTeamStatistics();
    yield call(payload.callback(response));
  } catch(error) {
    yield put(addErrorAction({ errKey: 'teamZips', error: error.response.data.errors }));
  }
}

export function* teamsActionWatcher() {
  yield takeLatest(
    requestRepsListAsync.request.type,
    createRequestSaga(requestRepsListSaga, {
      keyNew: 'repsList',
      errKey: 'repsList',
      write: false,
    }),
  );

  yield takeLatest(
    requestTeamAsync.request.type,
    createRequestSaga(requestTeamSaga, {
      keyNew: 'team',
      errKey: 'team',
      write: false,
    }),
  );

  yield takeLatest(
    requestTeamsAsync.request.type,
    createRequestSaga(requestTeamsSaga, {
      keyNew: 'teams',
      errKey: 'teams',
      write: false,
    }),
  );

  yield takeLatest(
    requestTeamCellsAsync.request.type,
    createRequestSaga(requestTeamCellsSaga, {
      keyNew: 'teamCells',
      errKey: 'teamCells',
      write: false,
    }),
  );

  yield takeLatest(
    requestTeamPinsAsync.request.type,
    createRequestSaga(requestTeamPinsSaga, {
      keyNew: 'teamPins',
      errKey: 'teamPins',
      write: false,
    }),
  );

  yield takeLatest(
    requestTeamsListAsync.request.type,
    createRequestSaga(requestTeamsListSaga, {
      keyNew: 'teams',
      errKey: 'teams',
      write: false,
    }),
  );

  yield takeLatest(
    requestTeamStatisticsAsync.request.type,
    createRequestSaga(requestTeamStatisticsSaga, {
      keyNew: 'teams',
      errKey: 'teams',
      write: false,
    }),
  );

  yield takeLatest(
    assignTeamZipsAsync.request.type,
    createRequestSaga(assignTeamZipsSaga, {
      keyNew: 'teamZips',
      errKey: 'teamZips',
      write: false,
    }),
  );

  yield takeLatest(
    unassignTeamZipsAsync.request.type,
    createRequestSaga(unassignTeamZipsSaga, {
      keyNew: 'teamZips',
      errKey: 'teamZips',
      write: false,
    }),
  );
}
