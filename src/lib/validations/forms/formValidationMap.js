import {
  personalDataSchema,
  housingAndVehicleSchema,
  uniformAndSwagSchema,
  licensingSchema,
  hrInformationSchema,
} from '.';

export const formValidationMap = {
  personalData: personalDataSchema,
  housingAndVehicleData: housingAndVehicleSchema,
  uniformAndSwagData: uniformAndSwagSchema,
  licensingData: licensingSchema,
  hrInformationData: hrInformationSchema,
};
