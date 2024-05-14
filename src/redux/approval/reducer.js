import { createReducer } from '@/redux/root';
import {
  nameSpace,
  getRepToApprove,
  requestRegionalsAsync,
  requestRepsForApprovalAsync,
  requestApprovalDocumentsAsync,
  setIsApproved,
} from './actions';

const initialState = {
  reps: [],
  total: 0,
  regionals: [],
  toApprove: {
    rep: null,
    documents: [],
    isApproved: false,
  },
};

export const approvalReducer = createReducer(nameSpace, initialState, {
  [requestRepsForApprovalAsync.success]: ({ state, action }) => {
    const { items, total } = action.payload;

    state.reps = items;
    state.total = total;
  },
  [requestRegionalsAsync.success]: ({ state, action }) => {
    const { items } = action.payload;
    state.regionals = items;
  },
  [requestApprovalDocumentsAsync.success]: ({ state, action }) => {
    const { items } = action.payload;
    state.toApprove.documents = items;
  },
  [getRepToApprove]: ({ state, action }) => {
    const userId = action.payload;

    if (userId) {
      state.toApprove.rep = state.reps.find((rep) => rep.userId === userId);
    } else {
      state.toApprove.rep = null;
    }
  },
  [setIsApproved]: ({ state, action }) => {
    state.toApprove.isApproved = action.payload;
  },
});
