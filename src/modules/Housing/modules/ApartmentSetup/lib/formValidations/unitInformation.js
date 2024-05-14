import * as yup from 'yup';

import {
  MAX_255_CHARS,
  MIN_2_CHARS,
  REQUIRED,
} from '@/lib/validations';
import { apartmentConstants } from '@/modules/Housing/lib';

const {
  UNIT_ID_NAME,
  UNIT_HAS_COUCH_NAME,
  UNIT_NUMBER_OF_ROOMS_NAME,
  UNIT_STREET_ADDRESS_NAME,
  UNIT_REP_TYPE_NAME,
  UNIT_NOTES_NAME,
  UNIT_ROOMS_NAME,
  UNIT_NUMBER_OF_BEDS_NAME,
} = apartmentConstants;

export const unitInformationValidationSchema = yup.object().shape({
  [UNIT_ID_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS),
  [UNIT_HAS_COUCH_NAME]: yup
    .string()
    .required(REQUIRED),
  [UNIT_REP_TYPE_NAME]: yup
    .string()
    .required(REQUIRED),
  [UNIT_NUMBER_OF_ROOMS_NAME]: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(REQUIRED),
  [UNIT_STREET_ADDRESS_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS),
  [UNIT_NOTES_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
  [UNIT_ROOMS_NAME]: yup.array().of(
    yup.object().shape({
      [UNIT_NUMBER_OF_BEDS_NAME]: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required(REQUIRED),
    }),
  ),
});
