import { onboardingConstants } from '@/lib/constants';

const {
  PERSONAL_INFO_FORM_NAME,
  HOUSING_AND_VEHICLES_FORM_NAME,
  UNIFORM_AND_SWAG_FORM_NAME,
  LICENSING_FORM_NAME,
  HR_INFO_FORM_NAME,
  WORKDAY_TASKS_FORM_NAME,
} = onboardingConstants;

const {
  BASIC_INFO_SECTION_NAME,
  BASIC_INFO_SECTION_TITLE,
  MARRIAGE_INFO_SECTION_NAME,
  MARRIAGE_INFO_SECTION_TITLE,
  PAY_DETAILS_SECTION_NAME,
  PAY_DETAILS_SECTION_TITLE,
  PAY_DETAILS_SECTION_FEATURE_FLAG_NAME,
  EMERGENCY_INFO_SECTION_NAME,
  EMERGENCY_INFO_SECTION_TITLE,
  ADDRESS_SECTION_NAME,
  ADDRESS_SECTION_TITLE,
  GOVERNMENT_ID_SECTION_NAME,
  GOVERNMENT_ID_SECTION_TITLE,
  HOUSING_SECTION_NAME,
  HOUSING_SECTION_TITLE,
  RESIDENTIAL_HISTORY_SECTION_NAME,
  RESIDENTIAL_HISTORY_SECTION_TITLE,
  VEHICLES_SECTION_NAME,
  VEHICLES_SECTION_TITLE,
  UNIFORM_SECTION_NAME,
  UNIFORM_SECTION_TITLE,
  LICENSING_PERSONAL_DETAILS_SECTION_NAME,
  LICENSING_PERSONAL_DETAILS_SECTION_TITLE,
  EMPLOYMENT_HISTORY_SECTION_NAME,
  EMPLOYMENT_HISTORY_SECTION_TITLE,
  REFERENCES_SECTION_NAME,
  REFERENCES_SECTION_TITLE,
  WOTC_TAX_SURVEY_SECTION_NAME,
  WOTC_TAX_SURVEY_SECTION_TITLE,
  DIRECT_DEPOSIT_SECTION_NAME,
  DIRECT_DEPOSIT_SECTION_TITLE,
  DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME,
  WORKDAY_SECTION_NAME,
  WORKDAY_SECTION_TITLE,
  ID_COPY_UPLOAD_SECTION_NAME,
  ID_COPY_UPLOAD_SECTION_TITLE,
  REP_EXPERIENCE_SECTION_NAME,
  REP_EXPERIENCE_SECTION_TITLE,
} = onboardingConstants;

