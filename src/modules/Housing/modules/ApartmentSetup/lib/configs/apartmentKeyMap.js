import { apartmentConstants } from '@/modules/Housing/lib';

const {
  FURNITURE_FURNISHED_NAME,
  FURNITURE_MONTHLY_COST_NAME,
  FURNITURE_DELIVERY_DATE_NAME,
  FURNITURE_PICKUP_DATE_NAME,
  FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME,
  FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME,
  FURNITURE_EMAIL_NAME,
  FURNITURE_PHONE_NAME,
  FURNITURE_NOTES_NAME,

  UNIT_ID_NAME,
  UNIT_COMPANY_ID_NAME,
  UNIT_REP_TYPE_NAME,
  UNIT_APARTMENT_TYPE_NAME,
  UNIT_HAS_COUCH_NAME,
  UNIT_STREET_ADDRESS_NAME,
  UNIT_NOTES_NAME,
  UNIT_ROOMS_NAME,
  UNIT_NUMBER_OF_ROOMS_NAME,

  UTILITIES_IS_ADDED_TO_REP_NAME,
  UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME,
  UTILITIES_GAS_ACCOUNT_NUMBER_NAME,
  UTILITIES_NOTES_NAME,

  LEASED_BY_NAME,
  EXPECTED_RENT_DUE_NAME,
  RENT_DUE_DATE_NAME,
  EXPECTED_RENT_NAME,
  EXPECTED_START_DATE_NAME,
  EXPECTED_END_DATE_NAME,
  ACTUAL_START_DATE_NAME,
  ACTUAL_END_DATE_NAME,
  LEASED_NOTES_NAME,

  MOVE_OUT_NOTICE_DATE_NAME,
  MOVE_OUT_NOTICE_GIVEN_NAME,
  DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME,
  ACTUAL_MOVE_OUT_DATE_NAME,
  MOVE_OUT_NOTES_NAME,

  DOCUMENT_UPLOAD_NAME,
} = apartmentConstants;

const apartmentKeyMap = {
  [UNIT_ID_NAME]: ['unit', 'unit_id'],
  [UNIT_COMPANY_ID_NAME]: ['unit', 'company_id'],
  [UNIT_REP_TYPE_NAME]: ['unit', 'rep_type'],
  [UNIT_APARTMENT_TYPE_NAME]: ['unit', 'apartment_type'],
  [UNIT_HAS_COUCH_NAME]: ['unit', 'has_couch'],
  [UNIT_STREET_ADDRESS_NAME]: ['unit', 'address_street'],
  [UNIT_NOTES_NAME]: ['unit', 'notes'],
  [UNIT_ROOMS_NAME]: ['unit', 'rooms'],
  [UNIT_NUMBER_OF_ROOMS_NAME]: ['unit', 'number_of_rooms'],

  [FURNITURE_FURNISHED_NAME]: ['furniture', 'furnished'],
  [FURNITURE_MONTHLY_COST_NAME]: ['furniture', 'monthly_cost'],
  [FURNITURE_DELIVERY_DATE_NAME]: ['furniture', 'furniture_delivery_date'],
  [FURNITURE_PICKUP_DATE_NAME]: ['furniture', 'furniture_pick_up_date'],
  [FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME]: ['furniture', 'washer_or_dryer_delivery_date'],
  [FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME]: ['furniture', 'washer_or_dryer_pick_up_date'],
  [FURNITURE_EMAIL_NAME]: ['furniture', 'company', 'email'],
  [FURNITURE_PHONE_NAME]: ['furniture', 'company', 'phone'],
  [FURNITURE_NOTES_NAME]: ['furniture', 'notes'],

  [UTILITIES_IS_ADDED_TO_REP_NAME]: ['utilities', 'is_added_to_rep'],
  [UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME]: ['utilities', 'electric_account_number'],
  [UTILITIES_GAS_ACCOUNT_NUMBER_NAME]: ['utilities', 'gas_account_number'],
  [UTILITIES_NOTES_NAME]: ['utilities', 'notes'],

  [LEASED_BY_NAME]: ['lease_details', 'leased_by'],
  [EXPECTED_RENT_DUE_NAME]: ['lease_details', 'expected_rent_due'],
  [RENT_DUE_DATE_NAME]: ['lease_details', 'rent_due_date'],
  [EXPECTED_RENT_NAME]: ['lease_details', 'expected_rent'],
  [EXPECTED_START_DATE_NAME]: ['lease_details', 'expected_start_date'],
  [EXPECTED_END_DATE_NAME]: ['lease_details', 'expected_end_date'],
  [ACTUAL_START_DATE_NAME]: ['lease_details', 'actual_start_date'],
  [ACTUAL_END_DATE_NAME]: ['lease_details', 'actual_end_date'],
  [LEASED_NOTES_NAME]: ['lease_details', 'notes'],

  [MOVE_OUT_NOTICE_DATE_NAME]: ['move_out', 'notice_date'],
  [MOVE_OUT_NOTICE_GIVEN_NAME]: ['move_out', 'is_notice_given'],
  [DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME]: ['move_out', 'notice_given_date'],
  [ACTUAL_MOVE_OUT_DATE_NAME]: ['move_out', 'actual_date'],
  [MOVE_OUT_NOTES_NAME]: ['move_out', 'notes'],
  [DOCUMENT_UPLOAD_NAME]: ['document_upload', 'upload_files'],
};

export default apartmentKeyMap;
