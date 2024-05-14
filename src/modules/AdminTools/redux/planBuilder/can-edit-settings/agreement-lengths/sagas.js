import { all, call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { createRequestSaga } from '@/redux/helpers';
import {
  removeAgreementLengthAsync,
  updateAgreementLengthAsync,
  createAgreementLengthAsync,
  requestAgreementLengthsAsync,
  requestAgreementLengthUnitsAsync,
} from './actions';
import { settingsWatcher } from '../settings-saga';

function* requestAgreementLengthUnitsSaga() {
  const response = yield call(Api.getAgreementLengthUnits, null, {
    withCredentials: false,
  });

  yield put(requestAgreementLengthUnitsAsync.success(response));
}

export function* agreementLengthWatcher() {
  yield all([settingsWatcher('agreement-lengths', {
    removeAsync: removeAgreementLengthAsync,
    updateAsync: updateAgreementLengthAsync,
    createAsync: createAgreementLengthAsync,
    requestsAsync: requestAgreementLengthsAsync,
  }),

  takeLatest(
    requestAgreementLengthUnitsAsync.request.type,
    createRequestSaga(requestAgreementLengthUnitsSaga, {
      keyNew: 'AgreementLength',
      errKey: 'AgreementLength',
      write: false,
    })
  )])
}
