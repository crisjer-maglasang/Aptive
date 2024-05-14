import {
  YEAR_REGEX,
  FEET_REGEX,
  INCHES_REGEX,
  WEIGHT_REGEX,
  ACCOUNT_NUMBER_REGEX,
  ROUTING_NUMBER_REGEX,
  SSN_MASKED_REGEX,
} from '@/lib/validations';
import { onboardingDataValues, onboardingConstants } from '@/lib/constants';

const {
  DIRECT_DEPOSIT_BANK_NAME,
  DIRECT_DEPOSIT_ACCOUNT_NAME,
  DIRECT_DEPOSIT_ACCOUNT_TYPE,
  DIRECT_DEPOSIT_ROUTING_NUMBER,
  DIRECT_DEPOSIT_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,
  USE_PREVIOUS_W9_NAME,
  REP_EXPERIENCES_DATA_NAME,
  COMPANY_YEARS_SOLD,
  COMPANY_ACCOUNT_NUMBERS,
  COMPANY_NAME,
  LAST_INDUSTRY_NAME,
  LAST_INDUSTRY_OTHER_NAME,
  I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME,
  DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME,
} = onboardingConstants;

const { STATE_OTHER_VALUE, LAST_INDUSTRY_OTHER_VALUE } = onboardingDataValues;

export const lengthValidation = (value, num = 0, maxNum = null) => {
  if (maxNum) {
    return value?.toString().length > num && value?.toString().length <= maxNum;
  } else {
    return value?.toString().length > num;
  }
};

export const regexValidation = (value, regex) => {
  try {
    return value && value?.toString().match(regex);
  } catch (err) {
    console.error(err);
  }
};

export const dependantValidation = (
  value,
  dataField,
  comparingValue,
  minNum,
  maxNum,
  regex,
) => {
  if (dataField === comparingValue) {
    if (regex) {
      return regexValidation(value, regex);
    }

    return lengthValidation(value, minNum, maxNum);
  } else {
    return true;
  }
};

export const employmentValidation = (value, requiredEntries) => {
  const result = [];

  value?.forEach(({ employerName, employerStartDate, employerEndDate }) => {
    result.push(lengthValidation(employerName?.trim(), 1, 255));
    result.push(employerStartDate <= employerEndDate);
  });

  return (
    value?.length >= requiredEntries && result.every((val) => val === true)
  );
};

export const referencesValidation = (value, requiredEntries) => {
  const result = [];

  value?.forEach( ({ referenceName, referenceRelation, referencePhoneNumber }) => {
    result.push(lengthValidation(referenceName?.trim(), 1, 255));
    result.push(lengthValidation(referenceRelation?.trim(), 1, 255));
    result.push(lengthValidation(referencePhoneNumber, 13, 14));
  });

  return (
    value?.length >= requiredEntries && result.every((val) => val === true)
  );
};

export const experiencesValidation = (value) => {
  const result = [];

  value?.forEach(({
    [COMPANY_ACCOUNT_NUMBERS]: numberOfAccounts,
    [COMPANY_YEARS_SOLD]: companyYearsSold,
    [COMPANY_NAME]: companyName,
    [LAST_INDUSTRY_NAME]: lastIndustry,
    [LAST_INDUSTRY_OTHER_NAME]: lastIndustryOther,
  }) => {
    result.push(Number.isInteger(parseFloat(numberOfAccounts)));
    result.push(Number.isInteger(parseFloat(companyYearsSold)));
    result.push(lengthValidation(companyName?.trim(), 1, 255));
    result.push(dependantValidation(lastIndustryOther?.trim(), lastIndustry, LAST_INDUSTRY_OTHER_VALUE, 1, 50));
  });

  return (
    result.every((val) => val === true)
  );
};

