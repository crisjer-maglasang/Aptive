import { Table } from '@/components';
import { formatDateDisplay, formatPhone, formatPostalCode, formatSsnNumber, onboardingDataValues } from '@/lib';
import {
  eyeColorSelectOptions,
  genderSelectOptions,
  hairColorSelectOptions,
  hatSizeSelectOptions,
  jacketSizeSelectOptions,
  maritalStatusRadioConfig,
  racialBackgroudSelectOptions,
  roomSelectOptions,
  shirtSizeSelectOptions,
  shoeSizeSelectOptions,
  vehicleColorSelectOptions,
  waistSizeSelectOptions,
} from '@/lib/configs';
import { isArray, isBoolean, isNumber, isPlainObject } from 'lodash-es';
import getFieldLabel from './labelsHandler';
import { stateOptions, experienceOptions, apartmentStatusesOptions, countriesOptions, repStatusesOptions } from './getTBodyRows';
import { formatNumberToCurrencyString } from '@/lib/utils';
import {
  currentSituationSelectOptions,
  sourceOfDiscoverySelectOptions,
  lastIndustrySelectOptions,
} from '@/modules/recruits/lib';

const {
  COUNTRY_STATE_OTHER_NAME,
  STATE_OTHER_VALUE,
  COUNTRY_OTHER_VALUE,
} = onboardingDataValues;

const HUMAN_TRUE = 'Yes';
const HUMAN_FALSE = 'No';
const HUMAN_EMPTY = 'NA';

const isTrue = (value) => [true, 1, '1', 'Yes', 'yes'].includes(value);
const isFalse = (value) => [false, 0, '0', 'No', 'no'].includes(value);
const isEmpty = (value) => [null, undefined, ''].includes(value);

const optionModifierFactory = (options, value, { searchKey = 'value', returnKey = 'name' } = {}) => (
  options.find(({ [searchKey]: optionValue }) => String(optionValue) === String(value))?.[returnKey] ?? value
);

const defaultValueModifier = (value) => (
  isBoolean(value) ? booleanValueModifier(value) : value
);

const booleanValueModifier = (value) => (
  isTrue(value) ? HUMAN_TRUE : isFalse(value) ? HUMAN_FALSE : value
);

const stateValueModifier = (value) => optionModifierFactory([...stateOptions, { name: COUNTRY_STATE_OTHER_NAME, value: STATE_OTHER_VALUE }], value);

const countryValueModifier = (value) => optionModifierFactory([...countriesOptions, { name: COUNTRY_STATE_OTHER_NAME, value: COUNTRY_OTHER_VALUE }], value);

const genderValueModifier = (value) => optionModifierFactory(genderSelectOptions, value);

const experienceValueModifier = (value) => optionModifierFactory(experienceOptions, value, { searchKey: 'id' });

const apartmentStatusModifier = (value) => optionModifierFactory(apartmentStatusesOptions, value, { searchKey: 'id', returnKey: 'status_label' });

const repStatusModifier = (value) => optionModifierFactory(repStatusesOptions, value, { searchKey: 'statusCode', returnKey: 'statusTitle' });

const maritalStatusValueModifier = (value) => optionModifierFactory(maritalStatusRadioConfig, value, { returnKey: 'label' });

const numberOfRoomsValueModifier = (value) => optionModifierFactory(roomSelectOptions, value);

const vehicleColorValueModifier = (value) => optionModifierFactory(vehicleColorSelectOptions, value);

const poloShirtSizeValueModifier = (value) => optionModifierFactory(shirtSizeSelectOptions, value);

const jacketSizeValueModifier = (value) => optionModifierFactory(jacketSizeSelectOptions, value);

const waistSizeValueModifier = (value) => optionModifierFactory(waistSizeSelectOptions, value);

const hatSizeValueModifier = (value) => optionModifierFactory(hatSizeSelectOptions, value);

const shoeSizeValueModifier = (value) => optionModifierFactory(shoeSizeSelectOptions, value);

const ethnicityValueModifier = (value) => optionModifierFactory(racialBackgroudSelectOptions, value);

const hairColorValueModifier = (value) => optionModifierFactory(hairColorSelectOptions, value);

const eyeColorValueModifier = (value) => optionModifierFactory(eyeColorSelectOptions, value);

const sourceOfDiscoveryModifier = (value) => optionModifierFactory(sourceOfDiscoverySelectOptions, value);

const currentSituationModifier = (value) => optionModifierFactory(currentSituationSelectOptions, value);

