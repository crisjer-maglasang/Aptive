import { createSelector } from 'reselect';

export const NAME = 'planBuilderAreaPlans';

export const areaPlansSelector = createSelector(
  (state) => state[NAME],
  (state) => state?.areaPlans
);

export const areaPlansArraySelector = createSelector(
  (state) => state[NAME],
  (state) => state?.areaPlansArray
);

export const billingFrequenciesSelector = createSelector(
  (state) => state[NAME],
  (state) => state?.billingFrequencies
);
