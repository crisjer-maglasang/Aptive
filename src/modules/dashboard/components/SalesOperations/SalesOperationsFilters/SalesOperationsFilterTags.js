import { dashboardConstants, formatDate, formatDateRange } from '@/lib';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FILTER_NAMES, FILTER_VALUES, filtersShape, isDefaultFilter } from '../';
import { FilterTag } from './Controls';

const tagTipMap = {
  [FILTER_NAMES.STATUS]: dashboardConstants.FILTER_LABEL_STATUS,
  [FILTER_NAMES.TEAM]: dashboardConstants.FILTER_LABEL_TEAM,
  [FILTER_NAMES.DATE_RANGE]: dashboardConstants.FILTER_LABEL_DATE_RANGE,
  [FILTER_NAMES.SEASON]: dashboardConstants.FILTER_LABEL_SEASON,
  [FILTER_NAMES.EXPERIENCE]: dashboardConstants.FILTER_LABEL_EXPERIENCE,
  [FILTER_NAMES.PROFILE]: dashboardConstants.FILTER_LABEL_PROFILE,
  [FILTER_NAMES.WORKDAY]: dashboardConstants.FILTER_LABEL_WORKDAY,
  [FILTER_NAMES.PROFILE_AND_WORKDAY_COMPLETE]: dashboardConstants.BOX_PROFILE_AND_WORKDAY_COMPLETE,
  [FILTER_NAMES.TEAM_ASSIGNED]: dashboardConstants.BOX_ASSIGNED_TO_A_TEAM,
  [FILTER_NAMES.NOT_SUBMITTED]: dashboardConstants.FILTER_LABEL_SUBMITTED,
};

const tagTextMap = {
  [FILTER_VALUES.YESTERDAY]: dashboardConstants.FILTER_CHOICE_YESTERDAY,
  [FILTER_VALUES.TODAY]: dashboardConstants.FILTER_CHOICE_TODAY,
  [FILTER_VALUES.LAST_7_DAYS]: dashboardConstants.FILTER_CHOICE_LAST_7_DAYS,
  [FILTER_VALUES.LAST_14_DAYS]: dashboardConstants.FILTER_CHOICE_LAST_14_DAYS,
  [FILTER_VALUES.LAST_60_DAYS]: dashboardConstants.FILTER_CHOICE_LAST_60_DAYS,
  [FILTER_VALUES.LAST_90_DAYS]: dashboardConstants.FILTER_CHOICE_LAST_90_DAYS,
  [FILTER_VALUES.PRESEASON]: dashboardConstants.FILTER_CHOICE_PRESEASON,
  [FILTER_VALUES.REGULAR_SEASON]: dashboardConstants.FILTER_CHOICE_REGULAR_SEASON,
  [FILTER_VALUES.POSTSEASON]: dashboardConstants.FILTER_CHOICE_POSTSEASON,
  [FILTER_VALUES.INCOMPLETE]: dashboardConstants.FILTER_CHOICE_INCOMPLETE,
  [FILTER_VALUES.STARTED]: dashboardConstants.FILTER_CHOICE_STARTED,
  [FILTER_VALUES.COMPLETE]: dashboardConstants.FILTER_CHOICE_COMPLETE,
  [FILTER_VALUES.ASSIGNED]: dashboardConstants.FILTER_CHOICE_ASSIGNED,
  [FILTER_VALUES.SUBMITTED]: dashboardConstants.FILTER_CHOICE_SUBMITTED,
  [FILTER_VALUES.NOT_SUBMITTED]: dashboardConstants.FILTER_CHOICE_NOT_SUBMITTED,
};

const excludeFromTags = [
  FILTER_NAMES.RECRUITING_SEASON,
];

const SalesOperationsFilterTags = ({
  filters,
  setFilters,
  getText,
}) => {
  const tags = useMemo(() => {
    const tags = [];

    for (const [name, value] of Object.entries(filters)) {
      if (isDefaultFilter(value) || excludeFromTags.includes(name)) {
        continue;
      }

      tags.push({
        key: uuidv4(),
        name: name,
        value: Array.isArray(value) ? value.toString() : value,
        tip: tagTipMap[name] || name,
        text: tagTextMap[value] || (Array.isArray(value)
          ? formatDateRange(value, formatDate.FORMAT_NOVEL)
          : getText(name, value)),
        onClose: () => {
          setFilters({ ...filters, [name]: FILTER_VALUES.DEFAULT });
        },
      });
    }

    return tags;
  }, [filters, setFilters]);

  return (
    <div className="mx-4">
      <div className="flex flex-wrap -my-1 -mx-1">
        {tags.map((props) => (
          <FilterTag {...props} />
        ))}
      </div>
    </div>
  );
};

SalesOperationsFilterTags.propTypes = {
  filters: filtersShape.isRequired,
  setFilters: PropTypes.func.isRequired,
  getText: PropTypes.func.isRequired,
};

export default SalesOperationsFilterTags;
