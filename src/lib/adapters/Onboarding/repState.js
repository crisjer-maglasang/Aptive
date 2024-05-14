import onboardingConstants from '@/lib/constants/onboarding';

const {
  DIRECT_DEPOSIT_ACCOUNT_NAME,
  DIRECT_DEPOSIT_ACCOUNT_TYPE,
  DIRECT_DEPOSIT_BANK_NAME,
  DIRECT_DEPOSIT_ROUTING_NUMBER,
  DIRECT_DEPOSIT_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,
  USE_PREVIOUS_W9_NAME,
  COMPANY_NAME,
  COMPANY_YEARS_SOLD,
  LAST_INDUSTRY_NAME,
  LAST_INDUSTRY_OTHER_NAME,
  COMPANY_ACCOUNT_NUMBERS,
  CURRENT_SITUATION_NAME,
  SOURCE_OF_DISCOVERY_NAME,
  CUSTOMER_FACING_PHONE_NUMBER_NAME,
} = onboardingConstants;

const repKeyMap = {
  //   identifierData
  firstName: 'first_name',
  lastName: 'last_name',
  dob: 'dob',
  gender: 'gender',
  experience: 'experience',
  mobile: 'mobile',
  fullName: 'preferred_name',

  //   marriageData
  isMarried: 'marital_status',
  spouseFirstName: 'spouse_name',
  spouseLastName: 'spouse_last_name',

  // payDetails
  upfrontPay: 'upfront_pay',
  rentDeduction: 'rent_deduction',
  uniformDeduction: 'uniform_deduction',
  rentNote: 'rent_note',

  // emergencyData
  emergencyContactName: 'emergency_contact_name',
  emergencyContactPhoneNumber: 'emergency_contact_number',

  //   addressData
  addressOne: 'permanent_address',
  addressCity: 'permanent_city',
  addressState: 'permanent_state',
  addressZip: 'permanent_zip',
  addressCountry: 'permanent_country',
  currentAddressOne: 'address1',
  currentAddressCity: 'city',
  currentAddressState: 'state',
  currentAddressZip: 'zip',
  currentAddressCountry: 'country',
  permanentAddress: 'permanent_address',
  country: 'country',
  addressTwo: 'address2',
  addressZipTwo: 'zip',

  // social media
  facebookLink: 'facebook_username',
  linkedinLink: 'linkedin_username',
  twitterLink: 'twitter_username',
  instagramLink: 'instagram_username',

  //   identificationData
  ssnNumber: 'ss',
  driverLicenseNumber: 'drivers_license_number',
  driverLicenseStateIssued: 'state_issued',
  driverLicenseCountryIssued: 'country_issued',
  driverLicenseExpirationDate: 'drivers_license_expiration_date',
  passportExpirationDate: 'passport_expiration_date',
  encryptedSsnNumber: 'encrypted_ss',

  //   arrivalData
  expectedArrivalDate: 'arrival_date',
  tentativeKnockingStartDate: 'start_date',
  tentativeKnockingEndDate: 'end_date',
  actualStartDate: 'actual_start_date',
  actualEndDate: 'actual_end_date',

  //   housingData
  needsHousing: 'rent_situation',
  housingType: 'apartment_status_id',
  numOfRooms: 'no_of_rooms',
  repAcknowledgment: 'rep_acknowledgment',
  roommateRequest: 'roommate_request',

  //   vehicleData
  hasSegway: 'has_segway',
  hasVehicle: 'is_personal_vehicle',
  vehicleModel: 'vehicle_model',
  vehicleColor: 'vehicle_color',
  vehicleYear: 'purchase_year',
  vehiclePlateNumber: 'license_plate_number',
  vehicleRegistrationState: 'license_state',
  vehicleRegistrationCountry: 'license_country',

  //   uniformAndSwagData
  shirtSize: 'polo_shirt_size',
  jacketSize: 'jacket_size',
  waistSize: 'waist_size',
  hatSize: 'hat_size',
  shoeSize: 'shoe_size',

  //   personalData
  race: 'ethnicity',
  height: 'height',
  weight: 'weight',
  hairColor: 'hair_color',
  eyeColor: 'eye_color',
  cityOfBirth: 'place_of_birth',
  stateOfBirth: 'birth_state',
  countryOfBirth: 'birth_country',
  stateOfBirthOther: 'other_birth_state',
  placeOfBirth: 'city',
  isUsCitizen: 'is_us_citizen',
  hasVisibleMarkings: 'has_visible_markings',
  markingsDescription: 'visible_markings_reason',
  isConvictedOfCrime: 'is_crime',
  crimeDescription: 'crime_description',

  //  rep experience data
  hasRepExperience: 'is_switchover',
  [COMPANY_NAME]: 'sales_company',
  [COMPANY_ACCOUNT_NUMBERS]: 'number_of_accounts',
  [COMPANY_YEARS_SOLD]: 'years_sold',
  [LAST_INDUSTRY_NAME]: 'last_industry',
  [LAST_INDUSTRY_OTHER_NAME]: 'last_industry_other',
  [SOURCE_OF_DISCOVERY_NAME]: 'source_of_discovery',
  [CURRENT_SITUATION_NAME]: 'current_situation',

  //   list type data
  employmentData: 'employment',
  employerName: 'employer',
  employerStartDate: 'service_from',
  employerEndDate: 'service_to',

  referencesData: 'references',
  referenceName: 'name',
  referenceRelation: 'relation',
  referencePhoneNumber: 'phone',

  //  Residential History updated
  addressHistoryName: 'resident_address',
  addressHistoryStartDate: 'resident_from',
  addressHistoryEndDate: 'resident_to',

  //   image references
  profilePicture: 'profilePicture',
  driverLicense: 'driverLicensePicture',
  socialSecurityCard: 'socialSecurityCardPicture',
  passportPicture: 'passportPicture',
  signature: 'signaturePicture',

  // Image urls
  profilePicUrl: 'profile_img',
  socialSecurityUrl: 'ss_img',
  driverLicenseUrl: 'dl_img',
  passportUrl: 'passport_img',
  signatureUrl: 'signature_img',

  //   miscellaneous
  age: 'age',
  alternateEmail: 'alternate_email',
  attendedThreeOrMoreTrainingMeetings: 'attended_3_or_more_training_meetings',
  isCreated: 'created',
  createdDate: 'created_at',
  einNumber: 'ein_number',
  emergencyContactNumber: 'emergency_contact_name',
  emergencyPhoneNumber: 'emergency_phone_number',
  yearsExperiecnce: 'experience',
  experienceInIndustry: 'experience_in_industry',
  experienceInIndustryYears: 'experience_in_years',
  expirationDate: 'expiration_date',
  repId: 'id',
  industryComingFrom: 'industry_coming_from',
  isDifferentAddress: 'is_different_address',
  isSubscribed: 'is_subscribed',
  isSwitchOver: 'is_switchover',
  leadId: 'lead_id',
  llcName: 'llc_name',
  madeTravelMeeting: 'made_travel_meeting',
  metWithOwners: 'met_with_owners',
  mobileOne: 'mobile',
  mobileTwo: 'mobile2',
  [CUSTOMER_FACING_PHONE_NUMBER_NAME]: 'customer_facing_mobile',
  modified: 'modified',
  numberOfYears: 'no_of_years',
  numberOfAccounts: 'number_of_accounts',
  numberOfAccountsPreviousCompany: 'number_of_accounts_previous_company',
  hasParticipatedInCompanyMeeting: 'participated_in_a_company_meeting',
  hasParticipatedInCompanyActivity: 'participated_in_company_activity',
  personalityTestId: 'personality_test_id',
  personalityTestScore: 'personality_test_score',
  recruiterName: 'recruiter_name',
  recruiterPhone: 'recruiter_phone',
  rentSituation: 'rent_situation',
  salesLicenseNumber: 'sales_license_number',
  salesStateIssued: 'sales_state_issued',
  schoolId: 'school_id',
  state: 'state',
  trainingOnDoors: 'training_on_doors',
  upFrontPay: 'up_front_pay',
  updatedAt: 'updated_at',
  userId: 'user_id',
  isVeteran: 'veteran',
  visitedCompanyBuilding: 'visited_company_building',
  stateLicenseExpirationDate: 'state_license_expiration_date',
  stateLicenseNumber: 'state_license_number',
  wotcSurveyCompleted: 'wotcSurveyCompleted',

  email: 'email',
  recruiter_id: 'recruiter_id',
  recruiting_office_id: 'recruiting_office_id',
  ssnLastFour: 'ssnLastFour',
  sales_program: 'sales_program',

  [USE_PREVIOUS_W9_NAME]: USE_PREVIOUS_W9_NAME,

  [DIRECT_DEPOSIT_BANK_NAME]: DIRECT_DEPOSIT_BANK_NAME,
  [DIRECT_DEPOSIT_ACCOUNT_NAME]: DIRECT_DEPOSIT_ACCOUNT_NAME,
  [DIRECT_DEPOSIT_ACCOUNT_TYPE]: DIRECT_DEPOSIT_ACCOUNT_TYPE,
  [DIRECT_DEPOSIT_ROUTING_NUMBER]: DIRECT_DEPOSIT_ROUTING_NUMBER,
  [DIRECT_DEPOSIT_ACCOUNT_NUMBER]: DIRECT_DEPOSIT_ACCOUNT_NUMBER,
  [DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER]: DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,
};

export default repKeyMap;
