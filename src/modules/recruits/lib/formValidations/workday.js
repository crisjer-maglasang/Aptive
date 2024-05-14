import * as yup from 'yup';
import { MAX_100_CHARS } from '@/lib/validations'

export const workdayValidationSchema = yup.object({
  workdayId: yup
    .string()
    .max(100, MAX_100_CHARS),
});
