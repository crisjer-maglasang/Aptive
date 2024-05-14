import Api from '@/api/index';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import {
  requestApprovalDocumentsAsync,
  requestRegionalsAsync,
  requestRepsForApprovalAsync,
  setIsApproved,
  updateApprovalDocumentsAsync,
} from '@/redux/approval';
import {
  mapRepsForApprovalResponse,
  mapUserRoleResponse,
  mapApprovalDocumentsResponse,
  prepareDataForRequestReps,
  prepareDataForApproveDocuments,
} from '@/modules/RepsApproval/lib';
import { addToastsAction } from '@/redux/toasts';
import { requestNotificationsAsync } from '@/redux/notifications';
import { mapErrorToastsData, mapSuccessToastsData } from '@/lib/api';

function* requestRepsForApprovalSaga({ payload }) {
  try {
    const params = prepareDataForRequestReps(payload);
    const response = yield call(
      Api.getRepsForApproval,
      { ...params },
      { withCredentials: false },
    );
    const { items, total } = mapRepsForApprovalResponse(response);
    yield put(requestRepsForApprovalAsync.success({ items, total }));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* requestRegionalsSaga() {
  const response = yield call(
    Api.getRegionals,
    {},
    { withCredentials: false },
  );

  const { items } = mapUserRoleResponse(response);

  yield put(requestRegionalsAsync.success({ items }));
}

function* requestApprovalDocuments({ payload }) {
  try {
    const { userId } = payload;

    const response = yield call(
      Api.getApprovalItems(userId),
      {},
      { withCredentials: false },
    );

    const { items } = mapApprovalDocumentsResponse(response);

    yield put(requestApprovalDocumentsAsync.success({ items }));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));
    throw error;
  }
}

function* approveRepDocuments({ payload }) {
  try {
    const { userId, documents } = payload;
    const data = prepareDataForApproveDocuments(documents);
    const response = yield call(
      Api.updateApprovalItems(userId),
      { ...data },
      { withCredentials: false },
    );

    yield put(addToastsAction(mapSuccessToastsData(response)));
    yield put(requestNotificationsAsync.request());
    yield put(setIsApproved(true));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));
    throw error;
  }
}

export function* approvalActionWatcher() {
  yield takeLatest(
    requestRepsForApprovalAsync.request.type,
    createRequestSaga(requestRepsForApprovalSaga, {
      keyNew: 'approval',
      errKey: 'approval',
      write: false,
    }),
  );
  yield takeLatest(
    requestRegionalsAsync.request.type,
    createRequestSaga(requestRegionalsSaga, {
      keyNew: 'regionals',
      errKey: 'regionals',
      write: false,
    }),
  );
  yield takeLatest(
    requestApprovalDocumentsAsync.request.type,
    createRequestSaga(requestApprovalDocuments, {
      keyNew: 'approvalItems',
      errKey: 'approvalItems',
      write: false,
    }),
  );
  yield takeLatest(
    updateApprovalDocumentsAsync.request.type,
    createRequestSaga(approveRepDocuments, {
      keyNew: 'approvalItems',
      errKey: 'approvalItems',
      write: false,
    }),
  );
}
