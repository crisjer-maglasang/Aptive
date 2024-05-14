import * as yup from 'yup';

import {
  EMAIL_REGEX,
  EMAIL_VALIDATION_MESSAGE,
  MAX_255_CHARS,
  MIN_2_CHARS,
  REQUIRED
} from '@/lib/validations';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS)
    .test('email-regex',
      EMAIL_VALIDATION_MESSAGE,
      value => value && value.toString().match(EMAIL_REGEX)
    ),
});
