import {
  EditPlan,
  Optional,
  Required,
  CreatePlan,
  MassUpdate,
  PlanBuilder,
  Plans,
} from '@/modules/AdminTools/modules/PlanBuilder';

import { abilityConstants } from '@/lib';

const { ACCESS_PLAN_BUILDER_ABILITY } = abilityConstants;

export const PATH = '/plan-builder';

export const MASS_UPDATE = `${PATH}/mass-update`;

export const PLAN_PATH = `${PATH}/plan/`;

const planPath = (path) => {
  path = path ? `${path}` : '';
  let out = `${path?.startsWith(PLAN_PATH) ? '' : PLAN_PATH}${path}`;
  out = `${out}${out?.endsWith('/') ? '' : '/'}`;

  return out;
};

export const editPlan = (path) => `${planPath(path)}edit/`;

export const optionalPlan = (path) => `${planPath(path)}optional/`;

export const NAME = 'Plans';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      element: protectedRoute(<PlanBuilder />, ACCESS_PLAN_BUILDER_ABILITY),
      children: [
        {
          index: true,
          element: <Plans />,
        },
        {
          path: MASS_UPDATE,
          element: <MassUpdate />,
        },
        {
          path: PLAN_PATH,
          element: <CreatePlan />,
          children: [
            {
              index: true,
              element: <Required />,
            },
            {
              path: optionalPlan(),
              element: <Optional />,
            },
          ],
        },
        {
          path: editPlan(':id'),
          element: <EditPlan />,
          children: [
            {
              index: true,
              element: <Required />,
            },
            {
              path: optionalPlan(editPlan(':id')),
              element: <Optional />,
            },
          ],
        },
      ],
    },
  ],
});
