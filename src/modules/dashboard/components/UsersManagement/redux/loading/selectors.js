import { createSelector } from 'reselect';

const loadingSelector = (state) => state.loading;

export const isArchivedLeadsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.archivedLeads?.isLoading || state?.restoreLead?.isLoading,
);

export const restoreLeadLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.restoreLead?.isLoading,
);
