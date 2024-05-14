import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/onboarding';

export const updateRepAsync = createAsyncAction(`${nameSpace}/UPDATE_REP`);

export const submitRepProfileAsync = createAsyncAction(`${nameSpace}/SUBMIT_REP_PROFILE`);

export const requestRepEditHistoryAsync = createAsyncAction(`${nameSpace}/REQUEST_EDIT_HISTORY`);

export const requestAdminViewAsync = createAsyncAction(`${nameSpace}/REQUEST_ADMIN_VIEW`);

export const setSelectedAction = createAction(`${nameSpace}/SET_SELECTED`);

export const setSelectedPropAction = createAction(`${nameSpace}/SET_SELECTED_PROP`);

export const arrayAddItemAction = createAction(`${nameSpace}/ARRAY_ADD_ITEM`);

export const arrayChangeFieldAction = createAction(`${nameSpace}/ARRAY_CHANGE_FIELD`);

export const arrayRemoveItemAction = createAction(`${nameSpace}/ARRAY_REMOVE_ITEM`);

export const setCurrentStepAction = createAction(`${nameSpace}/SET_CURRENT_STEP`);

export const setNextStepAction = createAction(`${nameSpace}/SET_NEXT_STEP`);

export const resetSelectedAction = createAction(`${nameSpace}/RESET_SELECTED`);

export const resetStepsAction = createAction(`${nameSpace}/RESET_STEPS`);

export const setOnboardingDataUpdated = createAction(`${nameSpace}/SET_ONBOARDING_DATA_UPDATED`);

export const validateOnboardingFormsCompletion = createAction(`${nameSpace}/VALIDATE_ONBOARDING_FORMS_COMPLETION`);

export const setOnboardingFormCompleted = createAction(`${nameSpace}/SET_ONBOARDING_FORM_COMPLETED`);

export const resetProfileCompletion = createAction(`${nameSpace}/RESET_PROFILE_COMPLETION`);

export const setFeatureFlagAction = createAction(`${nameSpace}/SET_FEATURE_FLAG`);
