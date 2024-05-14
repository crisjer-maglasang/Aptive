import { formatDateDisplay } from '@/lib';
import { isBoolean } from 'lodash-es';
import {
  furnishedSelectOptions,
  repTypeSelectOptions
} from '@/modules/Housing/lib';

const HUMAN_TRUE = 'Yes';
const HUMAN_FALSE = 'No';
const HUMAN_EMPTY = 'NA';

const isTrue = (value) => [true, 'true', 1, '1', 'Yes', 'yes'].includes(value);
const isFalse = (value) => [false, 'false', 0, '0', 'No', 'no'].includes(value);
const isEmpty = (value) => [null, undefined, ''].includes(value);

const optionModifierFactory = (options, value, { searchKey = 'value', returnKey = 'name' } = {}) => (
  options.find(({ [searchKey]: optionValue }) => String(optionValue) === String(value))?.[returnKey] ?? value
);

const booleanValueModifier = (value) => (
  isTrue(value) ? HUMAN_TRUE : isFalse(value) ? HUMAN_FALSE : value
);

const defaultValueModifier = (value) => (
  isBoolean(value) ? booleanValueModifier(value) : value
);

const repTypeValueModifier = (value) => optionModifierFactory(repTypeSelectOptions, value);
const furnishedValueModifier = (value) => optionModifierFactory(furnishedSelectOptions, isTrue(value) ? 1 : 0);

const valueModifiers = {
  rep_type: repTypeValueModifier,
  has_couch: booleanValueModifier,
  furnished: furnishedValueModifier,
  furniture_delivery_date: formatDateDisplay,
  furniture_pickup_date: formatDateDisplay,
  washer_dryer_delivery_date: formatDateDisplay,
  washer_dryer_pickup_date: formatDateDisplay,
  is_utilities_added_to_rep: booleanValueModifier,
  rent_due_date: formatDateDisplay,
  actual_start_date: formatDateDisplay,
  actual_end_date: formatDateDisplay,
  expected_start_date: formatDateDisplay,
  expected_end_date: formatDateDisplay,
  move_out_notice_given: booleanValueModifier,
  move_out_notice_date: formatDateDisplay,
  date_move_out_notice_was_given: formatDateDisplay,
  actual_move_out_date: formatDateDisplay,
};

const handleHistoryValue = (key, value) => {
  return isEmpty(value)
    ? HUMAN_EMPTY
    : (valueModifiers[key] ?? defaultValueModifier)(value);
};

export default handleHistoryValue;
