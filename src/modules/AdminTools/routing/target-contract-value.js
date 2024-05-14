import {
  TargetContractValues,
  TargetContractValue,
} from '@/modules/AdminTools/modules/TargetContractValue';

import { abilityConstants } from '@/lib';

const { ACCESS_PLAN_BUILDER_ABILITY } = abilityConstants;

export const PATH = '/target-contract-value';

export const NAME = 'Target Contract Values';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      element: protectedRoute(
        <TargetContractValue />,
        ACCESS_PLAN_BUILDER_ABILITY
      ),
      children: [
        {
          index: true,
          element: <TargetContractValues />,
        },
      ],
    },
  ],
});
