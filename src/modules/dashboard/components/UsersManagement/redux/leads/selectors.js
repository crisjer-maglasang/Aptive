import { createSelector } from 'reselect';

const archivedSelector = (state) => state.usersManagement;

export const archivedLeadsSelector = createSelector(
  archivedSelector,
  (state) => state?.archivedLeads,
);

export const archivedLeadsTotalSelector = createSelector(
  archivedSelector,
  (state) => state?.archivedLeadsTotal,
);
