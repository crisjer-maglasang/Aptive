import { createSelector } from 'reselect';

const loadingSelector = (state) => state.loading;

export const selectLoginLoading = (state) => state.loading.login.isLoading;

export const selectAuthUserLoading = (state) => state.loading.authUser.isLoading;

export const adminViewLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.adminView?.isLoading || state.reps?.isLoading,
);

export const repsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.reps?.isLoading,
);

export const myTreeContactLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.myTreeContact?.isLoading,
);

export const userContactLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.userContact?.isLoading,
);

export const repsWorkdayTasksLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.repsWorkdayTasks?.isLoading,
);

export const attachmentsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.attachments?.isLoading,
);

export const addressesLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.addresses?.isLoading,
);

export const usersLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.users?.isLoading,
);

export const restoreUserLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.restoreUser?.isLoading,
);

export const deleteUserLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.deleteUser?.isLoading,
);

export const submitRepProfileLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.submitRepProfile?.isLoading,
);

export const formLoadingSelector = createSelector(
  [
    repsLoadingSelector,
    addressesLoadingSelector,
    userContactLoadingSelector,
    submitRepProfileLoadingSelector,
    deleteUserLoadingSelector,
  ],
  (
    repsLoading,
    addressesLoading,
    userContactLoading,
    submitRepProfileLoading,
    deleteUser,
  ) => (
    repsLoading || addressesLoading || userContactLoading || submitRepProfileLoading || deleteUser
  ),
);

export const loginLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.auth?.isLoading,
);

export const profilePicLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.profilePic?.isLoading,
);

export const passportLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.passportPic?.isLoading,
);

export const driverLicenseLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.driverLicensePic?.isLoading,
);

export const socialCardLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.ssCardPic?.isLoading,
);

export const signatureLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.signaturePic?.isLoading,
);

export const loadingRecruitProgressSelector = createSelector(
  loadingSelector,
  (state) => state.recruitProgress?.isLoading,
);

export const downlineLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.downline?.isLoading,
);

export const recruiterManagersLoadingSelector = createSelector(
  loadingSelector,
  (state) => state.recruiterManagers?.isLoading,
);

export const contractLinkLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.contractsLink?.isLoading,
);

export const forgotPasswordLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.forgotPassword?.isLoading,
);

export const resetPasswordLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.resetPassword?.isLoading,
);

export const recruitsProgressStatsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.recruitProgressStats?.isLoading,
);

export const progressPageIsLoadingSelector = createSelector(
  [
    loadingRecruitProgressSelector,
    recruitsProgressStatsLoadingSelector,
  ],
  (recProgressLoading, recruitsStatsLoading) => recProgressLoading || recruitsStatsLoading,
);

export const repsContractsIsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.repsContracts?.isLoading,
);

export const userContractsIsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.userContracts?.isLoading,
);

export const recruitingSeasonIsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.recruitingSeason?.isLoading,
);

export const agreementsDrawerIsLoadingSelector = createSelector(
  [repsLoadingSelector, repsContractsIsLoadingSelector],
  (repsLoading, repsContractsLoading) => repsLoading || repsContractsLoading,
);

export const agreementsUserIsLoadingSelector = createSelector(
  [userContactLoadingSelector, userContractsIsLoadingSelector, repsContractsIsLoadingSelector, repsLoadingSelector],
  (userContactLoading, userContractsLoading, repsContractsLoading, repsLoading) =>
    userContactLoading || userContractsLoading || repsContractsLoading || repsLoading,
);

export const workdayTasksIsLoadingSelector = createSelector(
  [userContactLoadingSelector, repsWorkdayTasksLoadingSelector, repsLoadingSelector],
  (userContactLoading, repsWorkdayTasksLoading, repsLoading) =>
    userContactLoading || repsWorkdayTasksLoading || repsLoading,
);

export const attachmentsIsLoadingSelector = createSelector(
  [userContactLoadingSelector, attachmentsLoadingSelector, repsLoadingSelector],
  (userContactLoading, attachmentsLoadingSelector, repsLoading) =>
    userContactLoading || attachmentsLoadingSelector || repsLoading,
);

export const availableContractsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.availableContracts?.isLoading,
);

export const contractsStatsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.contractStats?.isLoading,
);

export const allLeadsStatsLoadingSelector = createSelector(
  [downlineLoadingSelector, contractsStatsLoadingSelector],
  (downlineLoading, contractsStatsLoading) => downlineLoading || contractsStatsLoading,
);

