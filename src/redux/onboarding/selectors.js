import { Collection, RepEditHistory } from '@/redux/models';
import { cloneDeep, isEqual } from 'lodash-es';
import { createSelector } from 'reselect';
import {
  validateHousingInfo,
  validateHrInfo,
  validateLicensingInfo,
  validatePersonalInfo,
  validateUniformInfo,
} from '@/lib/validations/submit';

import {
  onboardingConstants,
  onboardingSidebar,
  pathConstants,
} from '@/lib/constants';

const {
  PERSONAL_INFO_STEP_ID,
  HOUSING_VEHICLE_STEP_ID,
  UNIFORM_STEP_ID,
  LICENSING_STEP_ID,
  HR_STEP_ID,
  SUBMIT_PROFILE_STEP_ID,
  DOCUMENTS_STEP_ID,
  WORKDAY_TASK_STEP_ID,
  ATTACHMENTS_STEP_ID,
  ADMIN_VIEW_STEP_ID,
} = onboardingSidebar;

const {
  onboarding: {
    PERSONAL_INFO_PATH,
    HOUSING_VEHICLE_PATH,
    UNIFORM_SWAG_PATH,
    LICENSING_PATH,
    HR_PATH,
    SUBMIT_PROFILE_PATH,
    DOCUMENTS_PATH,
    WORKDAY_TASKS_PATH,
    ATTACHMENTS_PATH,
    ADMIN_VIEW_PATH,
  },
} = pathConstants;

const {
  PERSONAL_INFO_FORM_TITLE,
  HOUSING_AND_VEHICLES_FORM_TITLE,
  UNIFORM_AND_SWAG_FORM_TITLE,
  LICENSING_FORM_TITLE,
  HR_INFO_FORM_TITLE,
  SUBMIT_PROFILE_FORM_TITLE,
  CONTRACTS,
  MY_CONTRACTS,
  WORKDAY_TASKS,
  ATTACHMENTS,
  ADMIN_VIEW_TITLE,
  CUSTOMER_FACING_PHONE_NUMBER_NAME,

  PERSONAL_INFO_FORM_NAME,
  HOUSING_AND_VEHICLES_FORM_NAME,
  UNIFORM_AND_SWAG_FORM_NAME,
  LICENSING_FORM_NAME,
  HR_INFO_FORM_NAME,

  DIRECT_DEPOSIT_BANK_NAME,
  DIRECT_DEPOSIT_ACCOUNT_NAME,
  DIRECT_DEPOSIT_ACCOUNT_TYPE,
  DIRECT_DEPOSIT_ROUTING_NUMBER,
  DIRECT_DEPOSIT_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,

  CURRENT_SITUATION_NAME,
  SOURCE_OF_DISCOVERY_NAME,
  REP_EXPERIENCES_DATA_NAME,

  WORKDAY_ID,
} = onboardingConstants;

const onboardingSelector = (state) => state.onboarding;

export const selectUserIdSelected = (state) => state.onboarding.selected?.userId;

export const selectRecruitIdSelected = (state) => state.onboarding.selected?.recruitId;

export const selectIsOnboardingDataUpdated = (state) => state.onboarding.selected?.isUpdated;

export const selectedSelector = createSelector(
  onboardingSelector,
  (state) => state.selected,
);

export const profilePictureFileSelector = createSelector(
  selectedSelector,
  (state) => ({
    fileName: state?.profilePicture,
    file: state?.profilePictureLocalFile,
  }),
);

export const signatureFileSelector = createSelector(
  selectedSelector,
  (state) => ({
    fileName: state?.signature,
    file: state?.signatureLocalFile,
  }),
);

export const driverLicenseFileSelector = createSelector(
  selectedSelector,
  (state) => ({
    fileName: state?.driverLicense,
    file: state?.driverLicenseLocalFile,
  }),
);

export const passportFileSelector = createSelector(
  selectedSelector,
  (state) => ({
    fileName: state?.passportPicture,
    file: state?.passportPictureLocalFile,
  }),
);

export const socialSecurityFileSelector = createSelector(
  selectedSelector,
  (state) => ({
    fileName: state?.socialSecurityCard,
    file: state?.socialSecurityPictureLocalFile,
  }),
);

