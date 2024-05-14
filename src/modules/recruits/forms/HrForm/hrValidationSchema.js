import * as yup from 'yup';
import { usesPassportRadioConfig } from '@/lib/configs';

import {
  ACCOUNT_NUMBER_SCHEMA_REGEX,
  REQUIRED,
  ROUTING_NUMBER_REGEX,
  WOTC_SURVEY_MESSAGE,
  W9_MESSAGE,
  I9_MESSAGE,
} from '@/lib/validations';
import { fileValidationSchema } from '@/components/common/Form/CustomFile/fileValidationSchema';
import { onboardingConstants } from '@/lib/constants';

const {
  DIRECT_DEPOSIT_BANK_NAME,
  DIRECT_DEPOSIT_ACCOUNT_TYPE,
  DIRECT_DEPOSIT_ROUTING_NUMBER,
  DIRECT_DEPOSIT_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_ACCOUNT_NAME,
  WORKDAY_ID,
  USE_PREVIOUS_W9_NAME,
} = onboardingConstants;

const isRequiredPassportField = yup.string()
  .when(
    'usesType',
    (usesType) => {
      if (usesType === usesPassportRadioConfig[0].value) {
        return yup.string()
          .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
            return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
          });
      } else {
        return yup.string().nullable().notRequired();
      }
    },
  );

