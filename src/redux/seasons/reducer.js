import { createReducer } from '@/redux/root';
import { logoutAction } from '../auth';
import { nameSpace, requestSalesSeasonAsync } from './actions';

const initialState = {
  sales: null,
};

export const seasonsReducer = createReducer(nameSpace, initialState, {
  [requestSalesSeasonAsync.success]: ({ state, action }) => {
    const { season } = action.payload;
    state.sales = season;
  },

  [logoutAction]: ({ state }) => {
    state.seasons = initialState.seasons;
  },
});
