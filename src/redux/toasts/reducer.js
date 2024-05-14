import { createReducer } from '@/redux/root';
import {
  nameSpace,
  addToastsAction,
  flushToastsAction,
} from '@/redux/toasts';

const initialState = [];

export const toastsReducer = createReducer(nameSpace, initialState, {
  [addToastsAction]: ({ state, action: { payload } }) => {
    state.push(...payload);
  },

  [flushToastsAction]: () => initialState,
});
