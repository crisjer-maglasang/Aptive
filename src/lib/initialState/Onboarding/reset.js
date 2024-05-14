import { onboardingConstants, onboardingDataValues,  } from '@/lib/constants';
import {
  usesPassportRadioConfig,
} from '@/lib/configs';

const {
  IS_MARRIED,
  SPOUSE_FIRST_NAME,
  SPOUSE_LAST_NAME,
  IS_CURRENT_ADDRESS_DIFFER,
  CURRENT_ADDRESS_ONE,
  CURRENT_ADDRESS_CITY,
  CURRENT_ADDRESS_STATE,
  CURRENT_ADDRESS_ZIP,
  NEEDS_HOUSING,
  HOUSING_TYPE,
  NUM_OF_ROOMS,
  ROOMMATE_REQUEST,
  REP_ACKNOWLEDGMENT,
  HAS_VEHICLE,
  VEHICLE_MODEL,
  VEHICLE_COLOR,
  VEHICLE_YEAR,
  VEHICLE_PLATE_NUMBER,
  VEHICLE_REGISTRATION_STATE,
  HAS_VISIBLE_MARKINGS,
  IS_CONVICTED_OF_CRIME,
  HAS_REP_EXPERIENCE,
  COMPANY_NAME,
  COMPANY_ACCOUNT_NUMBERS,
  COMPANY_YEARS_SOLD,
  PASSPORT_PICTURE,
  SOCIAL_SECURITY_CARD,
  PASSPORT_PICTURE_LOCAL_FILE,
  SOCIAL_SECURITY_PICTURE_LOCAL_FILE,
  USES_TYPE,
  CRIME_DESCRIPTION_NAME,
  MARKINGS_DESCRIPTION_NAME,
  ADDRESS_COUNTRY,
  ADDRESS_STATE,
  CURRENT_ADDRESS_COUNTRY,
  DRIVER_LICENSE_COUNTRY_ISSUED,
  DRIVER_LICENSE_STATE_ISSUED,
  VEHICLE_REGISTRATION_COUNTRY,
  COUNTRY_OF_BIRTH,
  STATE_OF_BIRTH,
} = onboardingConstants;

const {
  STATE_OTHER_VALUE,
  COUNTRY_OTHER_VALUE,
} = onboardingDataValues;

export const defaultMarriageInfo = {
  [SPOUSE_FIRST_NAME]: '',
  [SPOUSE_LAST_NAME]: '',
};

export const defaultCurrentAddressInfo = {
  [CURRENT_ADDRESS_ONE]: '',
  [CURRENT_ADDRESS_CITY]: '',
  [CURRENT_ADDRESS_STATE]: '',
  [CURRENT_ADDRESS_ZIP]: '',
  [CURRENT_ADDRESS_COUNTRY]: '',
};

export const defaultVehicleInfo = {
  [VEHICLE_MODEL]: '',
  [VEHICLE_COLOR]: '',
  [VEHICLE_YEAR]: '',
  [VEHICLE_PLATE_NUMBER]: '',
  [VEHICLE_REGISTRATION_STATE]: '',
};

export const defaultHousingInfo = {
  [HOUSING_TYPE]: '',
  [NUM_OF_ROOMS]: null,
  [ROOMMATE_REQUEST]: '',
  [REP_ACKNOWLEDGMENT]: false,
}

export const defaultRepExperienceInfo = {
  [COMPANY_NAME]: '',
  [COMPANY_ACCOUNT_NUMBERS]: '',
  [COMPANY_YEARS_SOLD]: '',
};

export const defaultMarkingsInfo = {
  [MARKINGS_DESCRIPTION_NAME]: '',
};

export const defaultCrimeInfo = {
  [CRIME_DESCRIPTION_NAME]: '',
};

export const defaultPassportInfo = {
  [PASSPORT_PICTURE]: '',
  [PASSPORT_PICTURE_LOCAL_FILE]: '',
};

export const defaultSocialInfo = {
  [SOCIAL_SECURITY_CARD]: '',
  [SOCIAL_SECURITY_PICTURE_LOCAL_FILE]: ''
};

export const defaultAddressState = {
  [ADDRESS_STATE]: '',
};

export const defaultCurrentAddressState = {
  [CURRENT_ADDRESS_STATE]: '',
};

export const defaultDriverLicenseIssuedState = {
  [DRIVER_LICENSE_STATE_ISSUED]: '',
};

export const defaultVehicleState = {
  [VEHICLE_REGISTRATION_STATE]: '',
};

export const defaultStateOfBirth = {
  [STATE_OF_BIRTH]: '',
};

export const defaultOtherStateOfBirth = {
  [STATE_OF_BIRTH]: STATE_OTHER_VALUE,
};

export const partialDefaultData = {
  [IS_MARRIED]: defaultMarriageInfo,
  [NEEDS_HOUSING]: defaultHousingInfo,
  [IS_CURRENT_ADDRESS_DIFFER]: defaultCurrentAddressInfo,
  [HAS_VEHICLE]: defaultVehicleInfo,
  [HAS_REP_EXPERIENCE]: defaultRepExperienceInfo,
  [HAS_VISIBLE_MARKINGS]: defaultMarkingsInfo,
  [IS_CONVICTED_OF_CRIME]: defaultCrimeInfo,
  [ADDRESS_COUNTRY]: defaultAddressState,
  [CURRENT_ADDRESS_COUNTRY]: defaultCurrentAddressState,
  [DRIVER_LICENSE_COUNTRY_ISSUED]: defaultDriverLicenseIssuedState,
  [VEHICLE_REGISTRATION_COUNTRY]: defaultVehicleState,
  [COUNTRY_OF_BIRTH]: defaultStateOfBirth,
};

export const resetOnboardingSectionData = (name, value, reset) => {
  let newValue;

  switch (true) {
    case name === IS_MARRIED:
    case name === IS_CURRENT_ADDRESS_DIFFER:
    case name === NEEDS_HOUSING:
    case name === HAS_VEHICLE:
    case name === HAS_REP_EXPERIENCE:
    case name === HAS_VISIBLE_MARKINGS:
    case name === IS_CONVICTED_OF_CRIME:
    case name === ADDRESS_COUNTRY:
    case name === CURRENT_ADDRESS_COUNTRY:
    case name === DRIVER_LICENSE_COUNTRY_ISSUED:
    case name === VEHICLE_REGISTRATION_COUNTRY:
    case name === COUNTRY_OF_BIRTH && value !== COUNTRY_OTHER_VALUE:
      newValue = partialDefaultData[name];
      break;
    case name === COUNTRY_OF_BIRTH && value === COUNTRY_OTHER_VALUE:
      newValue = defaultOtherStateOfBirth;
      break;
    case name === USES_TYPE && value === usesPassportRadioConfig[0].value:
      newValue = defaultSocialInfo;
      break;
    case name === USES_TYPE && value === usesPassportRadioConfig[1].value:
      newValue = defaultPassportInfo;
      break;
    default:
      return;
  }

  if (newValue) {
    Object.entries(newValue).forEach(([name, value]) => {
      reset(name, value);
    });
  }
};
