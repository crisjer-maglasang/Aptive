import * as yup from 'yup';

import {
  REQUIRED,
  MAX_255_CHARS,
} from '@/lib/validations';

import { apartmentConstants } from '@/modules/Housing/lib';

const {
  MOVE_OUT_NOTICE_GIVEN_NAME,
  MOVE_OUT_NOTES_NAME,
} = apartmentConstants;

export const moveoutValidationSchema = yup.object().shape({
  [MOVE_OUT_NOTICE_GIVEN_NAME]: yup
    .string()
    .required(REQUIRED),
  [MOVE_OUT_NOTES_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .max(255, MAX_255_CHARS)
    .notRequired(),
});