export const  validatePersonalInfo = (data) => {
  const schema = {
    'First Name': (value) => lengthValidation(value, 1, 255),
    'Last Name': (value) => lengthValidation(value, 1, 255),
    'Full legal name': (value) => lengthValidation(value, 1, 255),
    'Badge Photo': (value) => lengthValidation(value, 1, 255),
    'Date of Birth': (value) => lengthValidation(value, 2),
    Gender: (value) => lengthValidation(value, 2),
    Experience: (value) => lengthValidation(value),
    'Phone number': (value) => lengthValidation(value, 13),
    'Emergency Contact Name': (value) => lengthValidation(value, 1, 255),
    'Marital Status': (value) => lengthValidation(value),
    'Spouse First Name': (value) =>
      dependantValidation(value, data?.isMarried, 'Married', 1, 255),
    'Spouse Last Name': (value) =>
      dependantValidation(value, data?.isMarried, 'Married', 1, 255),
    'Emergency Contact Phone Number': (value) => lengthValidation(value, 13),
    'Mailing Address': (value) => lengthValidation(value, 1, 255),
    'Mailing Address City': (value) => lengthValidation(value, 1, 255),
    'Mailing Address State': (value) => lengthValidation(value, 1),
    'Mailing Address Zip': (value) => lengthValidation(value, 4, 10),
    'Mailing Address Country': (value) => lengthValidation(value, 0),
    'Current address differs': (value) => lengthValidation(value),
    'Current Street Address': (value) =>
      dependantValidation(value, data.isDifferentAddress, 'yes', 1, 255),
    'Current Address City': (value) =>
      dependantValidation(value, data.isDifferentAddress, 'yes', 1, 255),
    'Current Address State': (value) =>
      dependantValidation(value, data.isDifferentAddress, 'yes', 1),
    'Current Address Zip': (value) =>
      dependantValidation(value, data.isDifferentAddress, 'yes', 4, 10),
    'SSN': (value) => regexValidation(value, SSN_MASKED_REGEX),
    'Current Address Country': (value) =>
      dependantValidation(value, data.isDifferentAddress, 'yes', 0),
    'Drivers license number': (value) => lengthValidation(value, 1, 20),
    'Drivers license state': (value) => lengthValidation(value, 1),
    'Drivers license country': (value) => lengthValidation(value),
    'Drivers license expiration date': (value) => lengthValidation(value),
  };

  const info = {
    'First Name': data.firstName?.trim(),
    'Last Name': data.lastName?.trim(),
    'Full legal name': data.fullName?.trim(),
    'Badge Photo': data.profilePicture,
    'Date of Birth': data.dob,
    Gender: data.gender,
    Experience: data.experience,
    'Phone number': data.mobile,
    'Marital Status': data.isMarried,
    'Spouse First Name': data.spouseFirstName?.trim(),
    'Spouse Last Name': data.spouseLastName?.trim(),
    'Emergency Contact Name': data.emergencyContactName?.trim(),
    'Emergency Contact Phone Number': data.emergencyContactPhoneNumber,
    'Mailing Address': data.addressOne?.trim(),
    'Mailing Address City': data.addressCity?.trim(),
    'Mailing Address State': data.addressState,
    'Mailing Address Zip': data.addressZip,
    'Mailing Address Country': data.addressCountry,
    'Current address differs': data.isDifferentAddress,
    'Current Street Address': data.currentAddressOne?.trim(),
    'Current Address City': data.currentAddressCity?.trim(),
    'Current Address State': data.currentAddressState,
    'Current Address Zip': data.currentAddressZip,
    'Current Address Country': data.currentAddressCountry,
    SSN: data.ssnNumber,
    'Drivers license number': data.driverLicenseNumber?.trim(),
    'Drivers license state': data.driverLicenseStateIssued,
    'Drivers license country': data.driverLicenseCountryIssued,
    'Drivers license expiration date': data.driverLicenseExpirationDate,
  };

  const validate = (data, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](data[key]))
      .map((key) => ({
        errorName: `${key} is missing or has invalid value`,
      }));

  const errors = validate(info, schema);

  return {
    personalInfoIsValid: !errors.length,
    personalInfoErrors: errors,
  };
};

