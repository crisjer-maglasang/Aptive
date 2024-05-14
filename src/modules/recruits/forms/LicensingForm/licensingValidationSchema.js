import * as yup from 'yup';

import {
  convictionStatusRadioConfig,
  visibleMarkingsRadioConfig,
} from '@/lib/configs';

import {
  REQUIRED,
  MIN_ONE_ENTRY_LIST,
  MIN_TWO_ENTRY_LIST,
  FEET_REGEX,
  INCHES_REGEX,
  WEIGHT_REGEX,
  FEET_VALIDATION_MESSAGE,
  INCHES_VALIDATION_MESSAGE,
  WEIGHT_VALIDATION_MESSAGE,
  MIN_2_CHARS,
  MAX_255_CHARS,
  EMPLOYMENT_END_DATE_MESSAGE,
  INVALID_DATE_MESSAGE,
  PHONE_REGEX,
  PHONE_VALIDATION_MESSAGE,
  MAX_50_CHARS,
} from '@/lib/validations';
import { onboardingDataValues } from '@/lib/constants';
import { fileValidationSchema } from '@/components/common/Form/CustomFile/fileValidationSchema';
import { onboardingConstants } from '@/lib';
import { hasRepExperienceValidationSchema, repExperienceDataValidationSchema } from '@/modules/recruits/lib';

const { COUNTRY_OTHER_VALUE } = onboardingDataValues;

const {
  REP_EXPERIENCES_DATA_NAME,
  HAS_REP_EXPERIENCE,
  SOURCE_OF_DISCOVERY_NAME,
  CURRENT_SITUATION_NAME,
} = onboardingConstants;

const feetValidation = yup.string()
  .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
    return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
  })
  .matches(FEET_REGEX, {
    excludeEmptyString: true,
    message:FEET_VALIDATION_MESSAGE,
  });
const inchesValidation = yup.string()
  .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
    return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
  })
  .matches(INCHES_REGEX, {
    excludeEmptyString: true,
    message:INCHES_VALIDATION_MESSAGE,
  });

const weightValidation = yup.string()
  .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
    return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
  })
  .matches(WEIGHT_REGEX, {
    excludeEmptyString: true,
    message:WEIGHT_VALIDATION_MESSAGE,
  });

export const validationSchema = yup.object().shape({
  race: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  feet: feetValidation,
  inches: inchesValidation,
  weight: weightValidation,
  hairColor: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  eyeColor: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  cityOfBirth: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .checkWhiteSpacesOnly(REQUIRED)
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS),
  countryOfBirth: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  stateOfBirth: yup.string()
    .when('countryOfBirth', {
      is: (value) => Boolean(value),
      then: yup.string().required(REQUIRED),
      otherwise: yup.string() .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
      }),
    }),
  stateOfBirthOther: yup.string()
    .when('countryOfBirth', {
      is: (val) => val === COUNTRY_OTHER_VALUE,
      then: yup.string()
        .checkWhiteSpacesOnly(REQUIRED)
        .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
          return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
        })
        .matches(/.{2,}/, {
          excludeEmptyString: true,
          message: MIN_2_CHARS,
        })
        .max(50, MAX_50_CHARS),
      otherwise: yup.string().nullable().notRequired(),
    }),
  isUsCitizen: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    }).nullable(),
  hasVisibleMarkings: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    }).nullable(),
  markingsDescription: yup.string()
    .when('hasVisibleMarkings', {
      is: (val) => val === visibleMarkingsRadioConfig[0].value,
      then: yup.string()
        .checkWhiteSpacesOnly(REQUIRED)
        .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
          return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
        })
        .matches(/.{2,}/, {
          excludeEmptyString: true,
          message: MIN_2_CHARS,
        })
        .max(255, MAX_255_CHARS),
      otherwise: yup.string().nullable().notRequired(),
    }),
  isConvictedOfCrime: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .nullable(),
  crimeDescription: yup.string()
    .when('isConvictedOfCrime', {
      is: (val) => val === convictionStatusRadioConfig[0].value,
      then: yup.string()
        .checkWhiteSpacesOnly(REQUIRED)
        .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
          return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
        })
        .matches(/.{2,}/, {
          excludeEmptyString: true,
          message: MIN_2_CHARS,
        })
        .max(255, MAX_255_CHARS),
      otherwise: yup.string().nullable().notRequired(),
    }),
  referenceData: yup
    .array()
    .of(
      yup.object().shape({
        referenceName: yup.string()
          .checkWhiteSpacesOnly(REQUIRED)
          .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
            return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
          })
          .matches(/.{2,}/, {
            excludeEmptyString: true,
            message: MIN_2_CHARS,
          })
          .max(255, MAX_255_CHARS)
          .nullable(),
        referenceRelation: yup.string()
          .checkWhiteSpacesOnly(REQUIRED)
          .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
            return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
          })
          .matches(/.{2,}/, {
            excludeEmptyString: true,
            message: MIN_2_CHARS,
          })
          .max(255, MAX_255_CHARS)
          .nullable(),
        referencePhoneNumber: yup
          .string()
          .matches(PHONE_REGEX, {
            excludeEmptyString: true,
            message: PHONE_VALIDATION_MESSAGE,
          })
          .required(REQUIRED)
          .nullable(),
      }),
    )
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.min(1, MIN_ONE_ENTRY_LIST);
    }),
  employmentData: yup
    .array()
    .of(
      yup.object().shape({
        employerName: yup.string()
          .checkWhiteSpacesOnly(REQUIRED)
          .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
            return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
          })
          .matches(/.{2,}/, {
            excludeEmptyString: true,
            message: MIN_2_CHARS,
          })
          .max(255, MAX_255_CHARS)
          .nullable(),
        employerStartDate: yup
          .date()
          .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
            return !isWizard && isAdmin ? schema.nullable().transform((value) => (value instanceof Date && !isNaN(value) ? value : null)) : schema.required(REQUIRED);
          })
          .nullable()
          .typeError(INVALID_DATE_MESSAGE),
        employerEndDate: yup
          .date()
          .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
            return !isWizard && isAdmin ? schema.nullable().transform((value) => (value instanceof Date && !isNaN(value) ? value : null)) : schema.required(REQUIRED);
          })
          .nullable()
          .min(
            yup.ref('employerStartDate'),
            EMPLOYMENT_END_DATE_MESSAGE,
          )
          .typeError(INVALID_DATE_MESSAGE),
      }),
    )
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.min(2, MIN_TWO_ENTRY_LIST);
    }),
  driverLicense: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  driverLicenseLocalFile: fileValidationSchema,
  signature: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  [HAS_REP_EXPERIENCE]: hasRepExperienceValidationSchema,
  [REP_EXPERIENCES_DATA_NAME]: repExperienceDataValidationSchema(false),
});
