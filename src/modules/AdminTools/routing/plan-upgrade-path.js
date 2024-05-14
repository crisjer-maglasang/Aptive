import {
  PlanUpgradePath,
  PlanUpgradePaths,
} from '@/modules/AdminTools/modules/PlanUpgradePath';

import { abilityConstants } from '@/lib';

const { ACCESS_PLAN_BUILDER_ABILITY } = abilityConstants;

export const PATH = '/plan-upgrade-path';

export const NAME = 'Plan Upgrade Path';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      element: protectedRoute(
        <PlanUpgradePath />,
        ACCESS_PLAN_BUILDER_ABILITY
      ),
      children: [
        {
          index: true,
          element: <PlanUpgradePaths />,
        },
      ],
    },
  ],
});
