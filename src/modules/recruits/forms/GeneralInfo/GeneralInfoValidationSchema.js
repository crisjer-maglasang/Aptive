import * as yup from 'yup';

import {
  EMAIL_REGEX,
  EMAIL_VALIDATION_MESSAGE,
  MAX_255_CHARS,
  MIN_2_CHARS,
  PHONE_VALIDATION_MESSAGE,
  REQUIRED,
  SSN_4_DIGITS,
  NUMBERS_ONLY,
  LAST_FOUR_SSN_REGEX,
  SSN_DIGITS_MESSAGE,
} from '@/lib/validations';
import { dashboardConstants, onboardingConstants } from '@/lib/constants';
import { hasRepExperienceValidationSchema, repExperienceDataValidationSchema } from '@/modules/recruits/lib';

const {
  RECRUITING_OFFICE_NAME,
} = dashboardConstants;

const {
  REP_EXPERIENCES_DATA_NAME,
  HAS_REP_EXPERIENCE,
} = onboardingConstants;

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  lastName: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  dob: yup.string().required(REQUIRED),
  email: yup
    .string()
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS)
    .test(
      'email-regex',
      EMAIL_VALIDATION_MESSAGE,
      value => value && value.toString().match(EMAIL_REGEX)
    ),
  ssnLastFour: yup
    .string()
    .when(['$isUser'], (isUser) => {
      return !isUser ? yup.string().trim().required(SSN_4_DIGITS) : yup.string().trim().notRequired();
    })
    .test(
      'digits-only',
      SSN_DIGITS_MESSAGE,
      value => (value === null || value === '') || value.toString().match(NUMBERS_ONLY)
    )
    .test(
      'max-digits',
      SSN_4_DIGITS,
      value => (value === null || value === '') || value.toString().match(LAST_FOUR_SSN_REGEX)
    )
    .nullable()
    .transform((curr, orig) => orig === '' ? null : curr),
  mobile: yup.string()
    .required(REQUIRED)
    .min(14, PHONE_VALIDATION_MESSAGE),
  recruiter_id: yup
    .string()
    .required(REQUIRED)
    .nullable(),
  [RECRUITING_OFFICE_NAME]: yup
    .string()
    .required(REQUIRED),
  [HAS_REP_EXPERIENCE]: hasRepExperienceValidationSchema,
  [REP_EXPERIENCES_DATA_NAME]: repExperienceDataValidationSchema(),
});
