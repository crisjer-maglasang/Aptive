import * as Api from '../api';

const api = process.env.REACT_APP_ONB_API;

export const getNotifications = Api.get({ path: '/api/v1/notifications', api });

export const markNotificationAsRead = (notificationId) => Api.post({ path: `/api/v1/notifications/${notificationId}/read`, api });
