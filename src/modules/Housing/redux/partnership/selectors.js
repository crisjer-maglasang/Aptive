import { createSelector } from 'reselect';

const partnershipSelector = (state) => state.partnership;

export const dealersSelector = createSelector(
  partnershipSelector,
  (state) => state?.dealers || [],
);

export const partnershipsSelector = createSelector(
  partnershipSelector,
  (state) => state?.partnerships || [],
);
