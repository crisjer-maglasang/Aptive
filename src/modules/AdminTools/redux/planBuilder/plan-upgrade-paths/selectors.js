import { createSelector } from 'reselect';

export const NAME = 'planUpgradePaths';

export const planUpgradePathsSelector = createSelector(
  (state) => state[NAME],
  (planUpgradePaths) => planUpgradePaths?.[NAME]
);
