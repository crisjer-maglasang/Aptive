import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api from '../../api';
import { requestArchivedLeadsAsync, restoreLeadAsync } from './';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData, mapSuccessToastsData } from '@/lib/api';

function* requestArchivedLeads({ payload }) {
  const response = yield call(
    Api.getArchivedLeads,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestArchivedLeadsAsync.success(response));
}

function* restoreLeadSaga({ payload }) {
  try {
    const { leadId, callback } = payload;
    const response = yield call(
      Api.restoreLead(leadId),
      {},
      { withCredentials: false },
    );

    yield put(addToastsAction(mapSuccessToastsData(response)));
    yield call(callback);
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

export function* archivedLeadsWatcher() {
  yield takeLatest(
    requestArchivedLeadsAsync.request.type,
    createRequestSaga(requestArchivedLeads, {
      keyNew: 'archivedLeads',
      errKey: 'archivedLeads',
      write: true,
    }),
  );
  yield takeLatest(
    restoreLeadAsync.request.type,
    createRequestSaga(restoreLeadSaga, {
      keyNew: 'restoreLead',
      errKey: 'restoreLead',
      write: true,
    }),
  );
}
