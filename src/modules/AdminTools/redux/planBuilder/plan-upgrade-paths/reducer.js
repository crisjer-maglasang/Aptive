import { createReducer } from '@/redux/root';
import {
  planUpgradePathNameSpace,
  requestPlanUpgradePathsAsync,
  updatePlanUpgradePathAsync,
  createPlanUpgradePathAsync,
  removePlanUpgradePathAsync,
} from './';
import { NAME } from './selectors';

const PlanUpgradePaths = (planUpgradePaths) => {
  const planUpgradePathsMap = new Map();
  planUpgradePaths.forEach((planUpgradePath) =>
    planUpgradePathsMap.set(+planUpgradePath.id, planUpgradePath)
  );

  return {
    get: (id) => planUpgradePathsMap.get(+id),
    planUpgradePaths,
    create: (planUpgradePath) =>
      PlanUpgradePaths([...planUpgradePaths, planUpgradePath]),
    remove: (planUpgradePathId) =>
      PlanUpgradePaths(
        planUpgradePaths.filter(({ id }) => id !== planUpgradePathId)
      ),
  };
};

const planUpgradePathsInitialState = {
  ...PlanUpgradePaths([]),
};

export const planUpgradePathsReducer = {
  [NAME]: createReducer(
    planUpgradePathNameSpace,
    planUpgradePathsInitialState,
    {
      [requestPlanUpgradePathsAsync.success]: ({
        state,
        action: { payload },
      }) => {
        Object.assign(state, PlanUpgradePaths(payload));
      },

      [updatePlanUpgradePathAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state.planUpgradePaths.forEach((planUpgradePath, index) => {
          if (planUpgradePath.id === payload.id) {
            state.planUpgradePaths[index] = payload;
          }
        });
      },

      [createPlanUpgradePathAsync.success]: ({
        state,
        action: { payload },
      }) => {
        Object.assign(state, state.create(payload));
      },

      [removePlanUpgradePathAsync.success]: ({
        state,
        action: { payload },
      }) => {
        Object.assign(state, state.remove(payload));
      },
    }
  ),
};
