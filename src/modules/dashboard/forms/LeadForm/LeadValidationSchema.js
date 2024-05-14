import * as yup from 'yup';
import {
  REQUIRED,
  SSN_4_DIGITS,
  MIN_2_CHARS,
  MAX_255_CHARS,
  EMAIL_REGEX,
  EMAIL_VALIDATION_MESSAGE,
  NUMBERS_ONLY,
  PHONE_VALIDATION_MESSAGE,
  LAST_FOUR_SSN_REGEX,
  SSN_DIGITS_MESSAGE,
} from '@/lib/validations';
import { dashboardConstants, onboardingConstants } from '@/lib/constants';
import { hasRepExperienceValidationSchema, repExperienceDataValidationSchema } from '@/modules/recruits/lib';

const {
  REP_EXPERIENCES_DATA_NAME,
  HAS_REP_EXPERIENCE,
  FIRST_NAME,
  LAST_NAME,
  DATE_OF_BIRTH,
} = onboardingConstants;

const {
  EMAIL_NAME,
  SSN_LAST_FOUR_NAME,
  RECRUITER_NAME,
  RECRUITING_OFFICE_NAME,
  PHONE_NAME,
} = dashboardConstants;

export const validationSchema = yup.object().shape({
  [FIRST_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  [LAST_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  [DATE_OF_BIRTH]: yup
    .string()
    .required(REQUIRED),
  [EMAIL_NAME]: yup
    .string()
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS)
    .test('email-regex',
      EMAIL_VALIDATION_MESSAGE,
      value => value && value.toString().match(EMAIL_REGEX)
    ),
  [SSN_LAST_FOUR_NAME]: yup
    .string()
    .typeError(SSN_DIGITS_MESSAGE)
    .test(
      'digits-only',
      SSN_DIGITS_MESSAGE,
      value => (value === null || value === '') || value.toString().match(NUMBERS_ONLY)
    )
    .test(
      'max-digits',
      SSN_4_DIGITS,
      value => (value === null || value === '') ||  value.toString().match(LAST_FOUR_SSN_REGEX)
    )
    .nullable()
    .transform((curr, orig) => orig === '' ? null : curr),
  [PHONE_NAME]: yup
    .string()
    .required(REQUIRED)
    .min(
      14,
      PHONE_VALIDATION_MESSAGE
    ),
  [RECRUITER_NAME]: yup
    .string()
    .required(REQUIRED),
  [RECRUITING_OFFICE_NAME]: yup
    .string()
    .required(REQUIRED),
  [HAS_REP_EXPERIENCE]: hasRepExperienceValidationSchema,
  [REP_EXPERIENCES_DATA_NAME]: repExperienceDataValidationSchema(),
});
