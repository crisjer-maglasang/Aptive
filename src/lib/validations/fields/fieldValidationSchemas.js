import * as yup from 'yup';
import { errorMessageMap } from './maps';
const required = errorMessageMap['required'];

// needs update
const dateValidator = yup.string().required(required);

export const onboardingOnChangeFieldLevelValidationSchemas = {
  gender: yup.object().shape({
    gender: yup.string().required(required),
  }),

  addressState: yup.object().shape({
    addressState: yup.string().required(required),
  }),

  currentAddressState: yup.object().shape({
    currentAddressState: yup.string().required(required),
  }),

  driverLicenseStateIssued: yup.object().shape({
    driverLicenseStateIssued: yup.string().required(required),
  }),

  residentialHistoryData: {
    addressHistoryStartDate: yup.object().shape({
      addressHistoryStartDate: yup.string().required(required),
    }),
    addressHistoryEndDate: yup.object().shape({
      addressHistoryEndDate: yup.string().required(required),
    }),
  },

  employmentData: {
    employerStartDate: yup.object().shape({
      employerStartDate: dateValidator.required(required),
    }),
    employerEndDate: yup.object().shape({
      employerEndDate: dateValidator.required(required),
    }),
  },
};

export const onboardingOnBlurFieldLevelValidationSchemas = {
  residentialHistoryData: {
    addressHistoryName: yup.object().shape({
      addressHistoryName: yup.string().required(required),
    }),
    addressHistoryStartDate: yup.object().shape({
      addressHistoryStartDate: yup.string().required(required),
    }),
    addressHistoryEndDate: yup.object().shape({
      addressHistoryEndDate: yup.string().required(required),
    }),
  },

  referenceData: {
    referenceName: yup.object().shape({
      referenceName: yup.string().required(required),
    }),
    referenceRelation: yup.object().shape({
      referenceRelation: yup.string().required(required),
    }),
    referencePhoneNumber: yup.object().shape({
      referencePhoneNumber: yup
        .string()
        .min(15, errorMessageMap['elevenDig'])
        .required(required),
    }),
  },

  employmentData: {
    employerName: yup.object().shape({
      employerName: yup.string().required(required),
    }),
    employerStartDate: yup.object().shape({
      employerStartDate: dateValidator.required(required),
    }),
    employerEndDate: yup.object().shape({
      employerEndDate: dateValidator.required(required),
    }),
  },

  firstName: yup.object().shape({
    firstName: yup.string().required(required),
  }),

  lastName: yup.object().shape({
    lastName: yup.string().required(required),
  }),

  fullName: yup.object().shape({
    fullName: yup.string().required(required),
  }),

  dob: yup.object().shape({
    dob: dateValidator,
  }),
  gender: yup.object().shape({
    gender: yup.string().required(required),
  }),

  emergencyContactName: yup.object().shape({
    emergencyContactName: yup.string().required(required),
  }),

  emergencyContactPhoneNumber: yup.object().shape({
    emergencyContactPhoneNumber: yup
      .string()
      .min(15, errorMessageMap['elevenDig'])
      .required(required),
  }),

  addressOne: yup.object().shape({
    addressOne: yup.string().required(required),
  }),

  addressCity: yup.object().shape({
    addressCity: yup.string().required(required),
  }),

  addressState: yup.object().shape({
    addressState: yup.string().required(required),
  }),

  addressZip: yup.object().shape({
    addressZip: yup
      .string()
      .min(5, errorMessageMap['minFive'])
      .max(10, errorMessageMap['maxTen'])
      .required(required),
  }),

  currentAddressOne: yup.object().shape({
    currentAddressOne: yup.string().required(required),
  }),

  currentAddressCity: yup.object().shape({
    currentAddressCity: yup.string().required(required),
  }),

  currentAddressState: yup.object().shape({
    currentAddressState: yup.string().required(required),
  }),

  currentAddressZip: yup.object().shape({
    currentAddressZip: yup
      .string()
      .min(5, errorMessageMap['minFive'])
      .max(10, errorMessageMap['maxTen'])
      .required(required),
  }),

  ssnNumber: yup.object().shape({
    ssnNumber: yup.string().required(required),
  }),

  driverLicenseNumber: yup.object().shape({
    driverLicenseNumber: yup.string().required(required),
  }),

  driverLicenseStateIssued: yup.object().shape({
    driverLicenseStateIssued: yup.string().required(required),
  }),

  driverLicenseExpirationDate: yup.object().shape({
    driverLicenseExpirationDate: dateValidator,
  }),

  expectedArrivalDate: yup.object().shape({
    expectedArrivalDate: dateValidator,
  }),

  tentativeKnockingStartDate: yup.object().shape({
    tentativeKnockingStartDate: dateValidator,
  }),

  tentativeKnockingEndDate: yup.object().shape({
    tentativeKnockingEndDate: dateValidator,
  }),

  repAcknowledgment: yup.object().shape({
    repAcknowledgment:yup.bool().required(required),
  }),

  roommateRequest: yup.object().shape({
    roommateRequest: yup.string(),
  }),

  vehicleMake: yup.object().shape({
    vehicleMake: yup.string().required(required),
  }),

  vehicleModel: yup.object().shape({
    vehicleModel: yup.string().required(required),
  }),

  vehicleColor: yup.object().shape({
    vehicleColor: yup.string().required(required),
  }),

  vehicleYear: yup.object().shape({
    vehicleYear: yup.string().required(required),
  }),

  vehiclePlateNumber: yup.object().shape({
    vehiclePlateNumber: yup.string().required(required),
  }),

  vehicleRegistrationState: yup.object().shape({
    vehicleRegistrationState: yup.string().required(required),
  }),

  shirtSize: yup.object().shape({
    shirtSize: yup.string().required(required),
  }),

  jacketSize: yup.object().shape({
    jacketSize: yup.string().required(required),
  }),

  waistSize: yup.object().shape({
    waistSize: yup.string().required(required),
  }),

  hatSize: yup.object().shape({
    hatSize: yup.string().required(required),
  }),

  shoeSize: yup.object().shape({
    shoeSize: yup.string().required(required),
  }),

  race: yup.object().shape({
    race: yup.string().required(required),
  }),

  feet: yup.object().shape({
    feet: yup
      .number('This field must be a number')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(9, 'This field cannot exceed 9')
      .required(required),
  }),

  inches: yup.object().shape({
    inches: yup
      .number('This field must be a number')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(12, 'This field cannot exceed 12')
      .required(required),
  }),

  weight: yup.object().shape({
    weight: yup.string().required(required),
  }),

  hairColor: yup.object().shape({
    hairColor: yup.string().required(required),
  }),

  eyeColor: yup.object().shape({
    eyeColor: yup.string().required(required),
  }),

  cityOfBirth: yup.object().shape({
    cityOfBirth: yup.string().required(required),
  }),

  stateOfBirth: yup.object().shape({
    stateOfBirth: yup.string().required(required),
  }),

  phoneNumber: yup.object().shape({
    phoneNumber: yup
      .string()
      .min(15, errorMessageMap['elevenDig'])
      .required(required),
  }),
};
