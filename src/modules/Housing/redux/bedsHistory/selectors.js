import { createSelector } from 'reselect';

const bedsHistoryObjectSelector = (state) => state.bedsHistory;

export const bedsHistoryListSelector = createSelector(
  bedsHistoryObjectSelector,
  (state) => state?.bedsHistoryList,
);

export const bedsHistoryTotalSelector = createSelector(
  bedsHistoryObjectSelector,
  (state) => state?.bedsHistoryTotal,
);
