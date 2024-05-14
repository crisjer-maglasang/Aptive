import * as yup from 'yup';
import {
  REQUIRED,
  MIN_2_CHARS,
  MAX_255_CHARS,
  INVALID_DATE_MESSAGE,
  EMPLOYMENT_END_DATE_MESSAGE,
} from '@/lib/validations';

export const validationSchema = yup.object().shape({
  employerName: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS)
    .nullable(),
  employerStartDate: yup
    .date()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin
        ? schema.nullable().transform((value) => (value instanceof Date && !isNaN(value) ? value : null))
        : schema.required(REQUIRED);
    })
    .nullable()
    .typeError(INVALID_DATE_MESSAGE),
  employerEndDate: yup
    .date()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin
        ? schema.nullable().transform((value) => (value instanceof Date && !isNaN(value) ? value : null))
        : schema.required(REQUIRED);
    })
    .nullable()
    .min(
      yup.ref('employerStartDate'),
      EMPLOYMENT_END_DATE_MESSAGE,
    )
    .typeError(INVALID_DATE_MESSAGE),
});
