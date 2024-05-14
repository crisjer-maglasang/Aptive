import classNames from 'classnames';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

const DEFAULT_LOCALE = 'en-US';

export const base64StringToFile = (base64String, filename) => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const blobString = atob(arr[1]);
  let length = blobString.length;
  const u8arr = new Uint8Array(length);

  while (length--) {
    u8arr[length] = blobString.charCodeAt(length);
  }

  return new File([u8arr], filename, { type: mime });
};

export const s2ab = (string) => {
  const buf = new ArrayBuffer(string.length);
  const view = new Uint8Array(buf);

  for (let i = 0; i !== string.length; ++i) {
    view[i] = string.charCodeAt(i) & 0xFF;
  }

  return buf;
};

const formatWithCharacter = (charPlaces, maxNumChar, num, char, clear = true) => {
  const numFormatted = clear ? num.replace(/[^*0-9]/g, '') : num;
  if (numFormatted.length > maxNumChar) {
    return clear ? num.slice(0, -1) : num;
  }

  return numFormatted
    .split('')
    .reduce(
      (acc, curr, i) =>
        charPlaces.includes(i) ? [...acc, char, curr] : [...acc, curr],
      [],
    )
    .join('');
};

export const formatTelephoneNumber = (number) => {
  const cleaned = number.replace(/[^0-9]/g, '');
  const cleanedLength = cleaned.length;

  const withStartParenthese = cleaned.length > 0
    ? `(${cleaned.slice(0, Math.min(3, cleanedLength))}`
    : '';

  const withEndParenthese = cleaned.length > 3
    ? `${withStartParenthese}) ${cleaned.slice(3, Math.min(6, cleanedLength))}`
    : withStartParenthese;

  return cleaned.length > 6
    ? `${withEndParenthese}-${cleaned.slice(6, Math.min(10, cleanedLength))}`
    : withEndParenthese;
};

export const formatPostalCode = (num) => formatWithCharacter([5], 9, num, '-');

export const formatSsnNumber = (num) => formatWithCharacter([3, 5], 9, num, '-');

export const formatPhone = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/[^0-9]/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phoneNumber;
};

export const toISOSubString = (date) => (
  date ? new Date(date).toISOString().substring(0, 10) : ''
);

export const momentDate = (date) => (
  moment(date, [
    formatDate.FORMAT_TIMESTAMP,
    formatDate.FORMAT_REQUEST,
    formatDate.FORMAT_DISPLAY,
    formatDate.FORMAT_NOVEL,
    formatDate.FORMAT_YEAR,
  ])
);

export const formatDate = (date, format = formatDate.FORMAT_REQUEST) => {
  const result = momentDate(date).format(format);

  return result !== 'Invalid date' ? result : '';
};

formatDate.FORMAT_TIMESTAMP = 'YYYY-MM-DD HH:mm:ss';
formatDate.FORMAT_REQUEST = 'YYYY-MM-DD';
formatDate.FORMAT_DISPLAY = 'MM-DD-YYYY';
formatDate.FORMAT_NOVEL = 'MMM DD, YYYY';
formatDate.FORMAT_YEAR = 'YYYY';
formatDate.FORMAT_TIME_TZ = 'HH:mm:ss Z';

export const formatDateDisplay = (date, format = formatDate.FORMAT_DISPLAY) => (
  formatDate(date, format)
);

export const formatToDate = (date) => (
  momentDate(date).toDate()
);

export const formatDateRange = (
  dates,
  format = formatDate.FORMAT_DISPLAY,
  nullPlaceholder = '...',
  separator = ' - ',
) => (
  dates
    .map((date) => (date ? formatDate(date, format) : nullPlaceholder))
    .filter((date) => !!date)
    .join(separator)
);

export const userGroup = (user) => {
  if (user?.group_id === 3) {
    // N3 represents that a member of USERS_GROUP is new and not onboarded
    return 'N3';
  } else {
    return user?.group_id;
  }
};

export const getSelectedOption = (selectedValue, options) => {
  const result = options.find(({ value }) => value === selectedValue);

  return result ? result.name : null;
};

export const mergeClassName = (...classes) => {
  return twMerge(classNames(...classes));
};

export const formatNumber = (number, options) => {
  number = number || 0;

  return Intl.NumberFormat(process.env.REACT_APP_LOCALE || DEFAULT_LOCALE, Object.assign({
    maximumFractionDigits: Number.isInteger(number) ? 0 : 2,
  }, options)).format(number);
};

export const formatCurrency = (number, options) => {
  const symbol = options?.symbol !== undefined ? options.symbol : '$';
  const separator = options?.separator !== undefined ? options.separator : '.';
  const precision = options?.precision !== undefined ? options.precision : 2;

  const numberSplit = `${+number}`.split('.');

  let decimal = '00';

  if (numberSplit.length > 1) {
    decimal = numberSplit[1].substring(0, precision);
    while (decimal.length < precision) {
      decimal = `${decimal}0`;
    }
  }

  const integer = formatNumber(numberSplit[0], options);

  number = `${integer}${separator}${decimal}`;

  return `${symbol}${number}`;
};

export const natSort = (a, b) => `${a}`.localeCompare(
  `${b}`,
  process.env.REACT_APP_LOCALE || DEFAULT_LOCALE,
  {
    sensitivity: 'variant',
    caseFirst: 'upper',
    numeric: true,
  },
);

export const formatCurrencyStringToNumber = (value) => {
  const formattedAmount = `${value}`.replace(/[,$]+/g, '');

  return formattedAmount ? Number(formattedAmount) : 0;
};

export const removeTrailingSlashes = (value) => `${value}`.replace(/\/+$/, '');

export const arrayWithoutEmpty = (arr) => arr.filter((element) => Object.keys(element).length !== 0);

export const truncate = (string, maxLength) => {
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}...`
    : string;
};

export const splitPathBySlashes = (path) => {
  const cleanedPath = path.replace(/^\/|\/$/g, '');

  return cleanedPath.split('/');
};

export const sortCompare = (a, b) => {
  let comp = 0;
  if (a == null || b == null) {
    comp = a == null ? -1 : 1;
  } else if (typeof a === 'string') {
    comp = a.localeCompare(b);
  } else if (typeof a === 'number') {
    comp = a - b;
  } else {
    console.error(`Unexpected Type: ${typeof a}`);
  }

  return comp;
};

export const addFsExcludeClass = (classes = '') => mergeClassName(classes, 'fs-exclude');
