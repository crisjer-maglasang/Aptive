import { formatDate, formatPhone } from '@/lib/utils';
import {
  apartmentConstants, couchSelectOptions,
  furnishedSelectOptions,
  isAddedToRepSelectOptions,
  moveOutNoticeSelectOption,
} from '@/modules/Housing/lib';

const {
  UNIT_ID_NAME,
  UNIT_REP_TYPE_NAME,
  UNIT_APARTMENT_TYPE_NAME,
  UNIT_HAS_COUCH_NAME,
  UNIT_STREET_ADDRESS_NAME,
  UNIT_NOTES_NAME,
  UNIT_INFORMATION_FORM_NAME,
  UNIT_NUMBER_OF_ROOMS_NAME,
  UNIT_ROOMS_NAME,

  FURNITURE_FURNISHED_NAME,
  FURNITURE_MONTHLY_COST_NAME,
  FURNITURE_DELIVERY_DATE_NAME,
  FURNITURE_PICKUP_DATE_NAME,
  FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME,
  FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME,
  FURNITURE_EMAIL_NAME,
  FURNITURE_PHONE_NAME,
  FURNITURE_NOTES_NAME,
  FURNITURE_FORM_NAME,

  UTILITIES_IS_ADDED_TO_REP_NAME,
  UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME,
  UTILITIES_GAS_ACCOUNT_NUMBER_NAME,
  UTILITIES_NOTES_NAME,
  UTILITIES_FORM_NAME,

  LEASED_BY_NAME,
  EXPECTED_RENT_DUE_NAME,
  RENT_DUE_DATE_NAME,
  EXPECTED_RENT_NAME,
  EXPECTED_START_DATE_NAME,
  EXPECTED_END_DATE_NAME,
  ACTUAL_START_DATE_NAME,
  ACTUAL_END_DATE_NAME,
  LEASED_NOTES_NAME,
  LEASE_DETAILS_FORM_NAME,

  MOVE_OUT_NOTICE_DATE_NAME,
  MOVE_OUT_NOTICE_GIVEN_NAME,
  DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME,
  ACTUAL_MOVE_OUT_DATE_NAME,
  MOVE_OUT_NOTES_NAME,
  MOVE_OUT_FORM_NAME,
} = apartmentConstants;

const parseBooleanOptions = (options, value) => {
  if (value === null) {
    return '';
  }

  return value === options[1].value ? options[1].value : options[0].value;
};

export const normalizeApartmentData = (data) => {
  return {
    is_archived: data.is_archived,

    [UNIT_INFORMATION_FORM_NAME]: {
      [UNIT_ID_NAME]: data.unit.unit_id ?? '',
      [UNIT_REP_TYPE_NAME]: data.unit.rep_type ?? '',
      [UNIT_APARTMENT_TYPE_NAME]: data.unit.apartment_type ?? '',
      [UNIT_HAS_COUCH_NAME]: parseBooleanOptions(couchSelectOptions, data.unit.couch),
      [UNIT_STREET_ADDRESS_NAME]: data.unit.address_street ?? '',
      [UNIT_NOTES_NAME]: data.unit.notes ?? '',
      [UNIT_ROOMS_NAME]: data.unit.rooms ?? [],
      [UNIT_NUMBER_OF_ROOMS_NAME]: data.unit.rooms.length ?? '',
    },

    [FURNITURE_FORM_NAME]: {
      [FURNITURE_FURNISHED_NAME]: parseBooleanOptions(furnishedSelectOptions, data.furniture.furnished),
      [FURNITURE_MONTHLY_COST_NAME]: data.furniture.monthly_cost ?? '',
      [FURNITURE_DELIVERY_DATE_NAME]: data.furniture.furniture_delivery_date ?
        formatDate(data.furniture.furniture_delivery_date) : '',
      [FURNITURE_PICKUP_DATE_NAME]: data.furniture.furniture_pick_up_date?
        formatDate(data.furniture.furniture_pick_up_date) : '',
      [FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME]: data.furniture.washer_or_dryer_delivery_date ?
        formatDate(data.furniture.washer_or_dryer_delivery_date) : '',
      [FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME]: data.furniture.washer_or_dryer_pick_up_date ?
        formatDate(data.furniture.washer_or_dryer_pick_up_date) : '',
      [FURNITURE_EMAIL_NAME]: data.furniture.furniture_company_email ?? '',
      [FURNITURE_PHONE_NAME]: data.furniture.furniture_company_phone ?
        formatPhone(data.furniture.furniture_company_phone) : '',
      [FURNITURE_NOTES_NAME]: data.furniture.notes ?? '',
    },

    [UTILITIES_FORM_NAME]: {
      [UTILITIES_IS_ADDED_TO_REP_NAME]: parseBooleanOptions(isAddedToRepSelectOptions, data.utilities.is_added_to_rep),
      [UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME]: data.utilities.electric_account_number ?? '',
      [UTILITIES_GAS_ACCOUNT_NUMBER_NAME]: data.utilities.gas_account_number ?? '',
      [UTILITIES_NOTES_NAME]: data.utilities.notes ?? '',
    },

    [LEASE_DETAILS_FORM_NAME]: {
      [LEASED_BY_NAME]: data.lease_details.leased_by ?? '',
      [EXPECTED_RENT_DUE_NAME]: data.lease_details.expected_rent_due ?? '',
      [RENT_DUE_DATE_NAME]: data.lease_details.rent_due_date ?
        formatDate(data.lease_details.rent_due_date) : '',
      [EXPECTED_RENT_NAME]: data.lease_details.expected_rent ?? '',
      [EXPECTED_START_DATE_NAME]: data.lease_details.expected_start_date ?
        formatDate(data.lease_details.expected_start_date) : '',
      [EXPECTED_END_DATE_NAME]: data.lease_details.expected_end_date ?
        formatDate(data.lease_details.expected_end_date) : '',
      [ACTUAL_START_DATE_NAME]: data.lease_details.actual_start_date ?
        formatDate(data.lease_details.actual_start_date) : '',
      [ACTUAL_END_DATE_NAME]: data.lease_details.actual_end_date ?
        formatDate(data.lease_details.actual_end_date) : '',
      [LEASED_NOTES_NAME]: data.lease_details.notes ?? '',
    },

    [MOVE_OUT_FORM_NAME]: {
      [MOVE_OUT_NOTICE_DATE_NAME]: data.move_out.notice_date ? formatDate(data.move_out.notice_date) : '',
      [MOVE_OUT_NOTICE_GIVEN_NAME]: parseBooleanOptions(moveOutNoticeSelectOption, data.move_out.is_notice_given),
      [DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME]: data.move_out.notice_given_date ?
        formatDate(data.move_out.notice_given_date) : '',
      [ACTUAL_MOVE_OUT_DATE_NAME]: data.move_out.actual_date ? formatDate(data.move_out.actual_date) : '',
      [MOVE_OUT_NOTES_NAME]: data.move_out.notes ?? '',
    },
  };
};
