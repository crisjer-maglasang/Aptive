import * as yup from 'yup';

import {
  EMAIL_REGEX,
  EMAIL_VALIDATION_MESSAGE,
  MAX_255_CHARS,
  MIN_2_CHARS,
  PHONE_VALIDATION_MESSAGE,
  REQUIRED,
  PHONE_REGEX,
  POSTAL_CODE_REGEX,
  MIN_5_DIGITS,
  MAX_11_CHARS,
  MIN_1_ARRAY,
} from '@/lib/validations';
import { apartmentSetupConstants } from '@/modules/Housing/lib';

const {
  COMPLEX_NAME,
  COMPLEX_TYPE_NAME,
  EMAIL_NAME,
  STATE_NAME,
  ZIP_NAME,
  CITY_NAME,
  PHONE_NAME,
  STREET_ADDRESS_NAME,
  CONTACT_PERSON_NAME,
  TEAMS_NAME,
  DEALER_NAME,
} = apartmentSetupConstants;

export const complexValidationSchema = yup.object().shape({
  [COMPLEX_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  [DEALER_NAME]: yup
    .string()
    .required(REQUIRED),
  [COMPLEX_TYPE_NAME]: yup
    .string()
    .required(REQUIRED),
  [TEAMS_NAME]: yup
    .array()
    .required(REQUIRED)
    .min(1, MIN_1_ARRAY),
  [EMAIL_NAME]: yup
    .string()
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS)
    .test(
      'email-regex',
      EMAIL_VALIDATION_MESSAGE,
      (value) => value && value.toString().match(EMAIL_REGEX),
    ),
  [STATE_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  [ZIP_NAME]: yup
    .string()
    .required(REQUIRED)
    .matches(POSTAL_CODE_REGEX, {
      excludeEmptyString: true,
      message: MIN_5_DIGITS,
    })
    .max(11, MAX_11_CHARS),
  [CITY_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  [STREET_ADDRESS_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  [PHONE_NAME]: yup
    .string()
    .required(REQUIRED)
    .matches(PHONE_REGEX, {
      excludeEmptyString: true,
      message: PHONE_VALIDATION_MESSAGE,
    }),
  [CONTACT_PERSON_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
});
