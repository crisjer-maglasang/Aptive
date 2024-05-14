import {
  Settings,
  PlanBuilderApiClients,
} from '@/modules/AdminTools/modules/Developer';

import { abilityConstants } from '@/lib';
import { Navigate } from 'react-router';

const { ACCESS_PLAN_BUILDER_ABILITY } = abilityConstants;

export const PATH = '/plan-developer';

export const NAME = 'Developer';

export const planDeveloperRoutes = [
  {
    path: 'plan-builder-api-client',
    name: 'Plan Builder API',
    element: <PlanBuilderApiClients />,
  },
];

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      element: protectedRoute(<Settings />, ACCESS_PLAN_BUILDER_ABILITY),
      children: [
        {
          index: true,
          element: <Navigate to={planDeveloperRoutes[0].path} />,
        },
        ...planDeveloperRoutes,
      ],
    },
  ],
});