export const repOnboardedSelector = createSelector(
  selectedSelector,
  (state) => state?.onboarded,
);

export const repReadyToSubmitSelector = createSelector(
  selectedSelector,
  (state) => state?.isReadyToSubmit,
);

export const repSubmittedSelector = createSelector(
  selectedSelector,
  (state) => state?.submitted,
);

export const repEditableSelector = createSelector(
  selectedSelector,
  (state) => state?.isEditable,
);

export const repApprovedSelector = createSelector(
  selectedSelector,
  (state) => state?.approved,
);

export const workdayCompleteSelector = createSelector(
  selectedSelector,
  (state) => state?.workdayComplete,
);

export const personalDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    firstName: state.firstName ?? '',
    lastName: state.lastName ?? '',
    fullName: state.fullName ?? '',
    dob: state.dob ?? '',
    gender: state.gender ?? '',
    experience: state.experience ?? '',
    mobile: state.mobile ?? '',
    profilePicture: state.profilePicture ?? '',
    profilePictureLocalFile: state.profilePictureLocalFile ?? '',
    [CUSTOMER_FACING_PHONE_NUMBER_NAME]: state[CUSTOMER_FACING_PHONE_NUMBER_NAME] ?? '',
  }),
);

export const marriageDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    isMarried: state.isMarried ?? '',
    spouseFirstName: state.spouseFirstName ?? '',
    spouseLastName: state.spouseLastName ?? '',
  }),
);

export const payDetailsSelector = createSelector(
  selectedSelector,
  (state) => ({
    upfrontPay: state.upfrontPay ?? '0',
    rentDeduction: state.rentDeduction ?? '0.00',
    uniformDeduction: state.uniformDeduction ?? '0',
    rentNote: state.rentNote ?? '',
  }),
);

export const emergencyDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    emergencyContactName: state.emergencyContactName ?? '',
    emergencyContactPhoneNumber: state.emergencyContactPhoneNumber ?? '',
  }),
);

export const addressDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    isDifferentAddress: state.isDifferentAddress ?? '',
    addressOne: state.addressOne ?? '',
    addressCity: state.addressCity ?? '',
    addressState: state.addressState ?? '',
    addressZip: state.addressZip ?? '',
    addressCountry: state.addressCountry ?? '',
    currentAddressOne: state.currentAddressOne ?? '',
    currentAddressCity: state.currentAddressCity ?? '',
    currentAddressState: state.currentAddressState ?? '',
    currentAddressZip: state.currentAddressZip ?? '',
    currentAddressCountry: state.currentAddressCountry ?? '',
  }),
);

export const identificationDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    ssnNumber: state.ssnNumber ?? '',
    driverLicenseNumber: state.driverLicenseNumber ?? '',
    driverLicenseStateIssued: state.driverLicenseStateIssued ?? '',
    driverLicenseCountryIssued: state.driverLicenseCountryIssued ?? '',
    driverLicenseExpirationDate: state.driverLicenseExpirationDate ?? '',
  }),
);

export const socialMediaDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    facebookLink: state.facebookLink ?? '',
    linkedinLink: state.linkedinLink ?? '',
    twitterLink: state.twitterLink ?? '',
    instagramLink: state.instagramLink ?? '',
  }),
);

export const arrivalDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    expectedArrivalDate: state.expectedArrivalDate ?? '',
    tentativeKnockingStartDate: state.tentativeKnockingStartDate ?? '',
    tentativeKnockingEndDate: state.tentativeKnockingEndDate ?? '',
    actualStartDate: state.actualStartDate ?? '',
    actualEndDate: state.actualEndDate ?? '',
  }),
);

export const housingDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    needsHousing: state.needsHousing ?? '',
    housingType: state.housingType ?? '',
    numOfRooms: state.numOfRooms ?? 1,
    roommateRequest: state.roommateRequest ?? '',
    repAcknowledgment: state.repAcknowledgment ?? false,
  }),
);

