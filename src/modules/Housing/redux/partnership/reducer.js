import { createReducer } from '@/redux/root';
import { logoutAction } from '@/redux/auth';
import { partnershipNameSpace, requestDealersAsync, requestPartnershipsAsync } from './actions';

const initialState = {
  dealers: [],
  partnerships: [],
};

export const partnershipReducer = createReducer(partnershipNameSpace, initialState, {
  [requestDealersAsync.success]: ({ state, action }) => {
    state.dealers = action.payload;
  },

  [requestPartnershipsAsync.success]: ({ state, action }) => {
    state.partnerships = action.payload ?? [];
  },

  [logoutAction]: ({ state }) => {
    state.requestDealersAsync = initialState.dealers;
  },
});
