import { createSelector } from 'reselect';

const errorsStateSelector = (state) => state.errors.errors;

export const loginErrorsSelector = createSelector(
  errorsStateSelector,
  (state) => {
    return state.login?.map((error) => error.message);
  },
);

export const contractsLinkErrorSelector = createSelector(
  errorsStateSelector,
  state => state?.contractsLink,
);

export const addRepErrorsSelector = createSelector(
  errorsStateSelector,
  state => state?.reps
);

export const updateRepErrorsSelector = createSelector(
  errorsStateSelector,
  state => state?.updateRep
);

export const forgotPasswordErrorsSelector = createSelector(
  errorsStateSelector,
  state => state?.forgotPassword
);

export const deleteContractErrorsSelector = createSelector(
  errorsStateSelector,
  state => state?.deleteContract
);

export const deleteUserErrorsSelector = createSelector(
  errorsStateSelector,
  state => state?.deleteUser
);

export const restoreUserErrorsSelector = createSelector(
  errorsStateSelector,
  state => state?.restoreUser
);

export const resetPasswordErrorsSelector = createSelector(
  errorsStateSelector,
  state => state?.resetPassword
);

export const selectPolygonPreviewError = (state) => state.errors.errors?.polygonPreview;

const selectCreatePolygonError = (state) => state.errors.errors?.createPolygon;

const selectUpdatePolygonBoundaryError = (state) => state.errors.errors?.updateBoundary;

const selectActivatePolygonError = (state) => state.errors.errors?.activatePolygon;

const selectUpdateRepsError = (state) => state.errors.errors?.updateReps;

const selectClearOutcomesError = (state) => state.errors.errors?.clearOutcomes;

export const selectPolygonError = createSelector(
  [
    selectPolygonPreviewError,
    selectCreatePolygonError,
    selectUpdatePolygonBoundaryError,
    selectActivatePolygonError,
    selectUpdateRepsError,
    selectClearOutcomesError,
  ],
  (
    preview,
    create,
    update,
    activate,
    assign,
    clearOutcomes,
  ) => [preview, create, update, activate, assign, clearOutcomes]
    .find((error) => Boolean(error))?.[0] ?? null,
);
