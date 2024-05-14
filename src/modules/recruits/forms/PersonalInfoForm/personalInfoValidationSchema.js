import * as yup from 'yup';
import { addressesRadioConfig, maritalStatusRadioConfig } from '@/lib/configs';
import { onboardingConstants } from '@/lib/constants';
import {
  REQUIRED,
  MIN_5_DIGITS,
  MIN_2_CHARS,
  MAX_11_CHARS,
  MAX_20_CHARS,
  MAX_100_CHARS,
  MAX_255_CHARS,
  SSN_REGEX,
  SSN_VALIDATION_MESSAGE,
  PHONE_REGEX,
  PHONE_VALIDATION_MESSAGE,
  POSTAL_CODE_REGEX,
  DRIVER_LICENSE_NUMBER_REGEX, SSN_MASKED_REGEX,
} from '@/lib/validations';
import { fileValidationSchema } from '@/components/common/Form/CustomFile/fileValidationSchema';
import moment from 'moment';
import { getMaxDOBDate } from '@/lib/utils';

const {
  WIZARD_TYPE_RECRUIT,
  CUSTOMER_FACING_PHONE_NUMBER_NAME,
} = onboardingConstants;

const conditionalAddressSchema = yup.string().when('isDifferentAddress', {
  is: (val) => val === addressesRadioConfig[0].value,
  then: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS),
  otherwise: yup.string().nullable().notRequired(),
});

const conditionalMarriageSchema = yup.string()
  .when('isMarried', {
    is: (val) => val && val === maritalStatusRadioConfig[0].value,
    then: yup.string()
      .strict()
      .checkWhiteSpacesOnly(REQUIRED)
      .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
        return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
      })
      .matches(/.{2,}/, {
        excludeEmptyString: true,
        message: MIN_2_CHARS,
      })
      .max(255, MAX_255_CHARS),
    otherwise: yup.string().nullable().notRequired(),
  });

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS),
  lastName: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS),
  fullName: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS),
  dob: yup.string()
    .test(
      'isDOBValid',
      `Date of Birth must be a date before ${getMaxDOBDate().format('MM-DD-YYYY')}`,
      (value) => {
        let isValid = true;

        const maxDOBDate = getMaxDOBDate();
        const ageDiff = maxDOBDate.diff(moment(value));

        if (value && ageDiff < 0) {
          isValid = false;
        }

        return isValid;
      },
    )
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  gender: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  // Only Admin can edit an experience field and only in edit rep form.
  experience: yup.string().when(
    ['$isAdmin', '$wizardType'],
    (isAdmin, wizardType, schema) => (
      isAdmin && wizardType === WIZARD_TYPE_RECRUIT ? schema.required(REQUIRED) : schema
    ),
  ),
  mobile: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(PHONE_REGEX, {
      excludeEmptyString: true,
      message: PHONE_VALIDATION_MESSAGE,
    }),
  [CUSTOMER_FACING_PHONE_NUMBER_NAME]: yup.string()
    .matches(PHONE_REGEX, {
      excludeEmptyString: true,
      message: PHONE_VALIDATION_MESSAGE,
    }),
  isMarried: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    }).nullable(),
  spouseFirstName: conditionalMarriageSchema,
  spouseLastName: conditionalMarriageSchema,
  rentNote: yup.string().when(['$shouldValidateRentNote'], (shouldValidateRentNote, schema) => {
    return shouldValidateRentNote
      ? schema
        .required(REQUIRED)
        .checkWhiteSpacesOnly(REQUIRED)
        .min(2, MIN_2_CHARS)
        .max(255, MAX_255_CHARS)
      : schema.nullable();
  }),
  emergencyContactName: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .checkWhiteSpacesOnly(REQUIRED)
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS),
  emergencyContactPhoneNumber: yup
    .string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(PHONE_REGEX, {
      excludeEmptyString: true,
      message: PHONE_VALIDATION_MESSAGE,
    }),
  addressOne: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS),
  addressCity: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(/.{2,}/, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(255, MAX_255_CHARS),
  addressCountry: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  addressState: yup.string()
    .when('addressCountry', {
      is: (value) => Boolean(value),
      then: yup.string().required(REQUIRED),
      otherwise: yup.string().when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
        return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
      }),
    }),
  addressZip: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(POSTAL_CODE_REGEX, {
      excludeEmptyString: true,
      message: MIN_5_DIGITS,
    })
    .max(11, MAX_11_CHARS),
  isDifferentAddress: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    }).nullable(),
  currentAddressOne: conditionalAddressSchema,
  currentAddressCity: conditionalAddressSchema,
  currentAddressCountry: yup.string().when('isDifferentAddress', {
    is: (val) => val === addressesRadioConfig[0].value,
    then: yup.string()
      .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
        return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
      }),
  }),
  currentAddressState: yup.string().when('isDifferentAddress', {
    is: (val) => val === addressesRadioConfig[0].value,
    then: yup.string()
      .when('currentAddressCountry', {
        is: (value) => Boolean(value),
        then: yup.string().required(REQUIRED),
        otherwise: yup.string().when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
          return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
        }),
      }),
  }),
  currentAddressZip: yup.string().when('isDifferentAddress', {
    is: (val) => val === addressesRadioConfig[0].value,
    then: yup.string()
      .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
        return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
      })
      .matches(POSTAL_CODE_REGEX, {
        excludeEmptyString: true,
        message: MIN_5_DIGITS,
      })
      .max(11, MAX_11_CHARS),
    otherwise: yup.string().nullable().notRequired(),
  }),
  driverLicenseNumber: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .matches(DRIVER_LICENSE_NUMBER_REGEX, {
      excludeEmptyString: true,
      message: MIN_2_CHARS,
    })
    .max(20, MAX_20_CHARS),
  ssnNumber: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin
        ? schema.matches(SSN_MASKED_REGEX, {
          excludeEmptyString: true,
          message: SSN_VALIDATION_MESSAGE,
        })
        : schema.required(REQUIRED);
    }),
  driverLicenseCountryIssued: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  driverLicenseStateIssued: yup.string()
    .when('driverLicenseCountryIssued', {
      is: (value) => Boolean(value),
      then: yup.string().required(REQUIRED),
      otherwise: yup.string().when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
        return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
      }),
    }),
  driverLicenseExpirationDate: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  profilePicture: yup.string()
    .when(['$isAdmin', '$isPersonalWizard'], (isAdmin, isPersonalWizard, schema) => {
      return !isPersonalWizard && isAdmin ? schema : schema.required(REQUIRED);
    }),
  profilePictureLocalFile: fileValidationSchema,
  facebookLink: yup.string().max(100, MAX_100_CHARS),
  linkedinLink: yup.string().max(100, MAX_100_CHARS),
  twitterLink: yup.string().max(100, MAX_100_CHARS),
  instagramLink: yup.string().max(100, MAX_100_CHARS),
});
