import {
  RepDetails,
  RepDetail,
} from '@/modules/AdminTools/modules/RepDetail';

import { abilityConstants } from '@/lib';

const { ACCESS_PLAN_BUILDER_ABILITY } = abilityConstants;

export const PATH = '/rep-details';

export const NAME = 'Rep Details';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      element: protectedRoute(
        <RepDetail />,
        ACCESS_PLAN_BUILDER_ABILITY
      ),
      children: [
        {
          index: true,
          element: <RepDetails />,
        },
      ],
    },
  ],
});
