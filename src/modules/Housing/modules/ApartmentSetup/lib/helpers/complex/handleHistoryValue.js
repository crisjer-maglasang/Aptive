import {
  apartmentSetupSelectOptions,
} from '@/modules/Housing/lib';

const HUMAN_EMPTY = 'NA';

const isEmpty = (value) => [null, undefined, ''].includes(value);

const optionModifierFactory = (options, value, { searchKey = 'value', returnKey = 'name' } = {}) => (
  options.find(({ [searchKey]: optionValue }) => String(optionValue) === String(value))?.[returnKey] ?? value
);

const apartmentTypeValueModifier = (value) => optionModifierFactory(apartmentSetupSelectOptions, value);

const valueModifiers = {
  type: apartmentTypeValueModifier,
};

const handleHistoryValue = (key, value) => {
  return isEmpty(value)
    ? HUMAN_EMPTY
    : (valueModifiers[key] ? valueModifiers[key](value) : value);
};

export default handleHistoryValue;
