import { createSelector } from 'reselect';

const contractsSelector = (state) => state.contracts;

const contractsCountsSelector = createSelector(
  contractsSelector,
  state => state?.counts || {},
);

export const contractsRecruitsDataSelector = createSelector(
  contractsCountsSelector,
  state => state?.recruits || {}
);

export const contractsPendingAdminSelector = createSelector(
  contractsCountsSelector,
  state => state?.admin || 0
);

export const contractsPendingRegionalSelector = createSelector(
  contractsCountsSelector,
  state => state?.regional || 0
);

export const contractsSignedSelector = createSelector(
  contractsCountsSelector,
  state => state?.signed || 0
);

export const contractsSentSelector = createSelector(
  contractsCountsSelector,
  state => state?.sent || 0
);

export const repContractsSelector = createSelector(
  [
    contractsSelector,
    (state, id) => id,
    (state) => state.onboarding.selected?.userId,
  ],
  (state, id, onboardingId) => {
    const userId = id ?? onboardingId;

    return state?.[userId]?.contractsPerYears || {};
  },
);
