import { createSelector } from 'reselect';

export const selectRepsForApproval = (state) => state.approval.reps;

export const selectRepToApprove = (state) => state.approval.toApprove.rep;

export const selectDocumentsToApprove = (state) => state.approval.toApprove.documents;

export const selectIsApproved = (state) => state.approval.toApprove.isApproved;

export const selectTotalRepsCount = (state) => state.approval.total;

export const selectRegionals = (state) => state.approval.regionals;

export const selectLoadingState = (state) => state.loading.approval.isLoading;

export const selectRecruitersLoading = (state) => state.loading.recruiters.isLoading;

export const selectApprovalItemsLoading = (state) => state.loading.approvalItems.isLoading;

export const selectRegionalsLoading = (state) => state.loading.regionals.isLoading;

export const selectApprovalFiltersLoading = createSelector(
  [selectRecruitersLoading, selectRegionalsLoading],
  (isRecruitersLoading, isRegionalsLoading) => isRecruitersLoading || isRegionalsLoading,
);
