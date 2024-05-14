import * as yup from 'yup';
import {
  MAX_255_CHARS,
  MAX_50_CHARS,
  MIN_1_NUM,
  MIN_2_CHARS,
  NUMBERS_REGEX,
  REP_ACCOUNT_NUMBERS_MESSAGE,
  REQUIRED
} from '@/lib/validations'
import { onboardingConstants, onboardingDataValues } from '@/lib/constants';

const { LAST_INDUSTRY_OTHER_VALUE } = onboardingDataValues;

const {
  LAST_INDUSTRY_NAME,
  LAST_INDUSTRY_OTHER_NAME,
  COMPANY_YEARS_SOLD,
  COMPANY_ACCOUNT_NUMBERS,
  COMPANY_NAME,
} = onboardingConstants;

export const hasRepExperienceValidationSchema = yup.string()
  .when(['$isAdmin', '$isWizard', '$isExperienceRequired'], (isAdmin, isWizard, isExperienceRequired, schema) => {
    return (!isWizard && isAdmin) || isExperienceRequired ? schema.required(REQUIRED) : schema;
  })
  .nullable();

export const repExperienceDataValidationSchema = (lastIndustryRequired = true) => yup.array().of(
  yup.object().shape({
    [LAST_INDUSTRY_NAME]: yup
      .string()
      .when(['$isAdmin', '$isWizard', '$isExperienceRequired'], (isAdmin, isWizard, isExperienceRequired, schema) => {
        return ((!isWizard && isAdmin) || isExperienceRequired) && lastIndustryRequired ? schema.required(REQUIRED) : schema;
      }),
    [LAST_INDUSTRY_OTHER_NAME]:
      yup.string()
        .when(LAST_INDUSTRY_NAME, {
          is: (val) => val === LAST_INDUSTRY_OTHER_VALUE,
          then: yup.string()
            .checkWhiteSpacesOnly(REQUIRED)
            .when(['$isAdmin', '$isWizard', '$isExperienceRequired'], (isAdmin, isWizard, isExperienceRequired, schema) => {
              return (!isWizard && isAdmin) || isExperienceRequired ? schema.required(REQUIRED) : schema;
            })
            .matches(/.{2,}/, {
              excludeEmptyString: true,
              message: MIN_2_CHARS,
            })
            .max(50, MAX_50_CHARS),
          otherwise: yup.string().nullable().notRequired(),
        }),
    [COMPANY_YEARS_SOLD]: yup
      .string()
      .when(['$isAdmin', '$isWizard', '$isExperienceRequired'], (isAdmin, isWizard, isExperienceRequired, schema) => {
        return (!isWizard && isAdmin) || isExperienceRequired ? schema.required(REQUIRED) : schema;
      })
      .matches(/.{1,}/, {
        excludeEmptyString: true,
        message: MIN_1_NUM,
      })
      .max(255, MAX_255_CHARS)
      .matches(NUMBERS_REGEX, {
        excludeEmptyString: true,
        message: REP_ACCOUNT_NUMBERS_MESSAGE,
      }),
    [COMPANY_ACCOUNT_NUMBERS]: yup
      .string()
      .when(['$isAdmin', '$isWizard', '$isExperienceRequired'], (isAdmin, isWizard, isExperienceRequired, schema) => {
        return (!isWizard && isAdmin) || isExperienceRequired ? schema.required(REQUIRED) : schema;
      })
      .matches(/.{1,}/, {
        excludeEmptyString: true,
        message: MIN_1_NUM,
      })
      .max(255, MAX_255_CHARS)
      .matches(NUMBERS_REGEX, {
        excludeEmptyString: true,
        message: REP_ACCOUNT_NUMBERS_MESSAGE,
      }),
    [COMPANY_NAME]: yup
      .string()
      .checkWhiteSpacesOnly(REQUIRED)
      .when(['$isAdmin', '$isWizard', '$isExperienceRequired'], (isAdmin, isWizard, isExperienceRequired, schema) => {
        return (!isWizard && isAdmin) || isExperienceRequired ? schema.required(REQUIRED) : schema;
      })
      .matches(/.{2,}/, {
        excludeEmptyString: true,
        message: MIN_2_CHARS,
      })
      .max(255, MAX_255_CHARS),
  }),
);
