import { takeLatest, call, put } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import { markNotificationAsReadAsync, requestNotificationsAsync } from '@/redux/notifications/actions';
import Api from '@/api';
import { mapNotificationsRequestResponse } from '@/modules/Notification/lib';

function* requestNotificationsSaga() {
  const response = yield call(
    Api.getNotifications,
    {},
    { withCredentials: false },
  );

  const { items } = mapNotificationsRequestResponse(response);
  yield put(requestNotificationsAsync.success({ items }));
}

function* markNotificationAsReadSaga({ payload }) {
  const { id } = payload;

  yield call(
    Api.markNotificationAsRead(id),
    {},
    { withCredentials: false },
  );

  yield put(markNotificationAsReadAsync.success({ id }));
}

export function* notificationsActionWatcher() {
  yield takeLatest(
    requestNotificationsAsync.request.type,
    createRequestSaga(requestNotificationsSaga, {
      keyNew: 'notifications',
      errKey: 'notifications',
      write: false,
    }),
  );
  yield takeLatest(
    markNotificationAsReadAsync.request.type,
    createRequestSaga(markNotificationAsReadSaga, {
      keyNew: 'readNotification',
      errKey: 'readNotification',
      write: false,
    }),
  );
}
