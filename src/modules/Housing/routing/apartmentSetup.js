import {
  ApartmentSetup,
  TeamDetails,
  ComplexInfo,
} from '@/modules/Housing';

import { abilityConstants } from '@/lib';
import { ComplexesList, ApartmentsList, History } from '../modules/ApartmentSetup/components';

const { ACCESS_HOUSING_ABILITY } = abilityConstants;

export const PATH = '/housing/apartment-setup';

export const NAME = 'Apartment Setup';

export const routes = (protectedRoute, layout) => {
  const complexInfoRoute = (isTeamRoute = false) => ({
    element: protectedRoute(<ComplexInfo />, ACCESS_HOUSING_ABILITY),
    children: [
      {
        index: true,
        element: protectedRoute(<ApartmentsList />, ACCESS_HOUSING_ABILITY),
      },
      {
        path: `${PATH}/${isTeamRoute ? 'team/:teamId/' : ''}complex/:complexId/history`,
        element: protectedRoute(
          <History />,
          ACCESS_HOUSING_ABILITY,
        ),
      },
    ]
  });

  return {
    path: PATH,
    element: layout,
    children: [
      {
        index: true,
        element: protectedRoute(
          <ApartmentSetup/>,
          ACCESS_HOUSING_ABILITY,
        ),
      },
      {
        path: `${PATH}/team/:teamId`,
        element: protectedRoute(
          <TeamDetails/>,
          ACCESS_HOUSING_ABILITY,
        ),
        children: [
          {
            index: true,
            element: protectedRoute(
              <ComplexesList/>,
              ACCESS_HOUSING_ABILITY,
            ),
          },
        ]
      },
      {
        path: `${PATH}/team/:teamId/complex/:complexId`,
        ...complexInfoRoute(true)
      },
      {
        path: `${PATH}/complex/:complexId`,
        ...complexInfoRoute(false),
      },
    ],
  }
};
