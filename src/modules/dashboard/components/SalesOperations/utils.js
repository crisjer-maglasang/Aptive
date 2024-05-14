import PropTypes from 'prop-types';
import { formatDateRequest, resolveFilterDates } from './SalesOperationsFilters/utils';

export const FILTER_NAMES = {
  STATUS: 'status',
  TEAM: 'team',
  DATE_RANGE: 'date',
  SEASON: 'season',
  EXPERIENCE: 'experience',
  PROFILE: 'profile',
  NOT_SUBMITTED: 'not_submitted',
  WORKDAY: 'workday',
  RECRUITING_SEASON: 'recruitingSeason',
  TEAM_ASSIGNED: 'teamAssigned',
  PROFILE_AND_WORKDAY_COMPLETE: 'profileAndWorkdayComplete',
};

export const FILTER_VALUES = {
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

export const defaultFilters = {
  [FILTER_NAMES.STATUS]: FILTER_VALUES.DEFAULT,
  [FILTER_NAMES.TEAM]: FILTER_VALUES.DEFAULT,
  [FILTER_NAMES.DATE_RANGE]: FILTER_VALUES.DEFAULT,
  [FILTER_NAMES.SEASON]: FILTER_VALUES.DEFAULT,
  [FILTER_NAMES.EXPERIENCE]: FILTER_VALUES.DEFAULT,
  [FILTER_NAMES.PROFILE]: FILTER_VALUES.DEFAULT,
  [FILTER_NAMES.NOT_SUBMITTED]: FILTER_VALUES.DEFAULT,
  [FILTER_NAMES.WORKDAY]: FILTER_VALUES.DEFAULT,
};

export const filtersShape = PropTypes.shape({
  [FILTER_NAMES.TEAM]: PropTypes.string.isRequired,
  [FILTER_NAMES.DATE_RANGE]: PropTypes.oneOfType([
    PropTypes.oneOf([
      FILTER_VALUES.DEFAULT,
      FILTER_VALUES.YESTERDAY,
      FILTER_VALUES.TODAY,
      FILTER_VALUES.LAST_7_DAYS,
      FILTER_VALUES.LAST_14_DAYS,
      FILTER_VALUES.LAST_60_DAYS,
      FILTER_VALUES.LAST_90_DAYS,
      FILTER_VALUES.CUSTOM_RANGE,
    ]),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]).isRequired,
  [FILTER_NAMES.SEASON]: PropTypes.oneOf([
    FILTER_VALUES.DEFAULT,
    FILTER_VALUES.PRESEASON,
    FILTER_VALUES.REGULAR_SEASON,
    FILTER_VALUES.POSTSEASON,
  ]).isRequired,
  [FILTER_NAMES.EXPERIENCE]: PropTypes.string.isRequired,
  [FILTER_NAMES.PROFILE]: PropTypes.oneOf([
    FILTER_VALUES.DEFAULT,
    FILTER_VALUES.INCOMPLETE,
    FILTER_VALUES.STARTED,
    FILTER_VALUES.COMPLETE,
  ]).isRequired,
  [FILTER_NAMES.NOT_SUBMITTED]: PropTypes.oneOf([
    FILTER_VALUES.DEFAULT,
    FILTER_VALUES.SUBMITTED,
    FILTER_VALUES.NOT_SUBMITTED,
  ]).isRequired,
  [FILTER_NAMES.WORKDAY]: PropTypes.oneOf([
    FILTER_VALUES.DEFAULT,
    FILTER_VALUES.INCOMPLETE,
    FILTER_VALUES.STARTED,
    FILTER_VALUES.COMPLETE,
  ]).isRequired,
  [FILTER_NAMES.RECRUITING_SEASON]: PropTypes.string,
});

export const requestFiltersShape = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.instanceOf(Date))]).isRequired,
}));

export const computeRequestFilters = (filters) => {
  const requestFilters = [];

  for (const [name, value] of Object.entries(filters)) {
    if (isDefaultFilter(value)) {
      continue;
    }

    requestFilters.push({ name, value });
  }

  return requestFilters;
};

/**
 * This helper method may be used by several components
 * until they have the same request parameters signature.
 *
 * If some of these components begin use a request with different parameters' signature,
 * don't modify this method, create a new one instead.
 */
export const normalizeRequestFilters = (filters) => {
  const processFilter = ({ name, value }) => ({
    [FILTER_NAMES.TEAM]: {
      name: 'team_id',
      value: value,
    },
    [FILTER_NAMES.DATE_RANGE]: [
      {
        name: 'start_date',
        value: () => formatDateRequest(resolveFilterDates(value)[0]),
      },
      {
        name: 'end_date',
        value: () => formatDateRequest(resolveFilterDates(value)[1]),
      },
    ],
    [FILTER_NAMES.SEASON]: {
      name: 'rep_season',
      value: {
        [FILTER_VALUES.PRESEASON]: 'pre',
        [FILTER_VALUES.REGULAR_SEASON]: 'regular',
        [FILTER_VALUES.POSTSEASON]: 'post',
      }[value] || value,
    },
    [FILTER_NAMES.EXPERIENCE]: {
      name: 'experience',
      value: value,
    },
    [FILTER_NAMES.PROFILE]: {
      name: 'rep_status',
      value: {
        [FILTER_VALUES.INCOMPLETE]: 'incomplete',
        [FILTER_VALUES.STARTED]: 'started',
        [FILTER_VALUES.COMPLETE]: 'complete',
      }[value] || value,
    },
    [FILTER_NAMES.NOT_SUBMITTED]: {
      name: 'submitted',
      value: {
        [FILTER_VALUES.SUBMITTED]: '1',
        [FILTER_VALUES.NOT_SUBMITTED]: '0',
      }[value] || value,
    },
    [FILTER_NAMES.RECRUITING_SEASON]: {
      name: 'recruiting_season_id',
      value: value,
    },
    [FILTER_NAMES.WORKDAY]: {
      name: 'workday_complete',
      value: {
        [FILTER_VALUES.INCOMPLETE]: 'incomplete',
        [FILTER_VALUES.STARTED]: 'started',
        [FILTER_VALUES.COMPLETE]: 'complete',
      }[value] || value,
    },
    [FILTER_NAMES.TEAM_ASSIGNED]: {
      name: 'team_assigned',
      value: {
        [FILTER_VALUES.ASSIGNED]: '1',
      }[value] || value,
    },
    [FILTER_NAMES.PROFILE_AND_WORKDAY_COMPLETE]: {
      name: 'profile_and_workday_complete',
      value: {
        [FILTER_VALUES.INCOMPLETE]: '0',
        [FILTER_VALUES.COMPLETE]: '1',
      }[value] || value,
    },
  }[name] || { name, value });

  return filters
    .map(processFilter)
    .reduce((result, current) => {
      result.push(...(Array.isArray(current) ? current : [current]));

      return result;
    }, [])
    .map(({ name, value }) => ({
      name,
      value: typeof value === 'function' ? value() : value,
    }));
};

export const isDefaultFilter = (value) => value === FILTER_VALUES.DEFAULT;

