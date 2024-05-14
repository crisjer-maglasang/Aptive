import * as yup from 'yup';
import {
  REQUIRED,
  MIN_2_CHARS,
  MAX_255_CHARS,
  PHONE_REGEX,
  PHONE_VALIDATION_MESSAGE,
} from '@/lib/validations';

export const validationSchema = yup.object().shape({
  referenceName: yup.string()
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
  referenceRelation: yup.string()
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
  referencePhoneNumber: yup
    .string()
    .matches(PHONE_REGEX, {
      excludeEmptyString: true,
      message: PHONE_VALIDATION_MESSAGE,
    })
    .required(REQUIRED)
    .nullable(),
});
