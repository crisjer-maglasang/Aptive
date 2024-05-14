import { createSelector } from 'reselect';

const loadingSelector = (state) => state.loading;

export const isTeamsSummariesLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.teamsSummaries?.isLoading
);

export const isComplexLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.createComplex?.isLoading || state?.getComplex?.isLoading || state?.updateComplex?.isLoading,
);

export const isComplexHistoryLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.getComplexHistory?.isLoading,
);

export const isDealersLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.dealers?.isLoading
);

export const isComplexesLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.complexes?.isLoading
);

export const isComplexesWithAddressLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.complexesWithAddress?.isLoading
);

export const isArchiveComplexLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.archiveComplex?.isLoading
);

export const isApartmentLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.apartment?.isLoading
);

export const isLedgerListLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.archiveLedger?.isLoading || state?.ledgerList?.isLoading
);

export const isImportLedgersLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.importLedgers?.isLoading
);

export const isExportLedgersLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.exportLedgers?.isLoading
);

export const isImportLedgersTemplateLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.importLedgersTemplate?.isLoading
);

export const isLedgerFormLoadingSelector = createSelector(
  loadingSelector,
  (state) =>
    state?.teamsSummaries?.isLoading ||
    state?.partnerships?.isLoading ||
    state?.dealers?.isLoading ||
    state?.apartmentSummaries?.isLoading ||
    state?.branchesSummaries?.isLoading ||
    state?.createLedger?.isLoading ||
    state?.createNote?.isLoading
);

export const apartmentFormLoadingSelector = createSelector(
  [
    isDealersLoadingSelector,
    isComplexesLoadingSelector,
    isApartmentLoadingSelector,
  ],
  (isDealersLoading, isComplexesLoading, isApartmentLoading) =>
    isDealersLoading || isComplexesLoading || isApartmentLoading
);

export const isApartmentsWithBedsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.apartmentsWithBeds?.isLoading
);

export const isArchiveApartmentLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.archiveApartment?.isLoading
);

export const isLedgerHistoryLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.ledgerHistory?.isLoading
);

export const isApartmentViewLoadingSelector = createSelector(
  loadingSelector,
  (state) =>
    state?.teamsStatistics?.isLoading || state?.complexesStatistics?.isLoading
);

export const isBedManagementSidebarLoadingSelector = createSelector(
  loadingSelector,
  (state) =>
    state?.unBeddedSummaries?.isLoading ||
    state?.complexes?.isLoading ||
    state?.teams?.isLoading
);

export const isBedsHistoryLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.bedsHistoryList?.isLoading
);

export const isBedsHistoryExportLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.exportBedsHistories?.isLoading
);

export const isBedManagementTableLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.bedManagementData?.isLoading
);

export const isSeasonSummariesLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.seasonSummaries?.isLoading,
);

export const isApartmentHistoryLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.apartmentHistory?.isLoading,
);
