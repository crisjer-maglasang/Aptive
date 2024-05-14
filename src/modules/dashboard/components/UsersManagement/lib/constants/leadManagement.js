export const usersManagementConstants = {
  LEAD_MANAGEMENT_SEARCH_NAME: 'lead',
  SEARCH_LEADS: 'Search Leads',

  ARCHIVED_LEAD_TYPE: 'lead',
  ARCHIVED_USER_TYPE: 'user',

  RESTORE_LEAD_BUTTON: 'Restore Lead',
  VIEW_USER_BUTTON: 'View User',
  RESTORE_LEAD_CONFIRMATION_TITLE: 'Are you sure you want to restore this lead?',
};

export const repTypeSelectOptions = [
  {
    label: 'Users',
    value: usersManagementConstants.ARCHIVED_USER_TYPE,
  },
  {
    label: 'Leads',
    value: usersManagementConstants.ARCHIVED_LEAD_TYPE,
  },
];
