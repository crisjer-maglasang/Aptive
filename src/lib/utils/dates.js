import moment from 'moment';
import { onboardingDataValues, formatDate } from '@/lib';

export const generateYearsOptions = (firstYear) => {
  const currentYear = new Date().getFullYear();
  const yearsSlots = Array(currentYear - (firstYear - 1));
  const years = Array.from(yearsSlots, (year, i) => (currentYear - i).toString());
  const yearsOptions = years.map((year) => ({ name: year, value: year }));

  return [
    { name: onboardingDataValues.SELECT_VALUE, value: '' },
    ...yearsOptions,
  ];
};

export const getSecondMondayOfFebruary = (date) => {
  const startOfMonth = moment(date).set('month', 1).startOf('month').startOf('isoWeek');
  let studyDate = moment(date).set('month', 1).startOf('month').startOf('isoWeek').add(2, 'w');

  if (studyDate.month() === startOfMonth.month()) {
    studyDate = studyDate.subtract(1, 'w');
  }

  return studyDate;
};

export const formatStringToDate = (dateString) => {
  const formattedDate = formatDate(dateString, formatDate.FORMAT_REQUEST);
  const [year, month, date] = formattedDate.split('-').map((item) => Number(item));

  return moment().set({ year, month: month - 1, date }).toDate();
};

export const getMaxDOBDate = () => {
  const minAge = 16;

  return moment().subtract(minAge, 'years').endOf('year');
};

export const formatDateToLocal = (date) => {
  const localDate = moment.utc(date).local();

  return {
    display: localDate.format(formatDate.FORMAT_DISPLAY),
    timeZone: localDate.format(formatDate.FORMAT_TIME_TZ),
  };
};

export const getStartOfYear = (year) => {
  const date = new Date();

  date.setFullYear(year);
  date.setMonth(0);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);

  return date;
};

export const getEndOfYear = (year) => {
  const date = new Date();

  date.setFullYear(year);
  date.setMonth(11);
  date.setDate(31);
  date.setHours(23, 59, 59, 999);

  return date;
};
