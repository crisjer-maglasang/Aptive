import { formatPostalCode, formatDate, formatPhone } from '@/lib/utils';
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
  SOURCE_OF_DISCOVERY_NAME,
  CURRENT_SITUATION_NAME,
  LAST_INDUSTRY_OTHER_NAME,
  CUSTOMER_FACING_PHONE_NUMBER_NAME,
} = onboardingConstants;

export const parseRepExperiences = (data) => {
  return data?.map((item) => ({
    setId: `${item.id}`,
    id: item.id,
    [COMPANY_YEARS_SOLD]: item?.['years_sold'] ? item['years_sold'] : '',
    [COMPANY_ACCOUNT_NUMBERS]: item?.['number_of_accounts'] ? item['number_of_accounts'] : '',
    [COMPANY_NAME]: item?.['sales_company'] ? item['sales_company'] : '',
    [LAST_INDUSTRY_NAME]: item?.['last_industry'] ? item['last_industry'] : '',
    [LAST_INDUSTRY_OTHER_NAME]: item?.['last_industry_other'] ? item['last_industry_other'] : '',
  }));
};

export const normalizeIncomingData = (data) => {
  const placeholderArr = ['', ''];
  const height = data?.['height'] ? data['height'].match(/\d+/g) : placeholderArr;
  const formattedMainZip = data?.['permanent_zip']
    ? formatPostalCode(data?.['permanent_zip'])
    : '';
  const formattedCurrentZip = data?.['zip']
    ? formatPostalCode(data?.['zip'])
    : '';

  const parseEmployment = (data) => {
    return data?.map((item) => ({
      setId: `${item.id}`,
      id: item.id,
      employerName: item?.['employer'] ? item['employer'] : '',
      employerStartDate: item?.['service_from'] ? formatDate(item['service_from']) : '',
      employerEndDate: item?.['service_to'] ? formatDate(item['service_to']) : '',
    }));
  };

  const parseReferences = (data) => {
    return data?.map((item) => ({
      setId: `${item.id}`,
      id: item.id,
      referenceName: item?.['name'] ? item['name'] : '',
      referenceRelation: item?.['relation'] ? item['relation'] : '',
      referencePhoneNumber: item?.['phone'] ? formatPhone(item['phone']) : '',
    }));
  };

  const employmentHistory = data?.['employment']
    ? parseEmployment(data['employment'])
    : [];

  const referencesHistory = data?.['references']
    ? parseReferences(data['references'])
    : [];

  const experiences = data?.['experiences']
    ? parseRepExperiences(data['experiences'])
    : [];

  return {
    userId: data?.['user_id'] ? data?.['user_id'] : '',
    repId: data?.['id'] ? data?.['id'] : '', // TODO: seems not to be in use as of now. See normalizeIncomingData() call in src/redux/reps/sagas.js::requestRepAsContactSaga()
    recruitId: data?.['recruit_id'] ? data?.['recruit_id'] : '',

    onboarded: Boolean(data?.['onboarded']),
    isReadyToSubmit: Boolean(data?.['is_ready_to_submit']),
    submitted: Boolean(data?.['is_submitted']),
    approved: Boolean(data?.['is_approved']),

    // Personal Info

    firstName: data?.['first_name'] ? data['first_name'] : '',
    lastName: data?.['last_name'] ? data['last_name'] : '',
    fullName: data?.['preferred_name'] ? data['preferred_name'] : '',
    dob: data?.['dob'] ? formatDate(data?.['dob']) : '',
    gender: data?.['gender'] ? data['gender'] : '',
    experience: data?.['experience'] ? data['experience'].toString() : '',
    mobile: data?.['mobile'] ? formatPhone(data['mobile']) : '',
    [CUSTOMER_FACING_PHONE_NUMBER_NAME]: data?.['customer_facing_mobile'] ? formatPhone(data['customer_facing_mobile']) : '',
    profilePicture: data?.['profilePicture'] ? data['profilePicture'] : '',
    isMarried: data?.['marital_status'] ? data['marital_status'] : '',
    upfrontPay: data?.['upfront_pay'] ? String(data['upfront_pay']) : '0',
    rentDeduction: data?.['rent_deduction'] ? String(data['rent_deduction'].toFixed(2)) : '0.00',
    uniformDeduction: data?.['uniform_deduction'] ? String(data['uniform_deduction']) : '0',
    rentNote: '',
    spouseFirstName: data?.['spouse_name'] ? data['spouse_name'] : '',
    spouseLastName: data?.['spouse_last_name'] ? data['spouse_last_name'] : '',
    emergencyContactName: data?.['emergency_contact_name']
      ? data['emergency_contact_name']
      : '',
    emergencyContactPhoneNumber: data?.['emergency_phone_number']
      ? formatPhone(data['emergency_phone_number'])
      : '',
    addressOne: data?.['permanent_address'] ? data['permanent_address'] : '',
    addressCity: data?.['permanent_city'] ? data['permanent_city'] : '',
    addressState: data?.['permanent_state'] ? data['permanent_state'] : '',
    addressZip: formattedMainZip,
    addressCountry: String(data?.['permanent_country'] ?? ''),
    isDifferentAddress: data?.['is_different_address']
      ? data['is_different_address']
      : '',
    currentAddressOne: data?.['address1'] ? data['address1'] : '',
    currentAddressCity: data?.['city'] ? data['city'] : '',
    currentAddressState: data?.['state'] ? data['state'] : '',
    currentAddressZip: formattedCurrentZip,
    currentAddressCountry: String(data?.['country'] ?? ''),
    ssnNumber: data?.['ss'] ? data['ss'] : '',
    driverLicenseNumber: data?.['drivers_license_number']
      ? data['drivers_license_number']
      : '',
    driverLicenseStateIssued: data?.['state_issued']
      ? data['state_issued']
      : '',
    driverLicenseCountryIssued: String(data?.['country_issued'] ?? ''),
    driverLicenseExpirationDate: data?.['drivers_license_expiration_date']
      ? formatDate(data['drivers_license_expiration_date'])
      : '',
    facebookLink: data?.['facebook_username'] ?? '',
    linkedinLink: data?.['linkedin_username'] ?? '',
    twitterLink: data?.['twitter_username'] ?? '',
    instagramLink: data?.['instagram_username'] ?? '',

    // Housing and Vehicle

    expectedArrivalDate: data?.['arrival_date']
      ? formatDate(data?.['arrival_date'])
      : '',
    tentativeKnockingStartDate: data?.['start_date']
      ? formatDate(data?.['start_date'])
      : '',
    tentativeKnockingEndDate: data?.['end_date']
      ? formatDate(data?.['end_date'])
      : '',
    actualStartDate: data?.['actual_start_date']
      ? formatDate(data?.['actual_start_date'])
      : '',
    actualEndDate: data?.['actual_end_date']
      ? formatDate(data?.['actual_end_date'])
      : '',
    needsHousing: data?.['rent_situation'] ? data['rent_situation'] : '',
    housingType: String(data?.['apartment_status_id'] ?? ''),
    numOfRooms: data?.['no_of_rooms']
      ? data['no_of_rooms']
      : 1,
    roommateRequest: data?.['roommate_request'] ? data['roommate_request'] : '',
    repAcknowledgment: data?.['rep_acknowledgment']
      ? data['rep_acknowledgment']
      : false,
    addressHistoryName: data?.['resident_address']
      ? data['resident_address']
      : '',
    addressHistoryStartDate: data?.['resident_from'] ? formatDate(data['resident_from']) : '',
    addressHistoryEndDate: data?.['resident_to'] ? formatDate(data['resident_to']) : '',
    hasVehicle: data?.['is_personal_vehicle']
      ? data['is_personal_vehicle']
      : '',
    vehicleModel: data?.['vehicle_model'] ? data['vehicle_model'] : '',
    vehicleColor: data?.['vehicle_color'] ? data['vehicle_color'] : '',
    vehicleYear: data?.['purchase_year'] ? data['purchase_year'] : '',
    vehiclePlateNumber: data?.['license_plate_number']
      ? data['license_plate_number']
      : '',
    vehicleRegistrationState: data?.['license_state']
      ? data['license_state']
      : '',
    vehicleRegistrationCountry: String(data?.['license_country'] ?? ''),
    hasSegway: data?.['has_segway'] ? data['has_segway'] : '',

    // Uniform

    shirtSize: data?.['polo_shirt_size'] ? data['polo_shirt_size'] : '',
    jacketSize: data?.['jacket_size'] ? data['jacket_size'] : '',
    waistSize: data?.['waist_size'] ? data['waist_size'] : '',
    hatSize: data?.['hat_size'] ? data['hat_size'] : '',
    shoeSize: data?.['shoe_size'] ? data['shoe_size'] : '',

    // Licensing

    race: data?.['ethnicity'] ? data['ethnicity'] : '',
    feet: height[0],
    inches: height[1],
    weight: data?.['weight'] ? data['weight'] : '',
    hairColor: data?.['hair_color'] ? data['hair_color'] : '',
    eyeColor: data?.['eye_color'] ? data['eye_color'] : '',
    cityOfBirth: data?.['place_of_birth'] ? data['place_of_birth'] : '',
    stateOfBirth: data?.['birth_state'] ? data['birth_state'] : '',
    countryOfBirth: String(data?.['birth_country'] ?? ''),
    stateOfBirthOther: data?.['other_birth_state'] ? data['other_birth_state'] : '',
    isUsCitizen: data?.['is_us_citizen'] ? data['is_us_citizen'] : '',
    hasVisibleMarkings: data?.['has_visible_markings'] ? data['has_visible_markings'] : '',
    markingsDescription: data?.['visible_markings_reason'] ? data['visible_markings_reason'] : '',
    isConvictedOfCrime: data?.['is_crime'] ? data['is_crime'] : '',
    crimeDescription: data?.['crime_description'] ? data['crime_description'] : '',
    hasRepExperience: (data?.['is_switchover'] || [0, 1].includes(data?.['is_switchover']))
      ? data['is_switchover'].toString()
      : '',
    [CURRENT_SITUATION_NAME]: data?.[CURRENT_SITUATION_NAME] ? data[CURRENT_SITUATION_NAME] : '',
    [SOURCE_OF_DISCOVERY_NAME]: data?.[SOURCE_OF_DISCOVERY_NAME] ? data[SOURCE_OF_DISCOVERY_NAME] : '',
    [REP_EXPERIENCES_DATA_NAME]: experiences,
    employmentData: employmentHistory,
    referenceData: referencesHistory,
    signature: data?.['signaturePicture'] ? data['signaturePicture'] : '',

    // HR

    passportPicture: data?.['passportPicture'] ? data['passportPicture'] : '',
    passportExpirationDate: data?.['passport_expiration_date']
      ? formatDate(data['passport_expiration_date'])
      : '',
    driverLicense: data?.['driverLicensePicture']
      ? data['driverLicensePicture']
      : '',
    socialSecurityCard: data?.['socialSecurityCardPicture']
      ? data['socialSecurityCardPicture']
      : '',
    usesType: data?.['passportPicture']
      ? onboardingDataValues.PASSPORT_VALUE
      : data?.['socialSecurityCardPicture'] || data?.['socialSecurityCardPicture']
        ? onboardingDataValues.DL_AND_SOCIAL_VALUE
        : '',
    wotcSurveyCompleted: data?.['wotcSurveyCompleted'] ? data['wotcSurveyCompleted'] : false,
    w9Completed: data?.['w9_completed'] ? data['w9_completed'] : '',
    w9EnvelopeSent: data?.['w9EnvelopeSent'] ? data['w9EnvelopeSent'] : false,
    w9Clicked: !!data?.['w9EnvelopeSent'] || !!data?.['w9_completed'],
    w9Submitted: !!data?.['w9Picture'],
    previousW9Exists: !!data?.['previousW9Exists'],
    [USE_PREVIOUS_W9_NAME]: !!data?.[USE_PREVIOUS_W9_NAME],
    i9Completed: !!data?.['i9_completed'],
    i9EnvelopeSent: !!data?.['i9EnvelopeSent'],
    i9Clicked: !!data?.['i9EnvelopeSent'] || !!data?.['i9_completed'],
    i9Submitted: !!data?.['i9Picture'],

    [DIRECT_DEPOSIT_BANK_NAME]: data?.[DIRECT_DEPOSIT_BANK_NAME] ? data[DIRECT_DEPOSIT_BANK_NAME] : '',
    [DIRECT_DEPOSIT_ACCOUNT_NAME]: data?.[DIRECT_DEPOSIT_ACCOUNT_NAME] ? data[DIRECT_DEPOSIT_ACCOUNT_NAME] : '',
    [DIRECT_DEPOSIT_ACCOUNT_TYPE]: data?.[DIRECT_DEPOSIT_ACCOUNT_TYPE] ? data[DIRECT_DEPOSIT_ACCOUNT_TYPE] : '',
    [DIRECT_DEPOSIT_ROUTING_NUMBER]: data?.[DIRECT_DEPOSIT_ROUTING_NUMBER] ? data[DIRECT_DEPOSIT_ROUTING_NUMBER] : '',
    [DIRECT_DEPOSIT_ACCOUNT_NUMBER]: data?.[DIRECT_DEPOSIT_ACCOUNT_NUMBER] ? data[DIRECT_DEPOSIT_ACCOUNT_NUMBER] : '',
    [DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER]: data?.[DIRECT_DEPOSIT_ACCOUNT_NUMBER] ? data[DIRECT_DEPOSIT_ACCOUNT_NUMBER] : '',

    // Workday
    workdayId: data?.['workday_id'],
    workdayComplete: Boolean(data?.['workday_complete']),

    isEditable: Boolean(data?.['is_editable']),
  };
};
