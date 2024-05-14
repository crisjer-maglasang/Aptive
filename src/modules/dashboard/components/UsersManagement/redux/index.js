import { archivedLeadsReducer, archivedLeadsWatcher } from './leads';

export const userManagementReducers = {
  usersManagement: archivedLeadsReducer,
};

export const userManagementSagas = [
  archivedLeadsWatcher(),
];
