import * as yup from 'yup';

import {
  MAX_255_CHARS,
  REQUIRED,
} from '@/lib/validations';

import { apartmentConstants } from '@/modules/Housing/lib';

const {
  LEASED_BY_NAME,
  LEASED_NOTES_NAME,
} = apartmentConstants;

export const leaseValidationSchema = yup.object().shape({
  [LEASED_BY_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
  [LEASED_NOTES_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
});
