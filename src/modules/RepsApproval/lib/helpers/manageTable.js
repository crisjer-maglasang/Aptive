import { approvingUserRolesOptions, COLUMN_ID } from '..';

export const getColumnsNumber = (headerGroups) => {
  return headerGroups.reduce((sum, item) => {
    return sum + (item.colSpan || 0);
  }, 0);
};

export const getActiveColumnsIds = (sortParams, filters) => {
  const sortedColumns = sortParams.length ? sortParams.map((sortItem) => sortItem.name) : [];
  const recruiterColumn = filters.recruiters.length ? [COLUMN_ID.recruiterName] : [];
  const regionalColumn = filters.regionals.length ? [COLUMN_ID.regionalName] : [];

  return [...sortedColumns, ...recruiterColumn, ...regionalColumn];
};

export const defineIsActiveColumn = (columnId, activeColumnsIds) => {
  const activeColumnIndex = activeColumnsIds.findIndex((item) => item === columnId);

  return activeColumnIndex > -1;
};

export const getFilteredUsersId = (allFilters, newFilter) => {
  return allFilters
    .filter(({ userRole }) => userRole === newFilter.userRole)
    .map(({ userId }) => userId);
};

export const getAddFilterButtonLabel = (value) => {
  const option = approvingUserRolesOptions
    .find((option) => option.value === value);

  return option.label;
};
