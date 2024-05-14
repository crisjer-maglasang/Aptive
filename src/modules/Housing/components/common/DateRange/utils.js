import {
  dashboardConstants,
  formatDate as libFormatDate,
  formatDateRange as libFormatDateRange,
} from '@/lib';
import {
  isAfter as dfIsAfter,
  isBefore as dfIsBefore,
  isSameDay as dfIsSameDay,
  isValid,
  subDays,
  subMonths,
} from 'date-fns';

const FILTER_VALUES = {
DEFAULT: '__default',
YESTERDAY: '__yesterday',
TODAY: '__today',
LAST_7_DAYS: '__last_7_days',
LAST_14_DAYS: '__last_14_days',
LAST_60_DAYS: '__last_60_days',
LAST_90_DAYS: '__last_90_days',
CUSTOM_RANGE: '__custom_range',
PRESEASON: '__pre',
REGULAR_SEASON: '__regular',
POSTSEASON: '__post',
INCOMPLETE: '__incomplete',
STARTED: '__started',
COMPLETE: '__complete',
ASSIGNED: '__assigned',
SUBMITTED: '__submitted',
NOT_SUBMITTED: '__not_submitted',
};

export { isValid, subDays, subMonths };

export const NOW = Date.now();

export const TODAY = subDays(NOW, 0);

export const YESTERDAY = subDays(NOW, 1);

export const SEVEN_DAYS_AGO = subDays(NOW, 7);

export const FOURTEEN_DAYS_AGO = subDays(NOW, 14);

export const SIXTY_DAYS_AGO = subDays(NOW, 60);

export const NINETY_DAYS_AGO = subDays(NOW, 90);

export const ONE_MONTH_AGO = subMonths(NOW, 1);

export const isAfter = (first, second) =>
  first && second ? dfIsAfter(first, second) : false;

export const isBefore = (first, second) =>
  first && second ? dfIsBefore(first, second) : false;

export const isSameDay = (first, second) =>
  first && second ? dfIsSameDay(first, second) : !first && !second;

export const formatDate = (date) =>
  (date ? libFormatDate(date, libFormatDate.FORMAT_NOVEL) : '');

export const formatDateRequest = (date) =>
  (date ? libFormatDate(date, libFormatDate.FORMAT_REQUEST) : '');

export const formatDateRange = (dates) =>
  libFormatDateRange(dates, libFormatDate.FORMAT_NOVEL);

export const dateInputMask = (rawValue) => {
  const mask = [
    /[a-z]/i,
    /[a-z]/i,
    /[a-z]/i,
    ' ',
    /\d/,
    /\d/,
    ',',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  const match = rawValue.match(/^([a-z]{3,})( |\d)?/i);

  if (match) {
    const add = [];

    // Allow an inserted character.
    for (let i = 0; i < match[1].length - 3; i++) {
      add.push(/[a-z]/i);
    }

    // Allow an additional character/digit/space to be inserted.
    if (!match[2]) {
      add.push(/[a-z\d ]/i);
    }

    mask.splice(3, 0, ...add);
  }

  return mask;
};

export const resolveFilterDates = (value) => {
  const { startDate, endDate } = parseValue(value);

  return [startDate, endDate];
};

export const parseValue = (
  value,
  initial = parseValue(FILTER_VALUES.DEFAULT, {}),
) => {
  let startDate, endDate, placeholder;

  // First, normalize value.
  if (Array.isArray(value)) {
    value = value.map((value, key) =>
      value !== undefined ? value : [initial.startDate, initial.endDate][key]);
  }

  const range = computeRange(value);

  switch (range) {
    case FILTER_VALUES.DEFAULT:
      [startDate, endDate] = [null, null];
      placeholder = dashboardConstants.FILTER_CHOICE_ALL_TIME;
      break;

    case FILTER_VALUES.YESTERDAY:
      [startDate, endDate] = [YESTERDAY, YESTERDAY];
      placeholder = dashboardConstants.FILTER_CHOICE_YESTERDAY;
      break;

    case FILTER_VALUES.TODAY:
      [startDate, endDate] = [TODAY, TODAY];
      placeholder = dashboardConstants.FILTER_CHOICE_TODAY;
      break;

    case FILTER_VALUES.LAST_7_DAYS:
      [startDate, endDate] = [SEVEN_DAYS_AGO, TODAY];
      placeholder = dashboardConstants.FILTER_CHOICE_LAST_7_DAYS;
      break;

    case FILTER_VALUES.LAST_14_DAYS:
      [startDate, endDate] = [FOURTEEN_DAYS_AGO, TODAY];
      placeholder = dashboardConstants.FILTER_CHOICE_LAST_14_DAYS;
      break;

    case FILTER_VALUES.LAST_60_DAYS:
      [startDate, endDate] = [SIXTY_DAYS_AGO, TODAY];
      placeholder = dashboardConstants.FILTER_CHOICE_LAST_60_DAYS;
      break;

    case FILTER_VALUES.LAST_90_DAYS:
      [startDate, endDate] = [NINETY_DAYS_AGO, TODAY];
      placeholder = dashboardConstants.FILTER_CHOICE_LAST_90_DAYS;
      break;

    default:
      if (Array.isArray(value)) {
        [startDate, endDate] = value;
        placeholder = formatDateRange(value);
      } else {
        ({ startDate, endDate, placeholder } = initial);
      }
  }

  return {
    isCustomRange: range === FILTER_VALUES.CUSTOM_RANGE,
    range,
    startDate,
    endDate,
    placeholder,
  };
};

export const computeRange = (value) => {
  const DATE_VALUES = [
    FILTER_VALUES.DEFAULT,
    FILTER_VALUES.YESTERDAY,
    FILTER_VALUES.TODAY,
    FILTER_VALUES.LAST_7_DAYS,
    FILTER_VALUES.LAST_14_DAYS,
    FILTER_VALUES.LAST_60_DAYS,
    FILTER_VALUES.LAST_90_DAYS,
    FILTER_VALUES.CUSTOM_RANGE,
  ];

  if (DATE_VALUES.includes(value)) {
    return value;
  }

  const [startDate, endDate] = value;

  if (startDate === null && endDate === null) {
    return FILTER_VALUES.DEFAULT;
  } else if (isSameDay(startDate, TODAY) && isSameDay(endDate, TODAY)) {
    return FILTER_VALUES.TODAY;
  } else if (isSameDay(startDate, YESTERDAY) && isSameDay(endDate, YESTERDAY)) {
    return FILTER_VALUES.YESTERDAY;
  } else if (
    isSameDay(startDate, SEVEN_DAYS_AGO) &&
    isSameDay(endDate, TODAY)
  ) {
    return FILTER_VALUES.LAST_7_DAYS;
  } else if (
    isSameDay(startDate, FOURTEEN_DAYS_AGO) &&
    isSameDay(endDate, TODAY)
  ) {
    return FILTER_VALUES.LAST_14_DAYS;
  } else if (
    isSameDay(startDate, SIXTY_DAYS_AGO) &&
    isSameDay(endDate, TODAY)
  ) {
    return FILTER_VALUES.LAST_60_DAYS;
  } else if (
    isSameDay(startDate, NINETY_DAYS_AGO) &&
    isSameDay(endDate, TODAY)
  ) {
    return FILTER_VALUES.LAST_90_DAYS;
  } else {
    return FILTER_VALUES.CUSTOM_RANGE;
  }
};