export const validateHousingInfo = (data) => {
  const schema = {
    'Expected Arrival Date': (value) => lengthValidation(value),
    'Tentative Knocking Start': (value) => lengthValidation(value),
    'Tentative Knocking End': (value) => lengthValidation(value),
    'Needs Housing': (value) => lengthValidation(value),
    'Rep Acknowledgment': (value) => {
      if (data?.needsHousing === 'no') {
        return true;
      } else {
        return value && value === true;
      }
    },
    'Residential Address': (value) => lengthValidation(value, 1, 255),
    'Residential Start Date': (value) => lengthValidation(value),
    'Residential End Date': (value) => lengthValidation(value),
    'Vehicle Status': (value) => lengthValidation(value),
    'Segway Status': (value) => lengthValidation(value),
    'Vehicle Model/Make': (value) =>
      dependantValidation(value, data.hasVehicle, 'yes', 1, 255),
    'Vehicle Color': (value) =>
      dependantValidation(value, data.hasVehicle, 'yes', 1),
    'Vehicle Year': (value) =>
      dependantValidation(
        value,
        data.hasVehicle,
        'yes',
        null,
        null,
        YEAR_REGEX,
      ),
    'Vehicle License Plate': (value) =>
      dependantValidation(value, data.hasVehicle, 'yes', 1, 255),
    'Vehicle License State': (value) =>
      dependantValidation(value, data.hasVehicle, 'yes'),
    'Vehicle License Country': (value) =>
      dependantValidation(value, data.hasVehicle, 'yes'),
  };

  const info = {
    'Expected Arrival Date': data.expectedArrivalDate,
    'Tentative Knocking Start': data.tentativeKnockingStartDate,
    'Tentative Knocking End': data.tentativeKnockingEndDate,
    'Needs Housing': data.needsHousing,
    'Rep Acknowledgment': data.repAcknowledgment,
    'Residential Address': data.addressHistoryName?.trim(),
    'Residential Start Date': data.addressHistoryStartDate,
    'Residential End Date': data.addressHistoryEndDate,
    'Vehicle Status': data.hasVehicle,
    'Segway Status': data.hasSegway,
    'Vehicle Model/Make': data.vehicleModel?.trim(),
    'Vehicle Color': data.vehicleColor?.trim(),
    'Vehicle Year': data.vehicleYear,
    'Vehicle License Plate': data.vehiclePlateNumber?.trim(),
    'Vehicle License State': data.vehicleRegistrationState?.trim(),
    'Vehicle License Country': data.vehicleRegistrationCountry,
  };

  const validate = (data, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](data[key]))
      .map((key) => ({
        errorName: `${key} is missing or has invalid value`,
      }));

  const errors = validate(info, schema);

  return {
    housingInfoIsValid: !errors.length,
    housingInfoErrors: errors,
  };
};

export const validateUniformInfo = (data) => {
  const schema = {
    'T-Shirt': (value) => lengthValidation(value),
    Jacket: (value) => lengthValidation(value),
    Waist: (value) => lengthValidation(value),
    Hat: (value) => lengthValidation(value),
    'Shoe Size': (value) => lengthValidation(value),
  };

  const info = {
    'T-Shirt': data.shirtSize,
    Jacket: data.jacketSize,
    Waist: data.waistSize,
    Hat: data.hatSize,
    'Shoe Size': data.shoeSize,
  };

  const validate = (data, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](data[key]))
      .map((key) => ({
        errorName: `${key} is missing`,
      }));

  const errors = validate(info, schema);

  return {
    uniformInfoIsValid: !errors.length,
    uniformInfoErrors: errors,
  };
};