export const soRepsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.soReps?.isLoading,
);

export const soStatsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.soStats?.isLoading,
);

export const soTeamsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.soTeams?.isLoading,
);

export const soExportLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.soExport?.isLoading,
);

export const soSeasonsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.soSeasons?.isLoading,
);

export const deleteContractLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.deleteContract?.isLoading,
);

export const contractActionLoadingSelector = createSelector(
  [contractLinkLoadingSelector, deleteContractLoadingSelector],
  (linkLoading, deleteContractLoading) => linkLoading || deleteContractLoading,
);

export const documentSignLinkLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.documentSignLink?.isLoading,
);

export const documentViewLinkLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.documentViewLink?.isLoading,
);

export const userLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.user?.isLoading,
);

export const oneTimeTokenLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.oneTimeToken?.isLoading,
);

export const repEditHistoryLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.repEditHistory?.isLoading,
);

export const selectIsUpdateStatusLoading = createSelector(
  loadingSelector,
  (state) => state?.updateStatus?.isLoading,
);

export const updatingProductsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.productsUpdate?.isLoading,
);

export const updatingProductCategoryLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.updateProductCategory?.isLoading,
);

export const updatingPlanAPIClientLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.updateApiClient?.isLoading,
);

export const updatingPlanLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.updatePlan?.isLoading,
);

export const repsWorkdayIdLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.workdayId?.isLoading,
);

export const workdayIdIsLoadingSelector = createSelector(
  [userContactLoadingSelector, repsWorkdayIdLoadingSelector, repsLoadingSelector],
  (userContactLoading, repsWorkdayTasksLoading, repsLoading) =>
    userContactLoading || repsWorkdayTasksLoading || repsLoading,
);

const selectHideContractLoading = (state) => state.loading?.hideContract?.isLoading;

const selectRevealContractLoading = (state) => state.loading?.revealContract?.isLoading;

export const updateContractLoadingSelector = createSelector(
  [selectHideContractLoading, selectRevealContractLoading],
  (isHideContractLoading, isRevealContractLoading) =>
    Boolean(isHideContractLoading) || Boolean(isRevealContractLoading),
);

const selectLoadingPolygonStatistics = (state) => state.loading.polygonStatistics?.isLoading;

export const selectLoadingPolygonPreview = (state) => state.loading.polygonPreview?.isLoading;

const selectLoadingCreatePolygon = (state) => state.loading.createPolygon?.isLoading;

const selectLoadingUpdateBoundary = (state) => state.loading.updateBoundary?.isLoading;

const selectLoadingUpdatePolygonReps = (state) => state.loading.updatePolygonReps?.isLoading;

const selectLoadingRemovePolygonReps = (state) => state.loading.removePolygonReps?.isLoading;

const selectLoadingActivate = (state) => state.loading.activate?.isLoading;

const selectLoadingDeactivate = (state) => state.loading.deactivate?.isLoading;

const selectLoadingClearOutcomes = (state) => state.loading.clearOutcomes?.isLoading;

const selectLoadingDeletePolygon = (state) => state.loading.deletePolygon?.isLoading;

export const polygonLoadingSelector = createSelector(
  [
    selectLoadingPolygonStatistics,
    selectLoadingPolygonPreview,
    selectLoadingCreatePolygon,
    selectLoadingUpdateBoundary,
    selectLoadingUpdatePolygonReps,
    selectLoadingRemovePolygonReps,
    selectLoadingActivate,
    selectLoadingDeactivate,
    selectLoadingClearOutcomes,
    selectLoadingDeletePolygon,
  ],
  (
    statistics,
    preview,
    create,
    update,
    assign,
    unassign,
    activate,
    deactivate,
    clear,
    remove,
  ) => [statistics, preview, create, update, assign, unassign, activate, deactivate, clear, remove]
    .some((loading) => Boolean(loading)),
);

const selectLoadingTeamCells = (state) => state.loading.teamCells?.isLoading;

const selectLoadingTeamPins = (state) => state.loading.teamPins?.isLoading;

export const teamMapLayersLoadingSelector = createSelector(
  [selectLoadingTeamCells, selectLoadingTeamPins],
  (teamCells, teamPins) => Boolean(teamCells) || Boolean(teamPins),
);

export const selectLoadingPolygonDispositions = (state) => Boolean(state.loading?.polygonDispositions?.isLoading);

export const selectLoadingTeamsList = (state) => Boolean(state.loading?.teams?.isLoading);
