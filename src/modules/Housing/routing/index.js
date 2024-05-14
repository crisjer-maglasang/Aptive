import * as apartmentSetup from './apartmentSetup';
import * as ledger from './ledger';
import * as bedManagement from './bedManagement';
import * as history from './history';
import { Housing } from '../pages';

export const housingPages = [
  ledger,
  apartmentSetup,
  bedManagement,
  history,
];

export const housingRoutes = (protectedRoute, layout) => {
  const housingRoutes = (routes) => routes(protectedRoute, <Housing />);

  return {
    path: '/housing',
    element: layout,
    children: housingPages.map(({ routes }) => housingRoutes(routes)),
  };
};
