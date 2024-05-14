import {
  Settings,
  PlanPricingLevels,
  PlanCategories,
  AgreementLengths,
  PlanStatuses,
  PlanServiceFrequencies,
  ServiceCategories,
  CanSellThreshold,
} from '@/modules/AdminTools/modules/PlanSettings';

import { abilityConstants } from '@/lib';
import { Navigate } from 'react-router';

const { ACCESS_PLAN_BUILDER_ABILITY } = abilityConstants;

export const PATH = '/plan-settings';

export const NAME = 'Settings';

export const planSettingsRoutes = [
  {
    path: 'plan-pricing-levels',
    name: 'Plan Pricing Levels',
    element: <PlanPricingLevels />,
  },
  {
    path: 'agreement-lengths',
    name: 'Agreement Lengths',
    element: <AgreementLengths />,
  },
  {
    path: 'plan-categories',
    name: 'Plan Categories',
    element: <PlanCategories />,
  },
  {
    path: 'plan-statuses',
    name: 'Plan Statuses',
    element: <PlanStatuses />,
  },
  {
    path: 'service-frequencies',
    name: 'Service Frequencies',
    element: <PlanServiceFrequencies />,
  },
  {
    path: 'service_categories',
    name: 'Service Categories',
    element: <ServiceCategories />,
  },
  {
    path: 'can_sell_threshold',
    name: 'Sales Threshold',
    element: <CanSellThreshold />,
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
          element: <Navigate to={planSettingsRoutes[0].path} />,
        },
        ...planSettingsRoutes,
      ],
    },
  ],
});
