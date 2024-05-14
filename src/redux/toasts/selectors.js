import { createSelector } from 'reselect';

const toastsSlice = (state) => state.toasts;

export const toastsSelector = createSelector(
  toastsSlice,
  (state) => state,
);
