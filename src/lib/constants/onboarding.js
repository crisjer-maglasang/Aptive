// Note! Onboarding - is the Profile Wizard!
const onboardingConstants = {
  // Forms
  PERSONAL_INFO_FORM_NAME: 'personal_info',
  PERSONAL_INFO_FORM_TITLE: 'Personal Info',

  HOUSING_AND_VEHICLES_FORM_NAME: 'housing_and_vehicles',
  HOUSING_AND_VEHICLES_FORM_TITLE: 'Housing & Vehicles',

  UNIFORM_AND_SWAG_FORM_NAME: 'uniform_and_swag',
  UNIFORM_AND_SWAG_FORM_TITLE: 'Uniform & Swag',

  LICENSING_FORM_NAME: 'licensing',
  LICENSING_FORM_TITLE: 'Licensing',

  HR_INFO_FORM_NAME: 'hr_info',
  HR_INFO_FORM_TITLE: 'HR Information',

  SUBMIT_PROFILE_FORM_NAME: 'submit_profile',
  SUBMIT_PROFILE_FORM_TITLE: 'Submit Profile',

  WORKDAY_TASKS_FORM_NAME: 'workday_tasks',
  WORKDAY_TASKS_FORM_TITLE: 'Workday Tasks',

  // Form Sections
  // Personal Info
  BASIC_INFO_SECTION_NAME: 'basic_info',
  BASIC_INFO_SECTION_TITLE: 'Basic Info',

  MARRIAGE_INFO_SECTION_NAME: 'marriage_info',
  MARRIAGE_INFO_SECTION_TITLE: 'Marriage Info',

  PAY_DETAILS_SECTION_NAME: 'pay_details',
  PAY_DETAILS_SECTION_TITLE: 'Pay Details',
  PAY_DETAILS_SECTION_FEATURE_FLAG_NAME: 'isPayDetailsSectionEnabled',

  EMERGENCY_INFO_SECTION_NAME: 'emergency_info',
  EMERGENCY_INFO_SECTION_TITLE: 'Emergency Info',

  ADDRESS_SECTION_NAME: 'address',
  ADDRESS_SECTION_TITLE: 'Address',

  GOVERNMENT_ID_SECTION_NAME: 'government_id',
  GOVERNMENT_ID_SECTION_TITLE: 'Government Identification',

  SOCIAL_MEDIA_TITLE: 'Social Media',

  // Housing and Vehicles
  HOUSING_SECTION_NAME: 'housing',
  HOUSING_SECTION_TITLE: 'Housing',

  RESIDENTIAL_HISTORY_SECTION_NAME: 'residential_history',
  RESIDENTIAL_HISTORY_SECTION_TITLE: 'Residential History',

  VEHICLES_SECTION_NAME: 'vehicles',
  VEHICLES_SECTION_TITLE: 'Vehicles',

  // Uniform and Swag
  UNIFORM_SECTION_NAME: 'uniform',
  UNIFORM_SECTION_TITLE: 'Uniform',

  // Licensing
  LICENSING_PERSONAL_DETAILS_SECTION_NAME: 'licensing_personal_details',
  LICENSING_PERSONAL_DETAILS_SECTION_TITLE: 'Licensing Personal Details',

  EMPLOYMENT_HISTORY_SECTION_NAME: 'employment_history',
  EMPLOYMENT_HISTORY_SECTION_TITLE: 'Employment History',

  REP_EXPERIENCE_SECTION_TITLE: 'Rep Experience',
  REP_EXPERIENCE_SECTION_NAME: 'rep_experience',

  REFERENCES_SECTION_NAME: 'references',
  REFERENCES_SECTION_TITLE: 'References',

  SIGNATURE_UPLOAD_SECTION_NAME: 'signature_upload',
  SIGNATURE_UPLOAD_SECTION_TITLE: 'Signature Upload',

  // HR Info
  WOTC_TAX_SURVEY_SECTION_NAME: 'wotc_tax_survey',
  WOTC_TAX_SURVEY_SECTION_TITLE: 'WOTC Tax Survey',

  ID_COPY_UPLOAD_SECTION_NAME: 'id_copy_upload',
  ID_COPY_UPLOAD_SECTION_TITLE: 'ID Copy Upload',

  W9_DOCUMENTS_SECTION_NAME: 'w9_documents',
  W9_DOCUMENTS_SECTION_TITLE: 'W-9 documents',

  I9_DOCUMENTS_SECTION_NAME: 'i9_documents',
  I9_DOCUMENTS_SECTION_TITLE: 'I-9 documents',
  I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME: 'isI9DocumentsSectionEnabled',

  DIRECT_DEPOSIT_SECTION_NAME: 'direct_deposit',
  DIRECT_DEPOSIT_SECTION_TITLE: 'Direct Deposit',
  DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME: 'isDirectDepositSectionEnabled',

  // Contracts
  CONTRACTS_SECTION_TITLE: 'Contracts',

  // Attachments
  ATTACHMENTS_SECTION_TITLE: 'Attachments',

  // Workday Tasks
  WORKDAY_SECTION_NAME: 'workday',
  WORKDAY_SECTION_TITLE: 'Workday ID',

  // first level properties
  // TODO: not used anymore.
  PERSONAL_DATA: 'personalData',
  HOUSING_AND_VEHICLE_DATA: 'housingAndVehicleData',
  UNIFORM_AND_SWAG_DATA: 'uniformAndSwagData',
  LICENSING_DATA: 'licensingData',
  HR_DATA: 'hrData',

  // second level properties
  // TODO: not used anymore.
  // -> personal data
  IDENTIFIER_DATA: 'identifierData',
  MARRIAGE_DATA: 'marriageData',
  EMERGENCY_DATA: 'emergencyData',
  ADDRESS_DATA: 'addressData',
  CURRENT_ADDRESS_DATA: 'currentAddressData',
  IDENTIFICATION_DATA: 'identificationData',
  // -> housing and vehicle data
  ARRIVAL_DATA: 'arrivalData',
  RESIDENTIAL_DATA: 'residentialHistoryData',
  HOUSING_DATA: 'housingData',
  VEHICLE_DATA: 'vehicleData',
  // -> uniform and swag data
  UNIFORM_DATA: 'uniformData',
  // -> licensing data
  LICENSING_PERSONAL_DATA: 'licensingPersonalData',
  EMPLOYMENT_SECTION: 'employmentSection',
  // -> hr data
  PASSPORT_DATA: 'passportData',
  DRIVER_LICENSE_AND_SOCIAL_SECURITY_CARD_DATA: 'driverLicenseAndSocialSecurityCardData',
  SIGNATURE_DATA: 'signatureData',

  // third level properties
  // -> personal data
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  FULL_NAME: 'fullName',
  DATE_OF_BIRTH: 'dob',
  GENDER: 'gender',
  EXPERIENCE: 'experience',
  PHONE_NAME: 'mobile',
  CUSTOMER_FACING_PHONE_NUMBER_NAME: 'customerFacingMobile',
  CUSTOMER_FACING_PHONE_NUMBER_LABEL: 'Customer facing Phone number',
  PROFILE_PICTURE: 'profilePicture',
  PROFILE_PICTURE_LOCAL_FILE: 'profilePictureLocalFile',
  IS_MARRIED: 'isMarried',
  SPOUSE_FIRST_NAME: 'spouseFirstName',
  SPOUSE_LAST_NAME: 'spouseLastName',
  EMERGENCY_CONTACT_NAME: 'emergencyContactName',
  EMERGENCY_CONTACT_PHONE_NUMBER: 'emergencyContactPhoneNumber',
  IS_CURRENT_ADDRESS_DIFFER: 'isDifferentAddress',
  ADDRESS_ONE: 'addressOne',
  ADDRESS_CITY: 'addressCity',
  ADDRESS_STATE: 'addressState',
  ADDRESS_ZIP: 'addressZip',
  ADDRESS_COUNTRY: 'addressCountry',
  IS_CURRENT_ADDRESS: 'is_different_address',
  CURRENT_ADDRESS_ONE: 'currentAddressOne',
  CURRENT_ADDRESS_CITY: 'currentAddressCity',
  CURRENT_ADDRESS_STATE: 'currentAddressState',
  CURRENT_ADDRESS_ZIP: 'currentAddressZip',
  CURRENT_ADDRESS_COUNTRY: 'currentAddressCountry',
  SOCIAL_SECURITY_NUMBER: 'ssnNumber',
  DRIVER_LICENSE_NUMBER: 'driverLicenseNumber',
  DRIVER_LICENSE_STATE_ISSUED: 'driverLicenseStateIssued',
  DRIVER_LICENSE_COUNTRY_ISSUED: 'driverLicenseCountryIssued',
  DRIVER_LICENSE_EXPIRATION_DATE: 'driverLicenseExpirationDate',
  PASSPORT_EXPIRATION_DATE: 'passportExpirationDate',
  FACEBOOK_LINK: 'facebookLink',
  LINKEDIN_LINK: 'linkedinLink',
  TWITTER_LINK: 'twitterLink',
  INSTAGRAM_LINK: 'instagramLink',
  // -> housing and vehicle data
  EXPECTED_ARRIVAL_DATE: 'expectedArrivalDate',
  TENTATIVE_KNOCKING_START_DATE: 'tentativeKnockingStartDate',
  TENTATIVE_KNOCKING_END_DATE: 'tentativeKnockingEndDate',
  ACTUAL_START_DATE: 'actualStartDate',
  ACTUAL_END_DATE: 'actualEndDate',
  NEEDS_HOUSING: 'needsHousing',
  HOUSING_TYPE: 'housingType',
  ROOMMATE_REQUEST: 'roommateRequest',
  NUM_OF_ROOMS: 'numOfRooms',
  REP_ACKNOWLEDGMENT: 'repAcknowledgment',
  ADDRESS_HISTORY_NAME: 'addressHistoryName',
  ADDRESS_HISTORY_START_DATE: 'addressHistoryStartDate',
  ADDRESS_HISTORY_END_DATE: 'addressHistoryEndDate',
  HAS_SEGWAY: 'hasSegway',
  HAS_VEHICLE: 'hasVehicle',
  VEHICLE_MODEL: 'vehicleModel',
  VEHICLE_COLOR: 'vehicleColor',
  VEHICLE_YEAR: 'vehicleYear',
  VEHICLE_PLATE_NUMBER: 'vehiclePlateNumber',
  VEHICLE_REGISTRATION_STATE: 'vehicleRegistrationState',
  VEHICLE_REGISTRATION_COUNTRY: 'vehicleRegistrationCountry',
  // -> uniform data
  SHIRT_SIZE: 'shirtSize',
  JACKET_SIZE: 'jacketSize',
  WAIST_SIZE: 'waistSize',
  HAT_SIZE: 'hatSize',
  SHOE_SIZE: 'shoeSize',
  // -> licensing personal data
  RACE: 'race',
  HEIGHT: 'height',
  FEET: 'feet',
  INCHES: 'inches',
  WEIGHT: 'weight',
  HAIR_COLOR: 'hairColor',
  EYE_COLOR: 'eyeColor',
  CITY_OF_BIRTH: 'cityOfBirth',
  STATE_OF_BIRTH: 'stateOfBirth',
  COUNTRY_OF_BIRTH: 'countryOfBirth',
  STATE_OF_BIRTH_OTHER: 'stateOfBirthOther',
  IS_US_CITIZEN: 'isUsCitizen',
  HAS_VISIBLE_MARKINGS: 'hasVisibleMarkings',
  MARKINGS_DESCRIPTION_NAME: 'markingsDescription',
  MARKINGS_DESCRIPTION_LABEL: 'Please describe scars and/or tattoos',
  MARKINGS_DESCRIPTION_ALT_LABEL: 'Visible markings description',
  IS_CONVICTED_OF_CRIME: 'isConvictedOfCrime',
  CRIME_DESCRIPTION_NAME: 'crimeDescription',
  CRIME_DESCRIPTION_LABEL: 'Please explain',
  CRIME_DESCRIPTION_ALT_LABEL: 'Crime Description',
  EMPLOYMENT_DATA: 'employmentData',
  REFERENCE_DATA: 'referenceData',
  UPFRONT_PAY_NAME: 'upfrontPay',
  RENT_DEDUCTION_NAME: 'rentDeduction',
  UNIFORM_DEDUCTION_NAME: 'uniformDeduction',
  RENT_DEDUCTION_REASON_NAME: 'rentNote',

  HAS_REP_EXPERIENCE: 'hasRepExperience',
  COMPANY_NAME: 'companyNameExperience',
  COMPANY_ACCOUNT_NUMBERS: 'companyAccountNumbers',
  COMPANY_YEARS_SOLD: 'companyYearsSold',

  EMPLOYER_NAME: 'employerName',
  EMPLOYER_START_DATE: 'employerStartDate',
  EMPLOYER_END_DATE: 'employerEndDate',
  REFERENCE_NAME: 'referenceName',
  REFERENCE_RELATION: 'referenceRelation',
  REFERENCE_PHONE_NUMBER: 'referencePhoneNumber',
  // -> signature data
  SIGNATURE: 'signature',
  SIGNATURE_LOCAL_FILE: 'signatureLocalFile',
  // -> passport data
  PASSPORT_PICTURE: 'passportPicture',
  PASSPORT_PICTURE_LOCAL_FILE: 'passportPictureLocalFile',
  // -> driver license and social security card data
  DRIVER_LICENSE: 'driverLicense',
  DRIVER_LICENSE_PICTURE: 'driverLicensePicture',
  DRIVER_LICENSE_LOCAL_FILE: 'driverLicenseLocalFile',
  SOCIAL_SECURITY_CARD: 'socialSecurityCard',
  SOCIAL_SECURITY_CARD_PICTURE: 'socialSecurityCardPicture',
  SOCIAL_SECURITY_PICTURE_LOCAL_FILE: 'socialSecurityPictureLocalFile',

  DOCUMENT_TYPE_W9: 'w9',
  W9_CLICKED: 'w9Clicked',
  W9_COMPLETED_NAME: 'w9Completed',
  USE_PREVIOUS_W9_NAME: 'usePreviousW9',
  USE_PREVIOUS_W9_TEXT: 'Check box if you like to use your previous W-9',

  DOCUMENT_TYPE_I9: 'i9',
  I9_CLICKED: 'i9Clicked',
  I9_COMPLETED_NAME: 'i9Completed',

  USES_TYPE: 'usesType',
  WOTC_SURVEY_COMPLETED: 'wotcSurveyCompleted',
  // -> workday data
  WORKDAY_ID: 'workdayId',
  WORKDAY_ID_LABEL: 'Workday ID',

  DIRECT_DEPOSIT_BANK_NAME: 'directDepositBankName',
  DIRECT_DEPOSIT_ACCOUNT_NAME: 'directDepositAccountName',
  DIRECT_DEPOSIT_ACCOUNT_TYPE: 'directDepositAccountType',
  DIRECT_DEPOSIT_ROUTING_NUMBER: 'directDepositRoutingNumber',
  DIRECT_DEPOSIT_ACCOUNT_NUMBER: 'directDepositAccountNumber',
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER: 'directDepositConfirmAccountNumber',

  DIRECT_DEPOSIT_BANK_NAME_LABEL: 'Bank Name',
  DIRECT_DEPOSIT_ACCOUNT_NAME_LABEL: 'Account Nickname',
  DIRECT_DEPOSIT_ACCOUNT_TYPE_LABEL: 'Account Type',
  DIRECT_DEPOSIT_ROUTING_NUMBER_LABEL: 'Routing Transit Number',
  DIRECT_DEPOSIT_ACCOUNT_NUMBER_LABEL: 'Account Number',
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER_LABEL: 'Confirm Account Number',

  // text constants
  MY_CONTRACTS: 'My Contracts',
  WORKDAY_TASKS: 'Workday Tasks',
  ATTACHMENTS: 'Attachments',
  CONTRACTS: 'Contracts',
  ADMIN_VIEW_TITLE: 'Admin View',

  RECRUIT_ONBOARDING_PROGRESS: 'Recruit Onboarding Progress',
  COPY_PROFILE_LINK_BUTTON: 'Copy profile link',
  VIEW_PROFILE_BUTTON: 'View profile',

  FIRST_NAME_LABEL: 'First name',
  LAST_NAME_LABEL: 'Last name',
  FULL_LEGAL_NAME_LABEL: 'Full legal name',
  DATE_OF_BIRTH_LABEL: 'Date of Birth',
  GENDER_LABEL: 'Gender',
  EXPERIENCE_LABEL: 'Experience',
  PROFILE_PICTURE_LABEL: 'Badge Photo',
  SPOUSE_FIRST_NAME_LABEL: 'Spouse first name',
  SPOUSE_LAST_NAME_LABEL: 'Spouse last name',
  EMERGENCY_CONTACT_NAME_LABEL: 'Emergency Contact Name',
  EMERGENCY_CONTACT_PHONE_NUMBER_LABEL: 'Emergency Contact Phone Number',
  MARITAL_STATUS_LABEL: 'Marital Status',
  STREET_ADDRESS_LABEL: 'Mailing Address',
  CITY_LABEL: 'City',
  STATE_PROVINCE_LABEL: 'State / Province',
  ZIP_POSTAL_LABEL: 'ZIP / Postal',
  COUNTRY_LABEL: 'Country',
  SHOW_CURRENT_ADDRESS_LABEL: 'Current address is different than mailing address',
  IS_CURRENT_ADDRESS_DIFFER_LABEL: 'Is Different Address',
  CURRENT_STREET_ADDRESS_LABEL: 'Current Street Address',
  CURRENT_CITY_LABEL: 'Current City',
  CURRENT_STATE_PROVINCE_LABEL: 'Current State / Province',
  CURRENT_ZIP_POSTAL_LABEL: 'Current ZIP / Postal',
  CURRENT_COUNTRY_LABEL: 'Current Country',
  SSN_LABEL: 'SSN #',
  DRIVER_LICENSE_NUMBER_LABEL: 'Drivers license number',
  DRIVER_LICENSE_STATE_LABEL: 'State / Province',
  DRIVER_LICENSE_COUNTRY_LABEL: 'Country',
  DRIVER_LICENSE_EXPIRATION_DATE_LABEL: 'Expiration date',
  PASSPORT_EXPIRATION_DATE_LABEL: 'Passport Expiration Date',
  UPFRONT_PAY_LABEL: 'Upfront Pay',
  RENT_DEDUCTION_LABEL: 'Rent Deduction',
  UNIFORM_DEDUCTION_LABEL: 'Uniform Deduction',
  REP_STATUS_LABEL: 'Rep Status',
  SALES_TEAM_LABEL: 'Sales Team',
  RENT_DEDUCTION_REASON_LABEL: 'Rent Deduction Reason',
  FACEBOOK_URL: 'https://www.facebook.com/',
  LINKEDIN_URL: 'https://www.linkedin.com/in/',
  TWITTER_URL: 'https://www.x.com/',
  INSTAGRAM_URL: 'https://www.instagram.com/',
  FACEBOOK_TITLE: 'Facebook',
  LINKEDIN_TITLE: 'LinkedIn',
  TWITTER_TITLE: 'X',
  INSTAGRAM_TITLE: 'Instagram',

  HOUSING_TYPE_LABEL: 'Housing type',
  NUMBER_OF_ROOMS_LABEL: '# of rooms',
  REQUEST_ROOMMATE_LABEL: 'Request roommate(s)',
  EXPECTED_ARRIVAL_DATE_LABEL: 'Expected Arrival Date',
  TENTATIVE_KNOCKING_START_LABEL: 'Tentative Knocking Start',
  TENTATIVE_KNOCKING_END_LABEL: 'Tentative Knocking End',
  ACTUAL_START_DATE_LABEL: 'Actual Start Date',
  ACTUAL_END_DATE_LABEL: 'Actual End Date',
  SP_START_DATE_LABEL: 'SP Start Date',
  HOUSING_STATUS_LABEL: 'Will Aptive need to provide you housing?',
  HOUSING_ACKNOWLEDGE_LABEL: 'By selecting this box I understand that aptive will provide me housing and I am liable for the cost of that housing for dates provided above',
  SEGWAY_STATUS_LABEL: 'Will you be bringing a segway out for the summer?',
  VEHICLE_STATUS_LABEL: 'Will you be driving your own vehicle this summer?',
  NEEDS_HOUSING_LABEL: 'Needs Housing',
  REP_ACKNOWLEDGMENT_LABEL: 'Rep Acknowledgment',
  HAS_VEHICLE_LABEL: 'Has Personal Vehicle',
  HAS_SEGWAY_LABEL: 'Has Segway',
  ADDRESS_HISTORY_LABEL: 'Address',
  ADDRESS_HISTORY_START_DATE_LABEL: 'Start Date',
  ADDRESS_HISTORY_END_DATE_LABEL: 'End Date',
  VEHICLE_MODEL_LABEL: 'Model/Make',
  VEHICLE_COLOR_LABEL: 'Color',
  VEHICLE_YEAR_LABEL: 'Year',
  VEHICLE_REGISTRATION_STATE_LABEL: 'State / Province',
  VEHICLE_REGISTRATION_COUNTRY_LABEL: 'Country',
  VEHICLE_PLATE_NUMBER_LABEL: 'License Plate #',
  APARTMENT_STATUS_SINGLE_OWN_ROOM_NAME: 'SINGLE OWN ROOM',
  APARTMENT_STATUS_SINGLE_SHARED_ROOM_NAME: 'SINGLE SHARED ROOM',
  APARTMENT_STATUS_FEMALE_OWN_ROOM_NAME: 'FEMALE OWN ROOM',
  APARTMENT_STATUS_FEMALE_SHARED_ROOM_NAME: 'FEMALE SHARED ROOM',
  APARTMENT_STATUS_MARRIED_NAME: 'MARRIED',
  SINGLE_OWN_ROOM_MESSAGE:
    'I want my own room that I won\'t share with anyone else. ' +
    'I\'m willing to have male roommates in other rooms. ' +
    'Basic furniture will be provided.',
  SINGLE_SHARED_ROOM_MESSAGE:
    'I\'m willing to share a bedroom with another ' +
    'male. Basic furniture will be provided.',
  FEMALE_OWN_ROOM_MESSAGE:
    'I want my own room that I won\'t share with ' +
    'anyone else. I\'m willing to have female roommates ' +
    'in other rooms. Basic furniture will be provided.',
  FEMALE_SHARED_ROOM_MESSAGE:
    'I\'m willing to share a bedroom with another ' +
    'female. Basic furniture will be provided.',
  MARRIED_MESSAGE:
    'I am married, but I solely am responsible for rent. ' +
    'I am responsible for my own furniture and Aptive ' +
    'WILL NOT provide it. Rent deduction varies depending ' +
    'on the area you\'re selling (see manager for questions).',
  SHIRT_SIZE_LABEL: 'T-Shirt Size',
  WAIST_SIZE_LABEL: 'Waist Size',
  JACKET_SIZE_LABEL: 'Jacket Size',
  HAT_SIZE_LABEL: 'Hat Size',
  SHOE_SIZE_LABEL: 'Shoe Size',

  CURRENT_SITUATION_NAME: 'current_situation',
  CURRENT_SITUATION_LABEL: 'Current situation',
  SOURCE_OF_DISCOVERY_NAME: 'source_of_discovery',
  SOURCE_OF_DISCOVERY_LABEL: 'How did you hear about Aptive?',
  REP_EXPERIENCES_DATA_NAME: 'experienceData',
  ADD_ADDITIONAL_EXPERIENCE: 'Add additional experience',
  LAST_INDUSTRY_NAME: 'last_industry',
  LAST_INDUSTRY_OTHER_NAME: 'last_industry_other',
  LAST_INDUSTRY_LABEL: 'Last Industry Sold For',
  LAST_INDUSTRY_OTHER_LABEL: 'Last Industry Other',

  RACE_LABEL: 'Race',
  FEET_LABEL: 'Feet',
  INCHES_LABEL: 'Inches',
  HEIGHT_LABEL: 'Height',
  CRIME_CONVICTION_LABEL: 'Crime Conviction',
  WEIGHT_LABEL: 'Weight',
  HAIR_COLOR_LABEL: 'Hair Color',
  EYE_COLOR_LABEL: 'Eye Color',
  BIRTH_CITY_LABEL: 'Birth City',
  BIRTH_COUNTRY_LABEL: 'Birth Country',
  BIRTH_STATE_LABEL: 'Birth State / Province',
  OTHER_BIRTH_STATE_LABEL: 'Other Country / State',
  US_CITIZEN_LABEL: 'US Citizen?',
  VISIBLE_MARKINGS_LABEL: 'Visible Scars/Tattoos?',
  CONVICTED_CRIME_LABEL: 'Have you ever been convicted of a crime or other charges?',
  CONVICTED_CRIME_ALT_LABEL: 'Convicted of a crime?',
  REP_EXPERIENCE_LABEL: 'Do you have previous door-to-door sales experience?',
  REP_EXPERIENCE_ALT_LABEL: 'Is Switchover?',
  COMPANY_NAME_LABEL: 'Company Name',
  COMPANY_ACCOUNT_NUMBERS_LABEL: 'Number of accounts',
  COMPANY_YEARS_SOLD_LABEL: 'Years Sold',
  EMPLOYMENT_HISTORY_LABEL: 'Employment History',
  REP_EXPERIENCE_HISTORY_LABEL: 'Rep Experience History',
  EMPLOYER_LABEL: 'Employer',
  START_DATE_LABEL: 'Start Date',
  END_DATE_LABEL: 'End Date',
  ADD_EMPLOYER: 'Save',
  ADD_REFERENCE: 'Save',
  ADD_ADDRESS: 'Add Address',
  ADD_EXPERIENCE: 'Add Experience',
  REFERENCES_LABEL: 'References',
  NAME_LABEL: 'Name',
  RELATION_LABEL: 'Relation',
  PHONE_NUMBER_LABEL: 'Phone number',
  COUNTRY_CODE_LABEL: 'Country code',
  COUNTRY_CODE_TEXT: 'US +1',
  REFERENCES_NAME_LABEL: 'Reference name',
  USES_TYPE_LABEL: 'ID',
  PASSPORT_LABEL: 'Passport',
  SIGNATURE_LABEL: 'Signature',
  DRIVER_AND_SOCIAL_LABEL: 'Driver License & Social Security Card',
  DRIVER_LICENSE_LABEL: 'Driver License',
  SOCIAL_SECURITY_LABEL: 'Social Security Card',
  W9_LABEL: 'W-9 document',
  I9_LABEL: 'I-9 document',
  WOTC_SURVEY: 'WOTC survey',
  SIGNATURE_DRAWER_BUTTON_CHANGE: 'Change Your Signature',
  SIGNATURE_DRAWER_BUTTON_DRAW: 'Draw Your Signature',
  PROFILE_PICTURE_TOOLTIP:
    'These badge photos will be on your selling badge for the summer and are expected to be professional. White background, No hats, No bulky jewelry, No jackets, No gang signs, No Glasses',
  RECRUITER_INFO: 'Recruiter Info',
  WOTC_TAX_SURVEY_TEXT: 'Please click the link and fill out this information. It is required for you to do so in order to complete your onboarding.',
  WOTC_TAX_SURVEY_COMPLETED_LABEL: 'WOTC Tax Survey Completed',
  NO_CONTRACTS_FOUND: 'No contracts found',
  NO_ATTACHMENTS_FOUND: 'No attachments found',
  W9_UPLOAD_TEXT: 'Upload W-9 Document to Workday',
  DOCUMENT_IN_REVIEW_TEXT: 'Document in review',
  W9_HELP_TEXT: 'Please note that it may take a few moments for the W-9 form to process after you have finished signing it. If the form is not in review after you signed it, please try reloading the page.',
  DOCUMENT_UPLOAD_BUTTON: 'Fill out form',
  DOCUMENT_UPLOAD_NEW_BUTTON: 'Upload new form',
  DOCUMENT_CONTINUE_BUTTON: 'Continue form',
  DOCUMENT_VIEW_BUTTON: 'View form',

  I9_UPLOAD_TEXT: 'Upload I-9 Document to Workday',
  I9_HELP_TEXT: 'Please note that it may take a few moments for the I-9 form to process after you have finished signing it. If the form is not in review after you signed it, please try reloading the page.',

  PASSWORD_LABEL: 'Password',
  REPEAT_PASSWORD_LABEL: 'Repeat Password',
  PASSWORD_NAME: 'password',
  REPEAT_PASSWORD_NAME: 'repeatPassword',
  TOKEN_NAME: 'token',

  SIGNATURE_BACKGROUND_COLOR: '#ffffff',
  SIGNATURE_PEN_COLOR: '#4284f4',
  NO_VALUE_TEXT: 'NA',

  USER_TYPE: 'User',
  LEAD_TYPE: 'Lead',

  EXPECTED_ARRIVAL_DATE_MESSAGE: 'Date when you plan to arrive in your summer selling area.',
  TENTATIVE_KNOCKING_START_MESSAGE: 'First day you plan on knocking for the current selling season.',
  TENTATIVE_KNOCKING_END_MESSAGE: 'Last day you plan on being in your summer selling area.',

  WIZARD_TYPE_ADMIN: 'admin',
  WIZARD_TYPE_REGIONAL: 'regional',
  WIZARD_TYPE_RECRUITER: 'recruiter',
  WIZARD_TYPE_RECRUIT: 'recruit',

  UPLOADING_UNAVAILABLE_TOOLTIP: 'Uploading a newer version of this document is unavailable since you\'ve submitted the profile.',
};

export default onboardingConstants;
