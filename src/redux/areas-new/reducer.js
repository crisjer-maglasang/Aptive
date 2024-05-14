import { createReducer } from '@/redux/root';

import {
  nameSpace,
  requestAreaAsync,
  requestAreasAsync,
  requestAreaMapAsync, requestAreasListAsync,
} from './actions';
import { logoutAction } from '@/redux/auth';

const initialState = {
  areas: null,
  areaMap: null,
  areasList: [],
};

export const areasReducer = createReducer(nameSpace, initialState, {
  [requestAreaAsync.success]: ({ state, action }) => {
    state.area = action.payload;
  },
  [requestAreasAsync.success]: ({ state, action }) => {
    state.areas = action.payload;
  },
  [requestAreaMapAsync.success]: ({ state, action }) => {
    state.areaMap = action.payload;
  },
  [requestAreasListAsync.success]: ({ state, action }) => {
    const { areas } = action.payload;

    state.areasList = areas;
  },
  [logoutAction]: ({ state }) => {
    state.areasList = [];
  },
});
