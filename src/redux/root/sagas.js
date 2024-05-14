import { all } from 'redux-saga/effects';

import { authWatcher } from '@/redux/auth';
import { areasActionWatcher } from '@/redux/areas-new';
import { teamsActionWatcher } from '@/redux/teams';
import { polygonsActionWatcher } from '@/redux/polygons';
import { clusterStatsActionWatcher } from '@/redux/clusters';
import { onboardingActionWatcher } from '@/redux/onboarding';
import { filesActionWatcher } from '@/redux/files';
import { addressesActionWatcher } from '@/redux/addresses';
import { repsActionWatcher } from '@/redux/reps';
import { contractsActionWatcher } from '@/redux/contracts';
import { recruitersActionWatcher } from '@/redux/recruiters';
import { seasonsActionWatcher } from '@/redux/seasons';
import { soActionWatcher } from '@/redux/sales-operations';
import { usersActionWatcher } from '@/redux/users';
import { approvalActionWatcher } from '@/redux/approval';
import { notificationsActionWatcher } from '@/redux/notifications';
import { adminToolsSagas } from '@/modules/AdminTools/redux';
import { housingSagas } from '@/modules/Housing/redux';
import { userManagementSagas } from '@/modules/dashboard/components/UsersManagement/redux';

export default function* rootSaga() {
  yield all(
    [
      authWatcher(),
      onboardingActionWatcher(),
      filesActionWatcher(),
      addressesActionWatcher(),
      areasActionWatcher(),
      teamsActionWatcher(),
      polygonsActionWatcher(),
      clusterStatsActionWatcher(),
      repsActionWatcher(),
      contractsActionWatcher(),
      recruitersActionWatcher(),
      seasonsActionWatcher(),
      soActionWatcher(),
      usersActionWatcher(),
      approvalActionWatcher(),
      notificationsActionWatcher(),
      ...adminToolsSagas,
      ...housingSagas,
      ...userManagementSagas,
    ],
  );
}
