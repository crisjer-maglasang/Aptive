import { arrayWithoutEmpty, formatDateDisplay, formatDate } from '@/lib/utils';
import { housingConstants } from '@/modules/Housing/lib/constants';
import { resolveFilterDates, formatDateRequest } from '@/modules/dashboard/components/SalesOperations/SalesOperationsFilters/Controls/DateRange/utils';
import { bedsHistoryConstants } from '@/modules/Housing/lib';

const {
  USER_TYPE_FILTER__LABEL,
  USER_TYPE_FILTER__NAME,
  TEAM_FILTER__LABEL,
  TEAM_FILTER__NAME,
  SEASON_FILTER__LABEL,
  SEASON_FILTER__NAME,
  COMPLEX_FILTER__LABEL,
  COMPLEX_FILTER__NAME,
  UNIT_FILTER__LABEL,
  UNIT_FILTER__NAME,
  BED_TYPE_FILTER__LABEL,
  BED_TYPE_FILTER__NAME,
  MOVE_TYPE_FILTER__LABEL,
  MOVE_TYPE_FILTER__NAME,
  DATE_RANGE_FILTER__LABEL,
  DATE_FROM_FILTER_NAME,
  DATE_TO_FILTER_NAME,
  DEFAULT_FILTER_LABEL,
} = bedsHistoryConstants;

export const getBedsHistoryHeadRows = () =>
  arrayWithoutEmpty([
    {
      value: 'USER',
      align: 'left',
    },
    {
      value: 'USER TYPE',
      align: 'left',
    },
    {
      value: 'TEAM',
      align: 'left',
    },
    {
      value: 'SEASON',
      align: 'left',
    },
    {
      value: 'COMPLEX',
      align: 'left',
    },
    {
      value: 'UNIT',
      align: 'left',
    },
    {
      value: 'BED TYPE',
      align: 'left',
    },
    {
      value: 'MOVE TYPE',
      align: 'left',
    },
    {
      value: 'DATE',
      align: 'right',
    },
  ]);

const mapValueToLabel = {
  assigned: 'Assigned',
  'un-assigned': 'Unassigned',
  regular_season: 'Regular season',
  post_season: 'Post season',
  pre_season: 'Pre season',
  'service-pro': 'Service pro',
  rep: 'Rep',
};

export const parseBedsHistoryRows = (bedsHistories) =>
  bedsHistories.length
    ? bedsHistories.map((bedsHistory) => {
        const {
          resident_name: user,
          resident_type: userType,
          team_name: team,
          season_period: season,
          complex_name: complex,
          unit_id: unit,
          bed_type: bedType,
          move_type: moveType,
          changed_at: date,
        } = bedsHistory ?? {};

        return [
          {
            value: user,
            align: 'left',
            className: 'whitespace-nowrap',
          },
          {
            value: mapValueToLabel[userType],
            align: 'left',
            className: 'whitespace-nowrap',
          },
          {
            value: team,
            align: 'left',
            className: 'whitespace-nowrap',
          },
          {
            value: mapValueToLabel[season],
            align: 'left',
            className: 'whitespace-nowrap',
          },
          {
            value: complex,
            align: 'left',
            className: 'whitespace-nowrap',
          },
          {
            value: unit,
            align: 'left',
            className: 'whitespace-nowrap',
          },
          {
            value: bedType,
            align: 'left',
            className: 'whitespace-nowrap',
          },
          {
            value: mapValueToLabel[moveType],
            align: 'left',
            className: 'whitespace-nowrap',
          },
          {
            value: formatDateDisplay(date),
            align: 'right',
            className: 'whitespace-nowrap',
          },
        ];
      })
    : [
        {
          value: housingConstants.NO_DATA_TO_DISPLAY,
          align: 'center',
          colSpan: Number.MAX_SAFE_INTEGER,
          className: 'py-8',
        },
      ];

const mapFilterLabelToValue = {
  'Service Pro': 'service-pro',
  'Sales Rep': 'rep',
  'Pre season': 'pre_season',
  'Regular season': 'regular_season',
  'Post season': 'post_season',
  Assigned: 'assigned',
  Unassigned: 'un-assigned',
  Bed: 'bed',
  Couch: 'couch',
};

const mapFilterLabelToName = {
  [USER_TYPE_FILTER__LABEL]: USER_TYPE_FILTER__NAME,
  [TEAM_FILTER__LABEL]: TEAM_FILTER__NAME,
  [SEASON_FILTER__LABEL]: SEASON_FILTER__NAME,
  [COMPLEX_FILTER__LABEL]: COMPLEX_FILTER__NAME,
  [UNIT_FILTER__LABEL]: UNIT_FILTER__NAME,
  [BED_TYPE_FILTER__LABEL]: BED_TYPE_FILTER__NAME,
  [MOVE_TYPE_FILTER__LABEL]: MOVE_TYPE_FILTER__NAME,
};

const mapNameToIds = (options, name) => {
  const matchedOptions = options.filter((option) => option.name.toLowerCase().includes(name.toLowerCase()));
  if (matchedOptions.length > 0) {
    return matchedOptions.map(option => option.value);
  } else {
    return [0];
  }
};

export const parseFilters = (
  filters,
  teamOptions,
  complexes,
  apartmentOptions
) => {
  const parsedFilters = {};

  Object.keys(filters).forEach((key) => {
    if (key === DATE_RANGE_FILTER__LABEL) {
      const dateRange = resolveFilterDates(filters[key]);
      const startDate = dateRange[0]
        ? formatDateRequest(dateRange[0])
        : '';
      const endDate = dateRange[1]
        ? formatDateRequest(dateRange[1])
        : '';
      if (startDate) {
        parsedFilters[DATE_FROM_FILTER_NAME] = startDate;
      }
      if (endDate) {
        parsedFilters[DATE_TO_FILTER_NAME] = endDate;
      }
    } else if (key === TEAM_FILTER__LABEL) {
      const teamId = mapNameToIds(teamOptions, filters[key]);
      if (teamId) {
        parsedFilters[TEAM_FILTER__NAME] = teamId;
      }
    } else if (key === COMPLEX_FILTER__LABEL) {
      const complexId = mapNameToIds(complexes, filters[key]);
      if (complexId) {
        parsedFilters[COMPLEX_FILTER__NAME] = complexId;
      }
    } else if (key === UNIT_FILTER__LABEL) {
      const apartmentId = mapNameToIds(apartmentOptions, filters[key]);
      if (apartmentId) {
        parsedFilters[UNIT_FILTER__NAME] = apartmentId;
      }
    } else {
      const parsedValue = mapFilterLabelToValue[filters[key]];
      const parsedName = mapFilterLabelToName[key];

      if (parsedValue && parsedName) {
        parsedFilters[parsedName] = parsedValue;
      }
    }
  });

  return parsedFilters;
};

export const countNumberOfFilters = (filters) => {
  let count = 0;
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      count += 1;
    }
  });
  return count;
};

export const parseLabel = (options, key) => {
  if (key === DEFAULT_FILTER_LABEL) {
    return;
  } else if (key === DATE_RANGE_FILTER__LABEL) {
    const dateRange = resolveFilterDates(options[key]);
    const startDate = dateRange[0]
      ? formatDateDisplay(dateRange[0])
      : '';
    const endDate = dateRange[1]
      ? formatDateDisplay(dateRange[1])
      : '';
    const value = startDate || endDate ? `${startDate}, ${endDate}` : 'All';
    return `${key}: ${startDate} ~ ${endDate}`;
  }
  return `${key}: ${options[key]}`;
};
