import {
  BedManagement,
} from '@/modules/Housing';

import { abilityConstants } from '@/lib';

const { ACCESS_HOUSING_ABILITY } = abilityConstants;

export const PATH = '/housing/bed-management';

export const NAME = 'Bed Management';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      index: true,
      element: protectedRoute(
        <BedManagement />,
        ACCESS_HOUSING_ABILITY,
      ),
    },
  ],
});
