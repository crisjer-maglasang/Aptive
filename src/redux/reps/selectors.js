import { createSelector } from 'reselect';
import { isAdminSelector } from '@/redux/auth';
import {
  contractsPendingAdminSelector,
  contractsSentSelector,
  contractsSignedSelector,
  contractsPendingRegionalSelector,
} from '@/redux/contracts';

export const repsSlice = (state) => state?.reps;

export const myTreeSelector = createSelector(
  repsSlice,
  (state) => state?.myTree || [],
);

export const recruitersSelector = createSelector(
  repsSlice,
  (state) => state?.recruiters || [],
);

export const downlineSelector = createSelector(
  repsSlice,
  (state) => state?.downline || [],
);

export const filteredCountSelector = createSelector(
  repsSlice,
  (state) => state?.filteredCount,
);

export const downlineCountSelector = createSelector(
  repsSlice,
  (state) => state?.count,
);

export const repsWorkdayTasksSelector = createSelector(
  [
    repsSlice,
    (state, userId) => userId,
  ],
  (state, userId) => state?.[`user_id_${userId}`]?.workdayTasks || [],
);

export const myTreePaginationFilteredCountSelector = createSelector(
  recruitersSelector,
  (state) => state?.total || 0,
);

export const recruitersDataSelector = createSelector(
  recruitersSelector,
  (state) => state?.data || [],
);

export const allLeadsFilteredCountSelector = createSelector(
  filteredCountSelector,
  (filteredCount) => filteredCount,
);

export const pendingSignatureSelector = createSelector(
  [isAdminSelector, contractsPendingAdminSelector, contractsPendingRegionalSelector],
  (isAdmin, pendingAdmin, pendingRegional) => {
    return isAdmin ? pendingAdmin : pendingRegional;
  },
);

export const repSelector = createSelector(
  [
    repsSlice,
    (state, repId) => repId,
  ],
  (state, repId) => state[repId] || {},
);

export const attachmentsSelector = createSelector(
  [
    repsSlice,
    (state, userId) => userId,
  ],
  (state, userId) => state?.[userId ? `user_id_${userId}` : 'self_user']?.attachments,
);

export const allLeadsStatsHeaderDataSelector = createSelector(
  [
    downlineCountSelector,
    pendingSignatureSelector,
    contractsSentSelector,
    contractsSignedSelector,
    repsWorkdayTasksSelector,
  ],
  (downline, pendingSignature, agreementsSent, agreementsSigned) => {
    return {
      downlineCount: downline,
      pendingSignature,
      agreementsSent,
      agreementsSigned,
    };
  },
);

export const recruitingSeasonSelector = createSelector(
  repsSlice,
  (state) => state?.recruitingSeason || null,
);

export const experienceOptionsSelector = createSelector(
  repsSlice,
  (state) => state?.experienceOptions || [],
);

export const experienceOptionSelector = createSelector(
  experienceOptionsSelector,
  (state, id) => id,
  (state, id) => state.find((experience) => experience.id === id),
);

export const apartmentStatusesSelector = createSelector(
  repsSlice,
  (state) => state?.apartmentStatuses || [],
);

export const repsWorkdayTasksUpdateErrorSelector = createSelector(
  [
    repsSlice,
    (state, userId) => userId,
  ],
  (state, userId) => state?.[`user_id_${userId}`]?.workdayTasksErrors,
);

export const attachmentsErrorSelector = createSelector(
  [
    repsSlice,
    (state, userId) => userId,
  ],
  (state, userId) => state?.[userId ? `user_id_${userId}` : 'self_user']?.attachmentsErrors,
);

export const repStatusesSelector = createSelector(
  repsSlice,
  (state) => state?.repStatuses || [],
);

export const selectSalesPrograms = createSelector(
  repsSlice,
  (state) => state?.salesPrograms || [],
);
