import * as yup from 'yup';

import {
  EMAIL_REGEX,
  EMAIL_VALIDATION_MESSAGE,
  MAX_255_CHARS,
  PHONE_REGEX,
  PHONE_VALIDATION_MESSAGE,
  REQUIRED,
} from '@/lib/validations';
import { apartmentConstants } from '@/modules/Housing/lib';

const {
  FURNITURE_FURNISHED_NAME,
  FURNITURE_EMAIL_NAME,
  FURNITURE_PHONE_NAME,
  FURNITURE_NOTES_NAME,
} = apartmentConstants;

export const furnitureValidationSchema = yup.object().shape({
  [FURNITURE_FURNISHED_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
  [FURNITURE_EMAIL_NAME]: yup
    .string()
    .max(255, MAX_255_CHARS)
    .matches(EMAIL_REGEX, {
      excludeEmptyString: true,
      message: EMAIL_VALIDATION_MESSAGE,
    }),
  [FURNITURE_PHONE_NAME]: yup
    .string()
    .matches(PHONE_REGEX, {
      excludeEmptyString: true,
      message: PHONE_VALIDATION_MESSAGE,
    }),
  [FURNITURE_NOTES_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
});
