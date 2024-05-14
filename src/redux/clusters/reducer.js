import { createReducer } from '@/redux/root';

import {
  nameSpace,
  requestClusterStatsAsync,  
} from './actions';

const initialState = {
  clusters: null,  
};

export const clusterStatsReducer = createReducer(nameSpace, initialState, {
  [requestClusterStatsAsync.success]: ({ state, action }) => {
    state.clusters = action.payload;
  },
});
