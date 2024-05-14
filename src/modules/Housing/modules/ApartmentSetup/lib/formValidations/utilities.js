import * as yup from 'yup';

import { MAX_255_CHARS, REQUIRED } from '@/lib/validations';
import { apartmentConstants } from '@/modules/Housing/lib';

const {
  UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME,
  UTILITIES_GAS_ACCOUNT_NUMBER_NAME,
  UTILITIES_NOTES_NAME,
} = apartmentConstants;

export const utilitiesValidationSchema = yup.object().shape({
  [UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
  [UTILITIES_GAS_ACCOUNT_NUMBER_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
  [UTILITIES_NOTES_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
});
