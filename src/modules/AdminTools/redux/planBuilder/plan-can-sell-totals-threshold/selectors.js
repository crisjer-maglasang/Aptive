import { createSelector } from 'reselect';

export const NAME = 'planCanSellTotalsThreshold';

export const planCanSellTotalsThresholdSelector = createSelector(
  (state) => state[NAME],
  (state) => state?.[NAME] || null,
);
