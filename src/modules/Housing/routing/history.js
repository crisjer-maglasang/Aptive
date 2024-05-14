import { BedsHistory } from '@/modules/Housing';

import { abilityConstants } from '@/lib';

const { ACCESS_HOUSING_ABILITY } = abilityConstants;

export const PATH = '/housing/beds-history';

export const NAME = 'Bed Management History';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      index: true,
      element: protectedRoute(<BedsHistory />, ACCESS_HOUSING_ABILITY),
    },
  ],
});
