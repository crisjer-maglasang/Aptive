import { createReducer } from '@/redux/root';
import {
  bedManagementNameSpace,
  requestUnBeddedSummariesAsync,
  requestBedManagementAsync,
} from './actions';

const initialState = {
  unBeddedSummaries: [],
  unBeddedTotal: 0,
  bedManagementData: [],
  bedManagementTotal: 0,
};

export const bedManagementReducer = createReducer(
  bedManagementNameSpace,
  initialState,
  {
    [requestUnBeddedSummariesAsync.success]: ({ state, action }) => {
      const { items, total } = action.payload;
      state.unBeddedSummaries = items;
      state.unBeddedTotal = total;
    },
    [requestBedManagementAsync.success]: ({ state, action }) => {
      const { items, total } = action.payload;
      state.bedManagementData = items;
      state.bedManagementTotal = total;
    },
  }
);
