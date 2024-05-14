import { createSelector } from 'reselect';

export const NAME = 'referralUsages';

export const filterReferralUsagesSelector = createSelector(
  (state) => state[NAME],
  (referralUsages) => referralUsages.referralUsages,
);