export const residentialHistoryDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    addressHistoryName: state.addressHistoryName ?? '',
    addressHistoryStartDate: state.addressHistoryStartDate ?? '',
    addressHistoryEndDate: state.addressHistoryEndDate ?? '',
  }),
);

export const vehicleDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    hasVehicle: state.hasVehicle ?? '',
    vehicleModel: state.vehicleModel ?? '',
    vehicleColor: state.vehicleColor ?? '',
    vehicleYear: state.vehicleYear ?? '',
    vehiclePlateNumber: state.vehiclePlateNumber ?? '',
    vehicleRegistrationState: state.vehicleRegistrationState ?? '',
    vehicleRegistrationCountry: state.vehicleRegistrationCountry ?? 1,
    hasSegway: state.hasSegway ?? '',
  }),
);

export const uniformDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    shirtSize: state.shirtSize ?? '',
    jacketSize: state.jacketSize ?? '',
    waistSize: state.waistSize ?? '',
    hatSize: state.hatSize ?? '',
    shoeSize: state.shoeSize ?? '',
  }),
);

export const personalDetailDataSelector = createSelector(
  selectedSelector,
  (state) => ({
    race: state.race ?? '',
    feet: state.feet ?? '',
    inches: state.inches ?? '',
    weight: state.weight ?? '',
    hairColor: state.hairColor ?? '',
    eyeColor: state.eyeColor ?? '',
    cityOfBirth: state.cityOfBirth ?? '',
    stateOfBirth: state.stateOfBirth ?? '',
    countryOfBirth: state.countryOfBirth,
    stateOfBirthOther: state.stateOfBirthOther ?? '',
    isUsCitizen: state.isUsCitizen ?? '',
    hasVisibleMarkings: state.hasVisibleMarkings ?? '',
    markingsDescription: state.markingsDescription ?? '',
    isConvictedOfCrime: state.isConvictedOfCrime ?? '',
    crimeDescription: state.crimeDescription ?? '',
    hasRepExperience: state.hasRepExperience ?? '',
    driverLicenseLocalFile: state.driverLicenseLocalFile ?? '',
    driverLicense: state.driverLicense ?? '',
    signature: state.signature ?? '',
    signatureLocalFile: state.signatureLocalFile ?? '',
  }),
);

export const repExperienceDataSelector = createSelector(
  selectedSelector,
  (state) => {
    const repExperiences = cloneDeep(state[REP_EXPERIENCES_DATA_NAME]);

    return {
      [CURRENT_SITUATION_NAME]: state[CURRENT_SITUATION_NAME] ?? '',
      [SOURCE_OF_DISCOVERY_NAME]: state[SOURCE_OF_DISCOVERY_NAME] ?? '',
      [REP_EXPERIENCES_DATA_NAME]: repExperiences,
    };
  },
);

export const employmentHistorySelector = createSelector(
  selectedSelector,
  (state) => {
    const cloned = cloneDeep(state.employmentData);

    return {
      employmentData: cloned,
    };
  },
);

export const referencesHistorySelector = createSelector(
  selectedSelector,
  (state) => {
    const cloned = cloneDeep(state.referenceData);

    return {
      referenceData: cloned,
    };
  },
);

