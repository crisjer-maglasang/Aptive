import * as planBuilder from './plan-builder';
import * as settings from './settings';
import * as developer from './developer';
import * as productManager from './product-manager';
import * as targetContractValue from './target-contract-value';
import * as repDetail from './rep-detail';
import * as planUpgradePath from './plan-upgrade-path';
import * as promoCode from './promo-code';

import { AdminTools } from '@/modules/AdminTools';

export const adminToolPages = [
  planBuilder,
  productManager,
  settings,
  targetContractValue,
  planUpgradePath,
  developer,
  repDetail,
  promoCode,
];

export const adminToolsRoutes = (protectedRoute, layout) => {
  const adminToolRoutes = (routes) => routes(protectedRoute, <AdminTools />);

  return {
    path: '',
    element: layout,
    children: adminToolPages.map(({ routes }) => adminToolRoutes(routes)),
  };
};
