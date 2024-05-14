import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import {
  requestUnBeddedSummariesAsync,
  requestBedManagementAsync,
  unassignRepAsync,
  assignRepAsync,
} from '@/modules/Housing/redux/bedManagement';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData } from '@/lib/api';
import { toastType } from '@/components/common';

function* requestUnBeddedSummariesSaga({ payload }) {
  const response = yield call(
    Api.getUnBeddedSummaries,
    Mapper.prepareDataForGetUnBeddedSummaries(payload),
    {
      withCredentials: false,
    }
  );

  yield put(
    requestUnBeddedSummariesAsync.success(Mapper.getUnBeddedSummaries(response))
  );
}

function* requestBedManagementSaga({ payload }) {
  const response = yield call(
    Api.getBedManagement,
    Mapper.prepareDataForGetBedManagement(payload),
    {
      withCredentials: false,
    }
  );

  yield put(
    requestBedManagementAsync.success(Mapper.getBedManagement(response))
  );
}

function* unassignRepSaga({ payload }) {
  try {
    const { complexId, apartmentId, successCallback, ...repDetail } = payload;
    yield call(
      Api.unassignRep(complexId, apartmentId),
      Mapper.prepareDataForUnassignRep(repDetail),
      { withCredentials: false }
    );

    yield put(
      addToastsAction([
        {
          type: toastType.SUCCESS,
          message: 'Rep Unassigned! The rep has been unassigned.',
          details: null,
        },
      ])
    );

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* assignRepSaga({ payload }) {
  try {
    const { complexId, apartmentId, successCallback, ...repDetail } = payload;
    yield call(
      Api.assignRep(complexId, apartmentId),
      Mapper.prepareDataForAssignRep(repDetail),
      { withCredentials: false }
    );

    yield put(
      addToastsAction([
        {
          type: toastType.SUCCESS,
          message: 'Rep Assigned! The rep has been assigned.',
          details: null,
        },
      ])
    );

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

export function* bedManagementWatcher() {
  yield takeLatest(
    requestUnBeddedSummariesAsync.request.type,
    createRequestSaga(requestUnBeddedSummariesSaga, {
      keyNew: 'unBeddedSummaries',
      errKey: 'unBeddedSummaries',
      write: true,
    })
  );

  yield takeLatest(
    requestBedManagementAsync.request.type,
    createRequestSaga(requestBedManagementSaga, {
      keyNew: 'bedManagementData',
      errKey: 'bedManagementData',
      write: true,
    })
  );

  yield takeLatest(
    unassignRepAsync.request.type,
    createRequestSaga(unassignRepSaga, {
      keyNew: 'unassignRep',
      errKey: 'unassignRep',
      write: true,
    })
  );

  yield takeLatest(
    assignRepAsync.request.type,
    createRequestSaga(assignRepSaga, {
      keyNew: 'assignRep',
      errKey: 'assignRep',
      write: true,
    })
  );
}
