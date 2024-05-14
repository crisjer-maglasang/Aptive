import { combineReducers } from 'redux';
import { authReducer } from '@/redux/auth';
import { loadingReducer } from '@/redux/loading';
import { errorsReducer } from '@/redux/errors';
import { filesReducer } from '@/redux/files';
import { addressesReducer } from '@/redux/addresses';
import { onboardingReducer } from '@/redux/onboarding';
import { areasReducer } from '@/redux/areas-new';
import { teamsReducer } from '@/redux/teams';
import { polygonsReducer } from '@/redux/polygons';
import { clusterStatsReducer } from '@/redux/clusters';
import { repsReducer } from '@/redux/reps';
import { contractsReducer } from '@/redux/contracts';
import { recruitersReducer } from '@/redux/recruiters';
import { seasonsReducer } from '@/redux/seasons';
import {
  soRepsReducer,
  soSeasonsReducer,
  soStatsReducer,
  soTeamsReducer,
} from '@/redux/sales-operations';
import { manageUsersReducer } from '@/redux/users';
import { toastsReducer } from '@/redux/toasts';
import { approvalReducer } from '@/redux/approval';
import { notificationsReducer } from '@/redux/notifications';
import { adminToolsReducers } from '@/modules/AdminTools/redux';
import { housingReducers } from '@/modules/Housing/redux';
import { userManagementReducers } from '@/modules/dashboard/components/UsersManagement/redux';

const createRootReducer = () => combineReducers({
  auth: authReducer,
  reps: repsReducer,
  contracts: contractsReducer,
  recruiters: recruitersReducer,
  loading: loadingReducer,
  errors: errorsReducer,
  files: filesReducer,
  addresses: addressesReducer,
  onboarding: onboardingReducer,
  area: areasReducer,
  teams: teamsReducer,
  polygons: polygonsReducer,
  clusters: clusterStatsReducer,
  seasons: seasonsReducer,
  soStats: soStatsReducer,
  soReps: soRepsReducer,
  soTeams: soTeamsReducer,
  soSeasons: soSeasonsReducer,
  manageUsers: manageUsersReducer,
  toasts: toastsReducer,
  approval: approvalReducer,
  notifications: notificationsReducer,
  ...adminToolsReducers,
  ...housingReducers,
  ...userManagementReducers,
});

export default createRootReducer;
