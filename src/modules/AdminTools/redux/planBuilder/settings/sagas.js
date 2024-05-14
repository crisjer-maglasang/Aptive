import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '@/modules/AdminTools/api/planBuilder';
import { createRequestSaga } from '@/redux/helpers';
import { requestSettingsAsync } from './actions';

function* requestSettingsSaga() {
  const response = yield call(
    Api.getPlanBuilderSettings,
    {},
    { withCredentials: false }
  );

  yield put(requestSettingsAsync.success(response));
}

export function* settingsWatcher() {
  yield takeLatest(
    requestSettingsAsync.request.type,
    createRequestSaga(requestSettingsSaga, {
      keyNew: 'settings',
      errKey: 'settings',
      write: false,
    })
  );
}