const lastIndustryModifier = (value) => optionModifierFactory(lastIndustrySelectOptions, value);

const valueModifiers = {
  // Basic Info
  dob: formatDateDisplay,
  mobile: formatPhone,
  gender: genderValueModifier,
  experience: experienceValueModifier,
  apartment_status_id: apartmentStatusModifier,
  label_name: repStatusModifier,

  // Marriage Info
  marital_status: maritalStatusValueModifier,

  // Pay Details
  upfront_pay: formatNumberToCurrencyString,
  rent_deduction: (value) => formatNumberToCurrencyString(value, 2),
  uniform_deduction: formatNumberToCurrencyString,

  // Emergency Info
  emergency_phone_number: formatPhone,

  // Address
  permanent_state: stateValueModifier,
  permanent_zip: formatPostalCode,
  permanent_country: countryValueModifier,
  is_different_address: booleanValueModifier,
  state: stateValueModifier,
  zip: formatPostalCode,
  country: countryValueModifier,

  // Government Identification
  ss: formatSsnNumber,
  state_issued: stateValueModifier,
  country_issued: countryValueModifier,
  drivers_license_expiration_date: formatDateDisplay,
  passport_expiration_date: formatDateDisplay,

  // Housing
  arrival_date: formatDateDisplay,
  start_date: formatDateDisplay,
  end_date: formatDateDisplay,
  date_arrived: formatDateDisplay,
  last_day: formatDateDisplay,
  rent_situation: booleanValueModifier,
  no_of_rooms: numberOfRoomsValueModifier,
  rep_acknowledgment: booleanValueModifier,

  // Residential History
  resident_from: formatDateDisplay,
  resident_to: formatDateDisplay,

  // Vehicles
  is_personal_vehicle: booleanValueModifier,
  vehicle_color: vehicleColorValueModifier,
  license_state: stateValueModifier,
  license_country: countryValueModifier,
  has_segway: booleanValueModifier,

  // Uniform
  polo_shirt_size: poloShirtSizeValueModifier,
  jacket_size: jacketSizeValueModifier,
  waist_size: waistSizeValueModifier,
  hat_size: hatSizeValueModifier,
  shoe_size: shoeSizeValueModifier,

  // Licensing Personal Details
  ethnicity: ethnicityValueModifier,
  hair_color: hairColorValueModifier,
  eye_color: eyeColorValueModifier,
  birth_state: stateValueModifier,
  birth_country: countryValueModifier,
  is_us_citizen: booleanValueModifier,
  has_visible_markings: booleanValueModifier,
  is_crime: booleanValueModifier,
  is_switchover: booleanValueModifier,

  // Rep Experience History
  last_industry: lastIndustryModifier,
  current_situation: currentSituationModifier,
  source_of_discovery: sourceOfDiscoveryModifier,

  // Employment History
  service_from: formatDateDisplay,
  service_to: formatDateDisplay,

  // References
  phone: formatPhone,

  // WOTC Tax Survey
  wotc_survey_completed: booleanValueModifier,
};

const handleComplexValue = (value, isObject = false) => (
  <Table
    wrapper={{
      className: 'rounded-none',
    }}
    tbody={{
      rows: Object.entries(value).map(
        ([key, value]) => ({
          className: 'divide-x',
          cells: [
            ...(isObject ? [{
              value: getFieldLabel(key),
              className: 'px-2 py-2 bg-gray-50 font-medium',
              type: 'th',
            }] : []),
            {
              value: value,
              className: 'px-2 py-2',
            },
          ],
        }),
      ),
    }}
  />
);

const handlePrimitiveValue = (key, value) => {
  return isEmpty(value)
    ? HUMAN_EMPTY
    : (valueModifiers[key] ?? defaultValueModifier)(value);
};

const handleValue = (key, value) => {
  try {
    // Try parse value as Json, but keep numbers as strings for further formatting, for example `formatPhone`.
    value = JSON.parse(value, (key, value) => (
      isNumber(value) ? String(value) : value
    ));
  } catch (error) {
    // Do nothing...
  }

  if (isArray(value) || isPlainObject(value)) {
    // Handle empty array/object as empty primitive value.
    value = !Object.entries(value).length
      ? handlePrimitiveValue(key, null)
      : handleComplexValue(
        Object.entries(value).reduce((accumulator, [key, value]) => ({
          ...accumulator,
          [key]: handleValue(key, value),
        }), {}),
        isPlainObject(value),
      );
  } else {
    value = handlePrimitiveValue(key, value);
  }

  return value;
};

export default handleValue;
