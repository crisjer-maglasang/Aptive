import { createReducer } from '@/redux/root';
import { markNotificationAsReadAsync, nameSpace, requestNotificationsAsync, setReviewDocumentAction } from './actions';
import { cloneDeep, keyBy } from 'lodash-es';
import { TYPE } from '@/modules/Notification/lib';
import { logoutAction } from '@/redux/auth';
import { onboardingSidebar } from '@/lib/constants';

const { PERSONAL_INFO_STEP_ID } = onboardingSidebar;

const initialState = {
  components: {},
  sectionInView: null,
  stepInView: PERSONAL_INFO_STEP_ID,
};

export const notificationsReducer = createReducer(nameSpace, initialState, {
  [requestNotificationsAsync.success]: ({ state, action }) => {
    const { items } = action.payload;

    const stateNotificationType = Object.keys(state.components)?.[0];
    const newNotifications = keyBy(
      items,
      ({ notificationType: type, id }) =>
        type === TYPE.REPS_TO_APPROVE ? TYPE.REPS_TO_APPROVE : `item_${id}`,
    );

    state.components = stateNotificationType === TYPE.REPS_TO_APPROVE
      ? { ...state.components, ...newNotifications }
      : { ...newNotifications, ...state.components };
  },
  [setReviewDocumentAction]: ({ state, action }) => {
    state.sectionInView = action.payload ? action.payload.section : initialState.sectionInView;
    state.stepInView = action.payload ? action.payload.step : initialState.stepInView;
  },
  [markNotificationAsReadAsync.success]: ({ state, action }) => {
    const { id } = action.payload;

    const markedNotification = {
      [`item_${id}`]: {
        ...cloneDeep(state.components[`item_${id}`]),
        isRead: true,
      },
    };
    state.components = {
      ...state.components,
      ...markedNotification,
    };
  },
  [logoutAction]: ({ state }) => {
    state.components = {};
  },
});
