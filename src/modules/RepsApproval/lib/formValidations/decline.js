import * as yup from 'yup';
import { MIN_2_CHARS, REQUIRED, validateStringLength } from '@/lib/validations';

export const declineValidationSchema = yup.object({
  reason: yup.string()
    .required(REQUIRED),
  description: yup.string()
    .required(REQUIRED)
    .test(
      'isMinStringValid',
      MIN_2_CHARS,
      (value) => {
        return validateStringLength(value, 2, 'min');
      },
    ),
});
