import { createSelector } from 'reselect';
import { onboardingSidebar } from '@/lib/constants';

const { PERSONAL_INFO_STEP_ID } = onboardingSidebar;

export const selectNotifications = (state) => state?.notifications.components;

export const selectViewSection = (state) => state?.notifications.sectionInView;

export const selectViewStep = (state) => (state?.notifications.stepInView
  ? state?.notifications.stepInView
  : PERSONAL_INFO_STEP_ID);

export const selectIsLoading = (state) => state?.loading?.notifications?.isLoading;

export const notificationsSelector = createSelector(
  selectNotifications,
  (notifications) => Object.values(notifications),
);

export const hasNotificationsSelector = createSelector(
  selectNotifications,
  (notifications) => Object.values(notifications).length > 0,
);

export const hasUnreadNotificationsSelector = createSelector(
  selectNotifications,
  (notifications) => Object.values(notifications)
    .filter((item) => !item.isRead)
    .length > 0,
);
