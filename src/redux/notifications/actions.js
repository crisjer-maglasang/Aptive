import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/notifications';

export const requestNotificationsAsync = createAsyncAction(`${nameSpace}/REQUEST_NOTIFICATIONS`);

export const markNotificationAsReadAsync = createAsyncAction(`${nameSpace}/MARK_NOTIFICATION_AS_READ`);

export const setReviewDocumentAction = createAction(`${nameSpace}/SET_REVIEW_DOCUMENT`);
