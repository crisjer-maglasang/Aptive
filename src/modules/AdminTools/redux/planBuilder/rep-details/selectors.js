import { createSelector } from 'reselect';

export const NAME = 'repDetails';

export const planBuilderRepDetailsSelector = createSelector(
  (state) => state[NAME],
  (state) => state?.details
);

export const planBuilderRepPlansSelector = createSelector(
  (state) => state[NAME],
  (state) => state?.plans
);
