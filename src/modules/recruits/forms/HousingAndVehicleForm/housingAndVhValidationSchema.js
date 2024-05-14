import * as yup from 'yup';
import subDays from 'date-fns/subDays';
import { vehicleStatusRadioConfig, housingStatusRadioConfig, addressesRadioConfig } from '@/lib/configs';
import {
  YEAR_REGEX,
  REQUIRED,
  MIN_2_CHARS,
  MAX_255_CHARS,
  YEAR_DIGITS_MESSAGE,
  RESIDENTIAL_END_DATE_MESSAGE,
  ARRIVAL_DATE_MIN_MESSAGE,
  ARRIVAL_DATE_MAX_MESSAGE,
  KNOCKING_END_DATE_MIN_MESSAGE,
  INVALID_DATE_MESSAGE,
  ACTUAL_END_DATE_MIN_MESSAGE,
} from '@/lib/validations';

const conditionalVehicleSchema = yup.string()
    .when('hasVehicle', {
      is: val => val === vehicleStatusRadioConfig[0].value,
      then: yup.string()
        .checkWhiteSpacesOnly(REQUIRED)
        .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
            return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
          }
        )
        .matches(/.{2,}/, {
          excludeEmptyString: true,
          message: MIN_2_CHARS,
        })
        .max(255, MAX_255_CHARS),
      otherwise: yup.string().nullable().notRequired(),
    });

const vehicleYearConditionalSchema = yup.string()
  .when('hasVehicle', {
    is: val => val === vehicleStatusRadioConfig[0].value,
    then: yup.string()
      .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
          return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
        }
      )
      .matches(YEAR_REGEX, {
        excludeEmptyString: true,
        message: YEAR_DIGITS_MESSAGE,
      }),
    otherwise: yup.string().nullable().notRequired(),
  })

const conditionalHousingSchema = yup.boolean()
  .when('needsHousing',
    (needsHousing, schema) => {
      if (needsHousing === housingStatusRadioConfig[0].value) {
        return needsHousing && schema
          .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
              return !isWizard && isAdmin ? schema : schema.oneOf([true], REQUIRED);
            }
          )
      }
    }
  );

export const validationSchema = yup.object().shape({
  expectedArrivalDate: yup
    .date()
    .typeError(INVALID_DATE_MESSAGE)
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema.nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)) : schema.required(REQUIRED)
      }
    )
    .when('tentativeKnockingStartDate', (knockingStartDate, schema) => {
      if (knockingStartDate && knockingStartDate instanceof Date && !isNaN(knockingStartDate)) {
        return schema.min(subDays(knockingStartDate, 3), ARRIVAL_DATE_MIN_MESSAGE);
      }

      return schema;
    })
    .when('tentativeKnockingStartDate', (knockingStartDate, schema) => {
      if (knockingStartDate && knockingStartDate instanceof Date && !isNaN(knockingStartDate)) {
        return schema.max(knockingStartDate, ARRIVAL_DATE_MAX_MESSAGE);
      }

      return schema;
    }),
  tentativeKnockingStartDate: yup
    .date()
    .typeError(INVALID_DATE_MESSAGE)
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema.nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)) : schema.required(REQUIRED)
      }
    ),
  tentativeKnockingEndDate: yup
    .date()
    .typeError(INVALID_DATE_MESSAGE)
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema.nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)) : schema.required(REQUIRED)
      }
    )
    .when('tentativeKnockingStartDate', (knockingStartDate, schema) => {
      if (knockingStartDate && knockingStartDate instanceof Date && !isNaN(knockingStartDate)) {
        return schema.min(knockingStartDate, KNOCKING_END_DATE_MIN_MESSAGE);
      }

      return schema;
    }),
  actualStartDate: yup
    .date()
    .nullable()
    .transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
  actualEndDate: yup
    .date()
    .typeError(INVALID_DATE_MESSAGE)
    .when('actualStartDate', (actualStartDate, schema) => {
      if (actualStartDate && actualStartDate instanceof Date && !isNaN(actualStartDate)) {
        return schema.min(actualStartDate, ACTUAL_END_DATE_MIN_MESSAGE);
      }

      return schema;
    })
    .nullable()
    .transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
  needsHousing: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    )
    .nullable(),
  repAcknowledgment: conditionalHousingSchema,
  hasVehicle: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    )
    .nullable(),
  hasSegway: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    )
    .nullable(),
  vehicleModel: conditionalVehicleSchema,
  vehicleColor: conditionalVehicleSchema,
  vehicleYear: vehicleYearConditionalSchema,
  vehiclePlateNumber: conditionalVehicleSchema,
  vehicleRegistrationCountry: yup.string().when('hasVehicle', {
    is: (val) => val === vehicleStatusRadioConfig[0].value,
    then: yup.string()
      .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
      }),
  }),
  vehicleRegistrationState: yup.string().when('hasVehicle', {
    is: (val) => val === vehicleStatusRadioConfig[0].value,
    then: yup.string()
      .when('vehicleRegistrationCountry', {
        is: (value) => Boolean(value),
        then: yup.string().required(REQUIRED),
        otherwise: yup.string() .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
          return !isWizard && isAdmin ? schema : schema.required(REQUIRED);
        }),
      }),
  }),
  addressHistoryName: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    )
    .matches(/.{2,}/, {
        excludeEmptyString: true,
        message: MIN_2_CHARS,
      })
    .max(255, MAX_255_CHARS),
  addressHistoryStartDate: yup
    .date()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema.nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)) : schema.required(REQUIRED)
      }
    )
    .typeError(INVALID_DATE_MESSAGE),
  addressHistoryEndDate: yup
    .date()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema.nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)) : schema.required(REQUIRED)
      }
    )
    .min(
      yup.ref('addressHistoryStartDate'),
      RESIDENTIAL_END_DATE_MESSAGE
    )
    .typeError(INVALID_DATE_MESSAGE),
});