export const validateLicensingInfo = (data) => {
  const schema = {
    Race: (value) => lengthValidation(value),
    Feet: (value) => regexValidation(value, FEET_REGEX),
    Inches: (value) => regexValidation(value, INCHES_REGEX),
    Weight: (value) => regexValidation(value, WEIGHT_REGEX),
    'Hair Color': (value) => lengthValidation(value),
    'Eye Color': (value) => lengthValidation(value),
    'Birth City': (value) => lengthValidation(value, 1, 255),
    'Birth State': (value) => lengthValidation(value),
    'Birth Country': (value) => lengthValidation(value),
    'Other State': (value) =>
      dependantValidation(value, data?.stateOfBirth, STATE_OTHER_VALUE, 1, 50),
    'US Citizen': (value) => lengthValidation(value),
    'Visible Scars/Tattoos': (value) => lengthValidation(value),
    'Markings Description': (value) =>
      dependantValidation(value, data?.hasVisibleMarkings, 'yes', 1, 255),
    'Crime Conviction': (value) => lengthValidation(value),
    'Crime Description': (value) =>
      dependantValidation(value, data?.isConvictedOfCrime, 'yes', 1, 255),
    'Sales Experience': (value) => lengthValidation(value),
    'Employment History': (value) => employmentValidation(value, 2),
    References: (value) => referencesValidation(value, 1),
    [REP_EXPERIENCES_DATA_NAME]: (value) => experiencesValidation(value),
    'Driver License Picture': (value) => lengthValidation(value, 1, 255),
    'Signature Picture': (value) => lengthValidation(value),
  };

  const info = {
    Race: data.race,
    Feet: data.feet,
    Inches: data.inches,
    Weight: data.weight,
    'Hair Color': data.hairColor,
    'Eye Color': data.eyeColor,
    'Birth City': data.cityOfBirth?.trim(),
    'Birth State': data.stateOfBirth,
    'Birth Country': data.countryOfBirth,
    'Other State': data.stateOfBirthOther?.trim(),
    'US Citizen': data.isUsCitizen,
    'Visible Scars/Tattoos': data.hasVisibleMarkings,
    'Markings Description': data.markingsDescription?.trim(),
    'Crime Conviction': data.isConvictedOfCrime,
    'Crime Description': data.crimeDescription?.trim(),
    'Employment History': data.employmentData,
    'Sales Experience': data.hasRepExperience,
    References: data.referenceData,
    [REP_EXPERIENCES_DATA_NAME]: data[REP_EXPERIENCES_DATA_NAME],
    'Driver License Picture': data.driverLicense,
    'Signature Picture': data.signature,
  };

  const validate = (data, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](data[key]))
      .map((key) => ({
        errorName: `${key} is missing or has invalid value`,
      }));

  const errors = validate(info, schema);

  return {
    licensingInfoIsValid: !errors.length,
    licensingInfoErrors: errors,
  };
};

export const validateHrInfo = (data, featureFlags) => {
  const {
    [I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME]: isI9DocumentsSectionEnabled,
    [DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME]: isDirectDepositSectionEnabled,
  } = featureFlags;

  const schema = {
    'Uses Type': (value) => value !== '',
    'Passport Picture': (value) =>
      dependantValidation(value, data.usesType, 'passport'),
    'Passport Expiration Date': (value) =>
      dependantValidation(value, data.usesType, 'passport'),
    'Driver License Picture': (value) =>
      dependantValidation(value, data.usesType, 'driverLicenseAndSocial'),
    'Social Security Card Picture': (value) =>
      dependantValidation(value, data.usesType, 'driverLicenseAndSocial'),
    // 'Signature Picture': (value) => lengthValidation(value),
    'WOTC Survey': (value) => value === true,
    'W-9': (value) => value === true,
    ...(isI9DocumentsSectionEnabled && {
      'I-9': (value) => value === true,
    }),
    ...(isDirectDepositSectionEnabled && {
      'Bank Name': (value) => lengthValidation(value?.trim(), 1, 50),
      'Bank Account Name': (value) => lengthValidation(value?.trim(), 1, 50),
      'Routing Number': (value) =>
        regexValidation(value, ROUTING_NUMBER_REGEX),
      'Account Number': (value) =>
        regexValidation(value, ACCOUNT_NUMBER_REGEX),
      'Confirm Account Number': (value) =>
        value === data[DIRECT_DEPOSIT_ACCOUNT_NUMBER],
    }),
  };

  const info = {
    'Uses Type': data.usesType,
    'Passport Picture': data.passportPicture,
    'Passport Expiration Date': data.passportExpirationDate,
    'Driver License Picture': data.driverLicense,
    'Social Security Card Picture': data.socialSecurityCard,
    // 'Signature Picture': data.signature,
    'WOTC Survey': data.wotcSurveyCompleted,
    'W-9': data.w9Completed || data.w9Submitted || data[USE_PREVIOUS_W9_NAME],
    'I-9': data.i9Completed || data.i9Submitted,
    'Bank Name': data[DIRECT_DEPOSIT_BANK_NAME],
    'Bank Account Name': data[DIRECT_DEPOSIT_ACCOUNT_NAME],
    'Account Type': data[DIRECT_DEPOSIT_ACCOUNT_TYPE],
    'Routing Number': data[DIRECT_DEPOSIT_ROUTING_NUMBER],
    'Account Number': data[DIRECT_DEPOSIT_ACCOUNT_NUMBER],
    'Confirm Account Number': data[DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER],
  };

  const validate = (data, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](data[key]))
      .map((key) => ({
        errorName: `${key} is missing or has invalid value`,
      }));

  const errors = validate(info, schema);

  return {
    hrInfoIsValid: !errors.length,
    hrInfoErrors: errors,
  };
};
