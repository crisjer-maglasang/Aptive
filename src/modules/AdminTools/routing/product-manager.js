import {
  Products,
  ProductManager,
} from '@/modules/AdminTools/modules/ProductManager';

import { abilityConstants } from '@/lib';

const { ACCESS_PLAN_BUILDER_ABILITY } = abilityConstants;

export const PATH = '/product-manager';

export const NAME = 'Services';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      element: protectedRoute(<ProductManager />, ACCESS_PLAN_BUILDER_ABILITY),
      children: [
        {
          index: true,
          element: <Products />,
        },
      ],
    },
  ],
});