export const hrDataSelector = createSelector(selectedSelector, (state) => ({
  passportPicture: state.passportPicture ?? '',
  passportPictureLocalFile: state.passportPictureLocalFile ?? '',
  passportExpirationDate: state.passportExpirationDate ?? '',
  driverLicense: state.driverLicense ?? '',
  driverLicenseLocalFile: state.driverLicenseLocalFile ?? '',
  socialSecurityCard: state.socialSecurityCard ?? '',
  socialSecurityPictureLocalFile: state.socialSecurityPictureLocalFile ?? '',
  usesType: state.usesType ?? '',
  wotcSurveyCompleted: state.wotcSurveyCompleted ?? false,
  w9EnvelopeSent: state.w9EnvelopeSent ?? false,
  w9Clicked: state.w9Clicked ?? false,
  w9Submitted: state.w9Submitted ?? false,
  w9Completed: state.w9Completed ?? false,
  i9EnvelopeSent: state.i9EnvelopeSent ?? false,
  previousW9Exists: state.previousW9Exists ?? false,
  usePreviousW9: state.usePreviousW9 ?? false,
  i9Clicked: state.i9Clicked ?? false,
  i9Completed: state.i9Completed ?? false,
  i9Submitted: state.i9Submitted ?? false,
  [WORKDAY_ID]: state[WORKDAY_ID] ?? '',
  [DIRECT_DEPOSIT_BANK_NAME]: state[DIRECT_DEPOSIT_BANK_NAME] ?? '',
  [DIRECT_DEPOSIT_ACCOUNT_NAME]: state[DIRECT_DEPOSIT_ACCOUNT_NAME] ?? '',
  [DIRECT_DEPOSIT_ACCOUNT_TYPE]: state[DIRECT_DEPOSIT_ACCOUNT_TYPE] ?? '',
  [DIRECT_DEPOSIT_ROUTING_NUMBER]: state[DIRECT_DEPOSIT_ROUTING_NUMBER] ?? '',
  [DIRECT_DEPOSIT_ACCOUNT_NUMBER]: state[DIRECT_DEPOSIT_ACCOUNT_NUMBER] ?? '',
  [DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER]: state[DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER] ?? '',
}));

export const personalInfoCompletionSelector = createSelector(
  [
    personalDataSelector,
    marriageDataSelector,
    emergencyDataSelector,
    addressDataSelector,
    identificationDataSelector,
  ],
  (personalData, marriageData, emergencyData, address, idData) => {
    const combined = {
      ...personalData,
      ...marriageData,
      ...emergencyData,
      ...address,
      ...idData,
    };

    return validatePersonalInfo(combined).personalInfoIsValid;
  },
);

export const housingAndVehicleCompletionSelector = createSelector(
  [
    arrivalDataSelector,
    housingDataSelector,
    residentialHistoryDataSelector,
    vehicleDataSelector,
  ],
  (
    arrivalData,
    housingData,
    residentialData,
    vehicleData,
  ) => validateHousingInfo({
    ...arrivalData,
    ...housingData,
    ...residentialData,
    ...vehicleData,
  }).housingInfoIsValid,
);

export const uniformCompletionSelector = createSelector(
  [uniformDataSelector],
  (uniformData) => validateUniformInfo({ ...uniformData }).uniformInfoIsValid,
);

export const licensingCompletionSelector = createSelector(
  [
    personalDetailDataSelector,
    repExperienceDataSelector,
    employmentHistorySelector,
    referencesHistorySelector,
  ],
  (
    personal,
    experience,
    employment,
    references,
  ) => validateLicensingInfo({
    ...personal,
    ...experience,
    ...employment,
    ...references,
  }).licensingInfoIsValid,
);

export const featureFlagsSelector = createSelector(
  onboardingSelector,
  (state) => state?.featureFlags,
);

export const hrCompletionSelector = createSelector(
  [
    hrDataSelector,
    featureFlagsSelector,
  ],
  (hrData, featureFlags) => validateHrInfo(hrData, featureFlags).hrInfoIsValid,
);

export const adminViewSelector = createSelector(
  onboardingSelector,
  (state) => state?.adminView,
);

const selectPersonalInfoCompleted = (state) => state?.onboarding?.onboardingCompletion?.[PERSONAL_INFO_FORM_NAME] ?? false;

const selectHousingInfoCompleted = (state) => state?.onboarding?.onboardingCompletion?.[HOUSING_AND_VEHICLES_FORM_NAME] ?? false;

const selectUniformInfoCompleted = (state) => state?.onboarding?.onboardingCompletion?.[UNIFORM_AND_SWAG_FORM_NAME] ?? false;

const selectLicensingInfoCompleted = (state) => state?.onboarding?.onboardingCompletion?.[LICENSING_FORM_NAME] ?? false;

const selectHrInfoCompleted = (state) => state?.onboarding?.onboardingCompletion?.[HR_INFO_FORM_NAME] ?? false;