const getSectionConfig = (section, featureFlags) => {
  const {
    [PAY_DETAILS_SECTION_FEATURE_FLAG_NAME]: isPayDetailsSectionEnabled,
    [DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME]: isDirectDepositSectionEnabled,
  } = featureFlags;

  const title2label = (title) => `${title.replace(/\s+history$/i, '')} History`;

  const options = {
    [PERSONAL_INFO_FORM_NAME]: [
      { value: BASIC_INFO_SECTION_NAME, label: BASIC_INFO_SECTION_TITLE },
      { value: MARRIAGE_INFO_SECTION_NAME, label: MARRIAGE_INFO_SECTION_TITLE },
      ...(isPayDetailsSectionEnabled
        ? [{ value: PAY_DETAILS_SECTION_NAME, label: PAY_DETAILS_SECTION_TITLE }]
        : []),
      { value: EMERGENCY_INFO_SECTION_NAME, label: EMERGENCY_INFO_SECTION_TITLE },
      { value: ADDRESS_SECTION_NAME, label: ADDRESS_SECTION_TITLE },
      { value: GOVERNMENT_ID_SECTION_NAME, label: GOVERNMENT_ID_SECTION_TITLE },
    ],

    [HOUSING_AND_VEHICLES_FORM_NAME]: [
      { value: HOUSING_SECTION_NAME, label: HOUSING_SECTION_TITLE },
      { value: RESIDENTIAL_HISTORY_SECTION_NAME, label: RESIDENTIAL_HISTORY_SECTION_TITLE },
      { value: VEHICLES_SECTION_NAME, label: VEHICLES_SECTION_TITLE },
    ],

    [UNIFORM_AND_SWAG_FORM_NAME]: [
      { value: UNIFORM_SECTION_NAME, label: UNIFORM_SECTION_TITLE },
    ],

    [LICENSING_FORM_NAME]: [
      { value: LICENSING_PERSONAL_DETAILS_SECTION_NAME, label: LICENSING_PERSONAL_DETAILS_SECTION_TITLE },
      { value: REP_EXPERIENCE_SECTION_NAME, label: REP_EXPERIENCE_SECTION_TITLE },
      { value: EMPLOYMENT_HISTORY_SECTION_NAME, label: EMPLOYMENT_HISTORY_SECTION_TITLE },
      { value: REFERENCES_SECTION_NAME, label: REFERENCES_SECTION_TITLE },
    ],

    [HR_INFO_FORM_NAME]: [
      { value: WOTC_TAX_SURVEY_SECTION_NAME, label: WOTC_TAX_SURVEY_SECTION_TITLE },
      { value: ID_COPY_UPLOAD_SECTION_NAME, label: ID_COPY_UPLOAD_SECTION_TITLE },
      ...(isDirectDepositSectionEnabled
        ? [{ value: DIRECT_DEPOSIT_SECTION_NAME, label: DIRECT_DEPOSIT_SECTION_TITLE }]
        : []),
    ],

    [WORKDAY_TASKS_FORM_NAME]: [
      { value: WORKDAY_SECTION_NAME, label: WORKDAY_SECTION_TITLE },
    ],
  };

  const configs = {
    // Personal Info
    [BASIC_INFO_SECTION_NAME]: {
      label: title2label(BASIC_INFO_SECTION_TITLE),
      options: options[PERSONAL_INFO_FORM_NAME],
    },
    [MARRIAGE_INFO_SECTION_NAME]: {
      label: title2label(MARRIAGE_INFO_SECTION_TITLE),
      options: options[PERSONAL_INFO_FORM_NAME],
    },
    ...(isPayDetailsSectionEnabled && {
      [PAY_DETAILS_SECTION_NAME]: {
        label: title2label(PAY_DETAILS_SECTION_TITLE),
        options: options[PERSONAL_INFO_FORM_NAME],
      },
    }),
    [EMERGENCY_INFO_SECTION_NAME]: {
      label: title2label(EMERGENCY_INFO_SECTION_TITLE),
      options: options[PERSONAL_INFO_FORM_NAME],
    },
    [ADDRESS_SECTION_NAME]: {
      label: title2label(ADDRESS_SECTION_TITLE),
      options: options[PERSONAL_INFO_FORM_NAME],
    },
    [GOVERNMENT_ID_SECTION_NAME]: {
      label: title2label(GOVERNMENT_ID_SECTION_TITLE),
      options: options[PERSONAL_INFO_FORM_NAME],
    },

    // Housing and Vehicles
    [HOUSING_SECTION_NAME]: {
      label: title2label(HOUSING_SECTION_TITLE),
      options: options[HOUSING_AND_VEHICLES_FORM_NAME],
    },
    [RESIDENTIAL_HISTORY_SECTION_NAME]: {
      label: title2label(RESIDENTIAL_HISTORY_SECTION_TITLE),
      options: options[HOUSING_AND_VEHICLES_FORM_NAME],
    },
    [VEHICLES_SECTION_NAME]: {
      label: title2label(VEHICLES_SECTION_TITLE),
      options: options[HOUSING_AND_VEHICLES_FORM_NAME],
    },

    // Uniform
    [UNIFORM_SECTION_NAME]: {
      label: title2label(UNIFORM_SECTION_TITLE),
      options: options[UNIFORM_AND_SWAG_FORM_NAME],
    },

    // Licensing
    [LICENSING_PERSONAL_DETAILS_SECTION_NAME]: {
      label: title2label(LICENSING_PERSONAL_DETAILS_SECTION_TITLE),
      options: options[LICENSING_FORM_NAME],
    },
    [REP_EXPERIENCE_SECTION_NAME]: {
      label: title2label(REP_EXPERIENCE_SECTION_TITLE),
      options: options[LICENSING_FORM_NAME],
    },
    [EMPLOYMENT_HISTORY_SECTION_NAME]: {
      label: title2label(EMPLOYMENT_HISTORY_SECTION_TITLE),
      options: options[LICENSING_FORM_NAME],
    },
    [REFERENCES_SECTION_NAME]: {
      label: title2label(REFERENCES_SECTION_TITLE),
      options: options[LICENSING_FORM_NAME],
    },

    // HR Info
    [WOTC_TAX_SURVEY_SECTION_NAME]: {
      label: title2label(WOTC_TAX_SURVEY_SECTION_TITLE),
      options: options[HR_INFO_FORM_NAME],
    },
    [ID_COPY_UPLOAD_SECTION_NAME]: {
      label: title2label(ID_COPY_UPLOAD_SECTION_TITLE),
      options: options[HR_INFO_FORM_NAME],
    },
    ...(isDirectDepositSectionEnabled && {
      [DIRECT_DEPOSIT_SECTION_NAME]: {
        label: title2label(DIRECT_DEPOSIT_SECTION_TITLE),
        options: options[HR_INFO_FORM_NAME],
      },
    }),

    // Workday Tasks
    [WORKDAY_SECTION_NAME]: {
      label: title2label(WORKDAY_SECTION_TITLE),
    },
  };

  return {
    title: configs[section]?.label ?? '',
    options: configs[section]?.options ?? [],
  };
};

export default getSectionConfig;
