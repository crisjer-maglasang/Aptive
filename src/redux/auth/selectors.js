import { createSelector } from 'reselect';
import { dashboardConstants } from '@/lib/constants';

const authSelector = (state) => state.auth;

export const userSelector = createSelector(
  authSelector,
  (state) => state?.user,
);

export const userIdSelector = createSelector(
  userSelector,
  (user) => user?.user_id,
);

export const userRoleSelector = createSelector(
  userSelector,
  (user) => user?.role,
);

export const isAuthenticatedSelector = createSelector(
  userSelector,
  (user) => Boolean(user),
);

export const isRegionalSelector = createSelector(
  userSelector,
  (user) => user?.role === dashboardConstants.REGIONAL_MANAGER_ROLE,
);

export const isAdminSelector = createSelector(
  userSelector,
  (user) => [dashboardConstants.DEALER_ADMIN_GROUP, dashboardConstants.SUPER_ADMIN_GROUP].includes(user?.group_id),
);

export const isPartnerSelector = createSelector(
  userSelector,
  (user) => user?.role === dashboardConstants.PARTNERSHIP_ROLE,
);

export const isTeamLeaderSelector = createSelector(
  userSelector,
  (user) => [
    dashboardConstants.TEAM_LEADER_ROLE,
    dashboardConstants.SENIOR_TEAM_LEADER_ROLE,
    dashboardConstants.DIVISION_MANAGER_ROLE,
  ].includes(user?.role),
);

export const isBranchManagerSelector = createSelector(
  userSelector,
  (user) => [dashboardConstants.BRANCH_MANAGER_ROLE].includes(user?.role),
);

export const isRepRoleSelector = createSelector(
  userSelector,
  (user) => user?.role === dashboardConstants.REP_ROLE,
);

export const selectDefaultTeamId = (state) => state.auth.user?.defaultTeam;

export const isContractEditableSelector = createSelector(
  [isAdminSelector, isRegionalSelector, isPartnerSelector],
  (isAdmin, isRegional, isPartner) => isAdmin || isRegional || isPartner,
);
