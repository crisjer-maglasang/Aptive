import { dashboardConstants, formatDate, formatDateRange } from '@/lib';
import { FILTER_NAMES, FILTER_VALUES } from '..';

export const resolveRepsStartedBoxTitle = (filters) => {
  const value = filters.find(filter => filter.name === FILTER_NAMES.DATE_RANGE)?.value || FILTER_VALUES.DEFAULT
  let range

  switch (value) {
    case FILTER_VALUES.DEFAULT:
      range = 'all time'
      break

    case FILTER_VALUES.YESTERDAY:
      range = 'yesterday'
      break

    case FILTER_VALUES.TODAY:
      range = 'today'
      break

    case FILTER_VALUES.LAST_7_DAYS:
      range = 'this week'
      break

    case FILTER_VALUES.LAST_14_DAYS:
      range = 'last 14 days'
      break

    case FILTER_VALUES.LAST_60_DAYS:
      range = 'last 60 days'
      break

    case FILTER_VALUES.LAST_90_DAYS:
      range = 'last 90 days'
      break

    default:
      range = `since ${formatDateRange(value, formatDate.FORMAT_NOVEL, null, ' till ')}`
  }

  return dashboardConstants.BOX_REPS_STARTED.replace(/{range}/, range)
}