export const onboardingMenuItemsSelector = createSelector(
  [
    selectPersonalInfoCompleted,
    selectHousingInfoCompleted,
    selectUniformInfoCompleted,
    selectLicensingInfoCompleted,
    selectHrInfoCompleted,
    repSubmittedSelector,
  ],
  (
    isPersonalCompleted,
    isHousingCompleted,
    isUniformCompleted,
    isLicensingCompleted,
    isHrCompleted,
    isSubmitted,
  ) => {
    const wizard = [
      {
        id: PERSONAL_INFO_STEP_ID,
        path: PERSONAL_INFO_PATH,
        label: () => PERSONAL_INFO_FORM_TITLE,
        shouldDisplay: () => true,
        completed: isPersonalCompleted,
        countable: true,
      },
      {
        id: HOUSING_VEHICLE_STEP_ID,
        path: HOUSING_VEHICLE_PATH,
        label: () => HOUSING_AND_VEHICLES_FORM_TITLE,
        shouldDisplay: () => true,
        completed: isHousingCompleted,
        countable: true,
      },
      {
        id: UNIFORM_STEP_ID,
        path: UNIFORM_SWAG_PATH,
        label: () => UNIFORM_AND_SWAG_FORM_TITLE,
        shouldDisplay: () => true,
        completed: isUniformCompleted,
        countable: true,
      },
      {
        id: LICENSING_STEP_ID,
        path: LICENSING_PATH,
        label: () => LICENSING_FORM_TITLE,
        shouldDisplay: () => true,
        completed: isLicensingCompleted,
        countable: true,
      },
      {
        id: HR_STEP_ID,
        path: HR_PATH,
        label: () => HR_INFO_FORM_TITLE,
        shouldDisplay: () => true,
        completed: isHrCompleted,
        countable: true,
      },
      {
        id: SUBMIT_PROFILE_STEP_ID,
        path: SUBMIT_PROFILE_PATH,
        label: () => SUBMIT_PROFILE_FORM_TITLE,
        shouldDisplay: ({ isPersonalWizard }) => isPersonalWizard,
        completed: isSubmitted,
        countable: false,
      },
    ];

    const extra = [
      {
        id: DOCUMENTS_STEP_ID,
        path: DOCUMENTS_PATH,
        label: ({ isPersonalWizard }) => isPersonalWizard ? MY_CONTRACTS : CONTRACTS,
        shouldDisplay: () => true,
      },
      {
        id: WORKDAY_TASK_STEP_ID,
        path: WORKDAY_TASKS_PATH,
        label: () => WORKDAY_TASKS,
        shouldDisplay: ({ isPersonalWizard }) => (
          // 1. Somebody (Admin/RM/TL) who views someone's (Rep) profile.
          !isPersonalWizard
        ),
      },
      {
        id: ATTACHMENTS_STEP_ID,
        path: ATTACHMENTS_PATH,
        label: () => ATTACHMENTS,
        shouldDisplay: () => true,
      },
      {
        id: ADMIN_VIEW_STEP_ID,
        path: ADMIN_VIEW_PATH,
        label: () => ADMIN_VIEW_TITLE,
        shouldDisplay: ({ isPersonalWizard }) => (
          // 1. Somebody (Admin/RM/TL) who views someone's (Rep) profile.
          !isPersonalWizard
        ),
      },
    ];

    return {
      wizard,
      extra,
      isWizardItem: (id) => Boolean(wizard.find(({ id: itemId }) => itemId === id)),
      isWorkdayTasks: (id) => id === WORKDAY_TASK_STEP_ID,
      resolveItemByPath: (path) => [...wizard, ...extra].find(({ path: itemPath }) => itemPath === path) ?? {},
    };
  },
  {
    memoizeOptions: {
      equalityCheck: isEqual,
    },
  },
);

export const currentStepSelector = createSelector(
  onboardingSelector,
  (onboarding) => onboarding?.currentStep,
);

export const nextStepSelector = createSelector(
  onboardingSelector,
  (onboarding) => onboarding?.nextStep,
);

export const repEditHistorySelector = createSelector(
  onboardingSelector,
  (onboarding) => new Collection(
    onboarding.editHistory.items.map((item) => new RepEditHistory(item)),
    onboarding.editHistory.total,
  ),
);
