import * as yup from 'yup';
import { errorMessageMap } from './maps';
const required = errorMessageMap['required'];
// needs update
const dateValidator = yup.string().required(required);
export const personalDataSchema = yup.object().shape({
  identifierData: yup.object().shape({
    firstName: yup.object().shape({ value: yup.string().required(required) }),
    lastName: yup.object().shape({ value: yup.string().required(required) }),
    fullName: yup.object().shape({ value: yup.string().required(required) }),
    dob: yup.object().shape({ value: dateValidator }),
    gender: yup.object().shape({ value: yup.string().required(required) }),
    profilePicture: yup
      .object()
      .shape({ value: yup.string().required(required) }),
  }),
  emergencyData: yup.object().shape({
    emergencyContactName: yup
      .object()
      .shape({ value: yup.string().required(required) }),
    emergencyContactPhoneNumber: yup
      .object()
      .shape({ value: yup.string().required(required) }),
  }),
  addressData: yup.object().shape({
    addressOne: yup.object().shape({ value: yup.string().required(required) }),
    addressCity: yup.object().shape({ value: yup.string().required(required) }),
    addressState: yup
      .object()
      .shape({ value: yup.string().required(required) }),
    addressZip: yup.object().shape({
      value: yup
        .string()
        .min(5, errorMessageMap['minFive'])
        .max(10, errorMessageMap['maxTen'])
        .required(required),
    }),
  }),
  currentAddressData: yup.object().shape({
    currentAddressExists: yup.boolean(),
    currentAddressOne: yup.object().when('currentAddressExists', {
      is: true,
      then: yup.object().shape({ value: yup.string().required(required) }),
    }),
    currentAddressCity: yup.object().when('currentAddressExists', {
      is: true,
      then: yup.object().shape({ value: yup.string().required(required) }),
    }),
    currentAddressState: yup.object().when('currentAddressExists', {
      is: true,
      then: yup.object().shape({ value: yup.string().required(required) }),
    }),
    currentAddressZip: yup.object().when('currentAddressExists', {
      is: true,
      then: yup.object().shape({
        value: yup
          .string()
          .min(5, errorMessageMap['minFive'])
          .max(10, errorMessageMap['maxTen'])
          .required(required),
      }),
    }),
  }),
  identificationData: yup.object().shape({
    ssnNumber: yup.object().shape({
      value: yup
        .string()
        .min(11, errorMessageMap['minEleven'])
        .max(11, errorMessageMap['maxEleven'])
        .required(required),
    }),
    driverLicenseNumber: yup
      .object()
      .shape({ value: yup.string().required(required) }),
    driverLicenseStateIssued: yup
      .object()
      .shape({ value: yup.string().required(required) }),
    driverLicenseExpirationDate: yup.object().shape({ value: dateValidator }),
  }),
});

export const housingAndVehicleSchema = yup.object().shape({
  arrivalData: yup.object().shape({
    expectedArrivalDate: yup.object().shape({ value: dateValidator }),
    tentativeKnockingStartDate: yup.object().shape({ value: dateValidator }),
    tentativeKnockingEndDate: yup.object().shape({ value: dateValidator }),
  }),

  housingData: yup.object().shape({
    repAcknowledgment: yup.bool().required(required),
  }),
  
  hasVehicle: yup.object().shape({
    value: yup.mixed(),
  }),
 

  hasVehicleRef: yup.ref('$hasVehicleRef'),
  vehicleData: yup.mixed().when('hasVehicleRef', {
    is: true,
    then: yup.object().shape({
      vehicleMake: yup.object().shape({
        value: yup.string().required(required),
      }),
      vehicleModel: yup.object().shape({
        value: yup.string().required(required),
      }),
      vehicleColor: yup.object().shape({
        value: yup.string().required(required),
      }),
      vehicleYear: yup.object().shape({
        value: yup.string().required(required),
      }),
      vehiclePlateNumber: yup.object().shape({
        value: yup.string().required(required),
      }),
      vehicleRegistrationState: yup.object().shape({
        value: yup.string().required(required).min(1, errorMessageMap['minOneCount']),
      }),
    }),
  }),
  residentialHistoryData: yup
    .array()
    .min(1, errorMessageMap['minOneCount'])
    .of(
      yup.object().shape({
        addressHistoryName: yup.object().shape({
          value: yup.string().required(required),
        }),
        addressHistoryStartDate: yup.object().shape({
          value: yup.string().required(required),
        }),
        addressHistoryEndDate: yup.object().shape({
          value: yup.string().required(required),
        }),
      })
    ),
});
export const uniformAndSwagSchema = yup.object().shape({
  uniformData: yup.object().shape({
    shirtSize: yup.object().shape({ value: yup.string().required(required) }),
    jacketSize: yup.object().shape({ value: yup.string().required(required) }),
    waistSize: yup.object().shape({ value: yup.string().required(required) }),
    hatSize: yup.object().shape({ value: yup.string().required(required) }),
    shoeSize: yup.object().shape({ value: yup.string().required(required) }),
  }),
});
export const licensingSchema = yup.object().shape({
  licensingPersonalData: yup.object().shape({
    race: yup.object().shape({ value: yup.string().required(required) }),
    height: yup.object().shape({
      feet: yup.object().shape({
        value: yup
          .number('This field must be a number')
          .transform((value) => (isNaN(value) ? undefined : value))
          .max(9, 'This field cannot exceed 9')
          .required(required),
      }),
      inches: yup.object().shape({
        value: yup
          .number('This field must be a number')
          .transform((value) => (isNaN(value) ? undefined : value))
          .max(12, 'This field cannot exceed 12')
          .required(required),
      }),
    }),
    weight: yup.object().shape({
      value: yup
        .number('This field must be a number')
        .transform((value) => (isNaN(value) ? undefined : value))
        .required(required),
    }),
    hairColor: yup.object().shape({ value: yup.string().required(required) }),
    eyeColor: yup.object().shape({ value: yup.string().required(required) }),
    cityOfBirth: yup.object().shape({ value: yup.string().required(required) }),
    stateOfBirth: yup
      .object()
      .shape({ value: yup.string().required(required) }),
  }),
  

  employmentData: yup
    .array()
    .min(3, errorMessageMap['minThreeCount'])
    .of(
      yup.object().shape({
        employerName: yup.object().shape({
          value: yup.string().required(required),
        }),
        employerStartDate: yup.object().shape({
          value: yup.object().shape({ value: dateValidator }).required(required),

        }),
        employerEndDate: yup.object().shape({
          value: yup.object().shape({ value: dateValidator }).required(required),
        }),
      })
    ),
  referenceData: yup
    .array()
    .min(3, errorMessageMap['minThreeCount'])
    .of(
      yup.object().shape({
        referenceName: yup.object().shape({
          value: yup.string().required(required),
        }),
        referenceRelation: yup.object().shape({
          value: yup.string().required(required),
        }),
        referencePhoneNumber: yup.object().shape({
          value: yup.string().required(required),
        }),
      })
    ),
});
export const hrInformationSchema = yup.object().shape({
  passportData: yup.object().shape({
    passportPicture: yup
      .object()
      .shape({ value: yup.string().required(required) }),
  }),
  driverLicenseAndSocialSecurityCardData: yup.object().shape({
    driverLicense: yup
      .object()
      .shape({ value: yup.string().required(required) }),
    socialSecurityCard: yup
      .object()
      .shape({ value: yup.string().required(required) }),
  }),
});
