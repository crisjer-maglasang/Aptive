import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const planUpgradePathNameSpace = `${nameSpace}/plan_upgrade_paths`;

export const requestPlanUpgradePathsAsync = createAsyncAction(
  `${planUpgradePathNameSpace}/REQUEST_PLAN_UPGRADE_PATHS`
);

export const removePlanUpgradePathAsync = createAsyncAction(
  `${planUpgradePathNameSpace}/REMOVE_PLAN_UPGRADE_PATH`
);

export const updatePlanUpgradePathAsync = createAsyncAction(
  `${planUpgradePathNameSpace}/UPDATE_PLAN_UPGRADE_PATH`
);

export const createPlanUpgradePathAsync = createAsyncAction(
  `${planUpgradePathNameSpace}/CREATE_PLAN_UPGRADE_PATH`
);