export const validationSchema = yup.object().shape({
  usesType: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
    })
    .nullable(),
  passportPicture: isRequiredPassportField,
  passportPictureLocalFile: fileValidationSchema,
  passportExpirationDate: isRequiredPassportField,
  driverLicense: yup.string()
    .when(
      'usesType',
      (usesType) => {
        if (usesType !== usesPassportRadioConfig[0].value) {
          return yup.string()
            .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
              return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
            });
        } else {
          return yup.string().nullable().notRequired();
        }
      },
    ),
  driverLicenseLocalFile: fileValidationSchema,
  socialSecurityCard: yup.string()
    .when(
      'usesType',
      (usesType) => {
        if (usesType !== usesPassportRadioConfig[0].value) {
          return yup.string()
            .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
              return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
            });
        } else {
          return yup.string().nullable().notRequired();
        }
      },
    ),
  socialSecurityPictureLocalFile: fileValidationSchema,
  wotcSurveyCompleted: yup.bool()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
      return !isWizard && isAdmin ? schema : schema.oneOf([true], WOTC_SURVEY_MESSAGE);
    }),
  w9Clicked: yup.bool().when([USE_PREVIOUS_W9_NAME], {
    is: false,
    then: yup.bool()
      .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.oneOf([true], W9_MESSAGE);
      }),
    otherwise: yup.bool().notRequired(),
  }),
  i9Clicked: yup.bool()
    .when(['$isAdmin', '$isWizard', '$isI9DocumentsSectionEnabled'], (isAdmin, isWizard, isI9DocumentsSectionEnabled, schema) => {
      return (!isWizard && isAdmin) || !isI9DocumentsSectionEnabled ? schema : schema.oneOf([true], I9_MESSAGE);
    }),

  [DIRECT_DEPOSIT_BANK_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when([
      '$defaultValues',
      '$isAdmin',
      '$isWizard',
      WORKDAY_ID,
      '$isDirectDepositSectionEnabled',
      DIRECT_DEPOSIT_ACCOUNT_TYPE,
      DIRECT_DEPOSIT_ROUTING_NUMBER,
      DIRECT_DEPOSIT_ACCOUNT_NAME,
      DIRECT_DEPOSIT_ACCOUNT_NUMBER,
    ], (
      defaultValues,
      isAdmin,
      isWizard,
      workdayId,
      isDirectDepositSectionEnabled,
      accountType,
      routingNumber,
      accountName,
      accountNumber,
      schema,
    ) => {
      const directDepositChanged =
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_TYPE] != accountType ||
        defaultValues[DIRECT_DEPOSIT_ROUTING_NUMBER] != routingNumber ||
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_NAME] != accountName ||
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_NUMBER] != accountNumber;

      if (
        (directDepositChanged || isWizard || !isAdmin) &&
        workdayId &&
        isDirectDepositSectionEnabled
      ) {
        return schema.required(REQUIRED);
      }

      return schema;
    })
    .max(50, 'Bank name is too long.'),
  [DIRECT_DEPOSIT_ACCOUNT_NAME]: yup
    .string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when([
      '$defaultValues',
      '$isAdmin',
      '$isWizard',
      WORKDAY_ID,
      '$isDirectDepositSectionEnabled',
      DIRECT_DEPOSIT_ACCOUNT_TYPE,
      DIRECT_DEPOSIT_ROUTING_NUMBER,
      DIRECT_DEPOSIT_BANK_NAME,
      DIRECT_DEPOSIT_ACCOUNT_NUMBER,
    ], (
      defaultValues,
      isAdmin,
      isWizard,
      workdayId,
      isDirectDepositSectionEnabled,
      accountType,
      routingNumber,
      bankName,
      accountNumber,
      schema,
    ) => {
      const directDepositChanged =
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_TYPE] != accountType ||
        defaultValues[DIRECT_DEPOSIT_ROUTING_NUMBER] != routingNumber ||
        defaultValues[DIRECT_DEPOSIT_BANK_NAME] != bankName ||
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_NUMBER] != accountNumber;

      if (
        (directDepositChanged || isWizard || !isAdmin) &&
        workdayId &&
        isDirectDepositSectionEnabled
      ) {
        return schema.required(REQUIRED);
      }

      return schema;
    })
    .max(50, 'Account name is too long.'),
  [DIRECT_DEPOSIT_ACCOUNT_TYPE]: yup
    .string()
    .when([
      '$defaultValues',
      '$isAdmin',
      '$isWizard',
      WORKDAY_ID,
      '$isDirectDepositSectionEnabled',
      DIRECT_DEPOSIT_ACCOUNT_NAME,
      DIRECT_DEPOSIT_ROUTING_NUMBER,
      DIRECT_DEPOSIT_BANK_NAME,
      DIRECT_DEPOSIT_ACCOUNT_NUMBER,
    ], (
      defaultValues,
      isAdmin,
      isWizard,
      workdayId,
      isDirectDepositSectionEnabled,
      accountName,
      routingNumber,
      bankName,
      accountNumber,
      schema,
    ) => {
      const directDepositChanged =
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_NAME] != accountName ||
        defaultValues[DIRECT_DEPOSIT_ROUTING_NUMBER] != routingNumber ||
        defaultValues[DIRECT_DEPOSIT_BANK_NAME] != bankName ||
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_NUMBER] != accountNumber;

      if (
        (directDepositChanged || isWizard || !isAdmin) &&
        workdayId &&
        isDirectDepositSectionEnabled
      ) {
        return schema.oneOf(
          ['Checking', 'Savings'],
          'Account type must be either Checking or Savings.',
        );
      }

      return schema;
    }),
  [DIRECT_DEPOSIT_ROUTING_NUMBER]: yup
    .string()
    .when([
      '$defaultValues',
      '$isAdmin',
      '$isWizard',
      WORKDAY_ID,
      '$isDirectDepositSectionEnabled',
      DIRECT_DEPOSIT_ACCOUNT_NAME,
      DIRECT_DEPOSIT_ACCOUNT_TYPE,
      DIRECT_DEPOSIT_BANK_NAME,
      DIRECT_DEPOSIT_ACCOUNT_NUMBER,
    ], (
      defaultValues,
      isAdmin,
      isWizard,
      workdayId,
      isDirectDepositSectionEnabled,
      accountName,
      accountType,
      bankName,
      accountNumber,
      schema,
    ) => {
      const directDepositChanged =
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_NAME] != accountName ||
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_TYPE] != accountType ||
        defaultValues[DIRECT_DEPOSIT_BANK_NAME] != bankName ||
        defaultValues[DIRECT_DEPOSIT_ACCOUNT_NUMBER] != accountNumber;

      if (
        (directDepositChanged || isWizard || !isAdmin) &&
        workdayId &&
        isDirectDepositSectionEnabled
      ) {
        return schema.required(REQUIRED);
      }

      return schema;
    })
    .matches(
      ROUTING_NUMBER_REGEX,
      {
        excludeEmptyString: true,
        message: 'Routing number must be exactly 9 digits.',
      },
    ),
  [DIRECT_DEPOSIT_ACCOUNT_NUMBER]: yup
    .string()
    .when(
      [
        '$defaultValues',
        WORKDAY_ID,
        '$isDirectDepositSectionEnabled',
        DIRECT_DEPOSIT_ACCOUNT_NAME,
        DIRECT_DEPOSIT_ACCOUNT_TYPE,
        DIRECT_DEPOSIT_BANK_NAME,
        DIRECT_DEPOSIT_ROUTING_NUMBER,
      ],
      (
        defaultValues,
        workdayId,
        isDirectDepositSectionEnabled,
        accountName,
        accountType,
        bankName,
        routingNumber,
        schema,
      ) => {
        const directDepositChanged =
          defaultValues[DIRECT_DEPOSIT_ACCOUNT_NAME] != accountName ||
          defaultValues[DIRECT_DEPOSIT_ACCOUNT_TYPE] != accountType ||
          defaultValues[DIRECT_DEPOSIT_BANK_NAME] != bankName ||
          defaultValues[DIRECT_DEPOSIT_ROUTING_NUMBER] != routingNumber;

        if (workdayId && isDirectDepositSectionEnabled && directDepositChanged) {
          return schema.matches(ACCOUNT_NUMBER_SCHEMA_REGEX, {
            excludeEmptyString: false,
            message: 'Account number must be between 1 to 17 digits.',
          });
        }

        return schema;
      },
    ),
  [DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER]: yup
    .string()
    .when(
      ['$defaultValues', DIRECT_DEPOSIT_ACCOUNT_NUMBER],
      (defaultValues, accountNumber, schema) => {
        const accountNumberChanged =
          defaultValues[DIRECT_DEPOSIT_ACCOUNT_NUMBER] != accountNumber;

        if (!accountNumberChanged){
          return schema;
        }

        return schema.oneOf(
          [accountNumber],
          'Account numbers must match.',
        );
      },
    ),
}, [
  [DIRECT_DEPOSIT_BANK_NAME, DIRECT_DEPOSIT_ACCOUNT_TYPE],
  [DIRECT_DEPOSIT_BANK_NAME, DIRECT_DEPOSIT_ROUTING_NUMBER],
  [DIRECT_DEPOSIT_BANK_NAME, DIRECT_DEPOSIT_ACCOUNT_NAME],
  [DIRECT_DEPOSIT_BANK_NAME, DIRECT_DEPOSIT_ACCOUNT_NUMBER],
  [DIRECT_DEPOSIT_ACCOUNT_NAME, DIRECT_DEPOSIT_ACCOUNT_TYPE],
  [DIRECT_DEPOSIT_ACCOUNT_NAME, DIRECT_DEPOSIT_ROUTING_NUMBER],
  [DIRECT_DEPOSIT_ACCOUNT_NAME, DIRECT_DEPOSIT_ACCOUNT_NUMBER],
  [DIRECT_DEPOSIT_ACCOUNT_TYPE, DIRECT_DEPOSIT_ACCOUNT_NUMBER],
  [DIRECT_DEPOSIT_ACCOUNT_TYPE, DIRECT_DEPOSIT_ROUTING_NUMBER],
  [DIRECT_DEPOSIT_ROUTING_NUMBER, DIRECT_DEPOSIT_ACCOUNT_NUMBER],
]);
