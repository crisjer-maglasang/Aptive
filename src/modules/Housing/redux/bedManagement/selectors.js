import { createSelector } from 'reselect';

const bedManagementObjectSelector = (state) => state.bedManagement;

export const unBeddedTotalSelector = createSelector(
  bedManagementObjectSelector,
  (state) => state?.unBeddedTotal
);

export const unBeddedSummariesSelector = createSelector(
  bedManagementObjectSelector,
  (state) => state?.unBeddedSummaries
);

export const bedManagementDataSelector = createSelector(
  bedManagementObjectSelector,
  (state) => state?.bedManagementData
);

export const bedManagementDataTotalSelector = createSelector(
  bedManagementObjectSelector,
  (state) => state?.bedManagementTotal
);
