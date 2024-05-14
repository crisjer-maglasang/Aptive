import { onboardingSidebar, onboardingConstants } from '@/lib/constants';
import { createReducer } from '@/redux/root';

import { logoutAction } from '../auth';

import {
  nameSpace,
  setSelectedAction,
  setSelectedPropAction,
  arrayAddItemAction,
  arrayRemoveItemAction,
  arrayChangeFieldAction,
  setCurrentStepAction,
  setNextStepAction,
  resetSelectedAction,
  resetStepsAction,
  submitRepProfileAsync,
  requestRepEditHistoryAsync,
  setOnboardingDataUpdated,
  setOnboardingFormCompleted,
  resetProfileCompletion,
  setFeatureFlagAction,
  requestAdminViewAsync,
} from './actions';

const {
  DIRECT_DEPOSIT_BANK_NAME,
  DIRECT_DEPOSIT_ACCOUNT_NAME,
  DIRECT_DEPOSIT_ACCOUNT_TYPE,
  DIRECT_DEPOSIT_ROUTING_NUMBER,
  DIRECT_DEPOSIT_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,
  PAY_DETAILS_SECTION_FEATURE_FLAG_NAME,
  I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME,
  DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME,
} = onboardingConstants;

const initialState = {
  currentStep: onboardingSidebar.PERSONAL_INFO_STEP_ID,
  nextStep: null,
  onboardingCompletion : {},
  selected: {
    userId: null,
    onboarded: false,
    isReadyToSubmit: false,
    submitted: false,
    approved: false,
    signature: '',
    dob: '',
    repAcknowledgment: false,
    profilePictureLocalFile: '',
    passportPictureLocalFile: '',
    socialSecurityPictureLocalFile: '',
    driverLicenseLocalFile: '',
    signatureLocalFile: '',
    profilePicUrl: '',
    socialSecurityUrl: '',
    driverLicenseUrl: '',
    passportUrl: '',
    signatureUrl: '',
    usesType: '',
    wotcSurveyCompleted: false,
    w9Clicked: false,
    i9Clicked: false,
    workdayComplete: false,
    [DIRECT_DEPOSIT_BANK_NAME]: '',
    [DIRECT_DEPOSIT_ACCOUNT_NAME]: '',
    [DIRECT_DEPOSIT_ACCOUNT_TYPE]: '',
    [DIRECT_DEPOSIT_ROUTING_NUMBER]: '',
    [DIRECT_DEPOSIT_ACCOUNT_NUMBER]: '',
    [DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER]: '',
  },
  editHistory: {
    items: [],
    total: 0,
  },
  featureFlags: {
    [PAY_DETAILS_SECTION_FEATURE_FLAG_NAME]: false,
    [I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME]: false,
    [DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME]: false,
  },
};

export const onboardingReducer = createReducer(nameSpace, initialState, {
  [arrayAddItemAction]: ({ state, action }) => {
    const { parent, listItem } = action.payload;

    state.selected[parent] = [
      ...state.selected[parent],
      listItem,
    ];
  },

  [arrayChangeFieldAction]: ({ state, action }) => {
    const { parent, index, name, value } = action.payload;

    state.selected[parent][index] = {
      ...state.selected[parent][index],
      [name]: value,
    };
  },

  [arrayRemoveItemAction]: ({ state, action }) => {
    const { parent, id } = action.payload;

    state.selected[parent] = state.selected[parent].filter((el) => el.setId !== id);
  },

  [setSelectedAction]: ({ state, action }) => {
    state.selected = {
      ...state.selected,
      ...action.payload,
    };
  },

  [setOnboardingDataUpdated]: ({ state, action }) => {
    state.selected.isUpdated = action.payload;
  },

  [setSelectedPropAction]: ({ state, action }) => {
    const { name, value } = action.payload;

    state.selected[name] = value;
  },

  [resetSelectedAction]: ({ state }) => {
    state.selected = initialState.selected;
  },

  [setCurrentStepAction]: ({ state, action }) => {
    state.currentStep = action.payload;
  },

  [setNextStepAction]: ({ state, action }) => {
    state.nextStep = action.payload;
  },

  [resetStepsAction]: ({ state }) => {
    state.currentStep = initialState.currentStep;
    state.nextStep = initialState.nextStep;
  },

  [logoutAction]: ({ state }) => {
    state.selected = initialState.selected;
    state.currentStep = initialState.currentStep;
    state.nextStep = initialState.nextStep;
  },

  [submitRepProfileAsync.success]: ({ state }) => {
    state.selected.submitted = true;
  },

  [requestRepEditHistoryAsync.success]: ({ state, action }) => {
    state.editHistory = action.payload.toPlainObject();
  },

  [requestRepEditHistoryAsync.failure]: ({ state, action }) => {
    state.editHistory = action.payload.toPlainObject();
  },

  [setOnboardingFormCompleted]: ({ state, action }) => {
    const { formId, isCompleted } = action.payload;

    state.onboardingCompletion[formId] = isCompleted;
  },

  [resetProfileCompletion]: ({ state }) => {
    state.onboardingCompletion = {};
  },

  [setFeatureFlagAction]: ({ state, action }) => {
    state.featureFlags = {
      ...state.featureFlags,
      [action.payload.name]: action.payload.value,
    };
  },

  [requestAdminViewAsync.success]: ({ state, action: { payload } }) => {
    const { data } = payload;

    state.adminView = data?.attributes;
  },
});
