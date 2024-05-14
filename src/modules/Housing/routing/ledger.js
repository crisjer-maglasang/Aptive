import {
  Ledger,
  LedgerArchived,
} from '@/modules/Housing';

import { abilityConstants } from '@/lib';

const { ACCESS_HOUSING_ABILITY } = abilityConstants;

export const PATH = '/housing/ledger';

export const NAME = 'Ledger';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      index: true,
      element: protectedRoute(
        <Ledger />,
        ACCESS_HOUSING_ABILITY,
      ),
    },
    {
      path: `${PATH}/archived`,
      element: protectedRoute(
        <LedgerArchived />,
        ACCESS_HOUSING_ABILITY,
      ),
    },
  ],
});
