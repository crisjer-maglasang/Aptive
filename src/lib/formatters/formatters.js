import { toISOSubString } from '..';
import { formatTelephoneNumber } from '../utils';

const date = (date) => toISOSubString(date);

export const format = (name, type, value) => {
  const fieldFormattingTypes = {
    date: date,
  };
  const fieldFormattingNames = {
    phone: formatTelephoneNumber, // All Leads -> Add Lead
    mobile: formatTelephoneNumber, // All Leads -> Edit Lead
  };
  let formatter;
  if (fieldFormattingNames[name]) {
    formatter = fieldFormattingNames[name];
  } else {
    formatter = fieldFormattingTypes[type];
  }

  return formatter ? formatter(value, name) : value;
};
