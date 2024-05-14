import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import {
  abilityConstants,
  dashboardConstants,
  userCan,
} from '@/lib';
import { housingConstants } from '@/modules/Housing/lib/constants';
import { splitPathBySlashes } from '@/lib/utils';
import classNames from 'classnames';
import { adminToolPages } from '@/modules/AdminTools/routing';
import { housingPages } from '@/modules/Housing/routing';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectDefaultTeamId } from '@/redux/auth';
import { adminToolsConstants } from '@/modules/AdminTools/lib/constants';

export const adminToolPaths = adminToolPages.map(({ PATH }) => PATH);

export const housingPaths = housingPages.map(({ PATH }) => PATH);

const {
  BRANCH_MANAGER_ROLE,
  TEAM_LEADER_ROLE,
  SENIOR_TEAM_LEADER_ROLE,
  DIVISION_MANAGER_ROLE,
  REGIONAL_MANAGER_ROLE,
  SENIOR_REGIONAL_ROLE,
  VP_OF_SALES_ROLE,
  PARTNERSHIP_ROLE,
} = dashboardConstants;

const {
  ACCESS_ONB_ABILITY,
  ACCESS_PLAN_BUILDER_ABILITY,
  ACCESS_SPT_ABILITY,
  VIEW_AREAS_ABILITY,
  ACCESS_HOUSING_ABILITY,
} = abilityConstants;

const TopNav = ({ user }) => {
  const location = useLocation();
  const defaultTeam = useSelector(selectDefaultTeamId);

  const isCurrentLocation = (path) => {
    const splittedMenuPath = splitPathBySlashes(path);
    const splittedPathname = splitPathBySlashes(location.pathname);

    return splittedMenuPath[0] === splittedPathname[0];
  };

  const isTeamLeader = (user) => [
    TEAM_LEADER_ROLE,
    SENIOR_TEAM_LEADER_ROLE,
    DIVISION_MANAGER_ROLE,
  ].includes(user?.role);

  const isRegional = (user) => [
    REGIONAL_MANAGER_ROLE,
    SENIOR_REGIONAL_ROLE,
    VP_OF_SALES_ROLE,
    PARTNERSHIP_ROLE,
  ].includes(user?.role);

  const isBranchManager = (user) => [
    BRANCH_MANAGER_ROLE,
  ].includes(user?.role);

  const menuItems = [
    {
      name: 'Onboarding',
      path: '/onboarding',
      ability: ACCESS_ONB_ABILITY,
    },
    {
      name: 'Sales planning tool',
      path: userCan(user, VIEW_AREAS_ABILITY)
        ? '/sales-planning'
        : (
          isRegional(user)
            ? '/sales-planning/teams'
            : (
              (isTeamLeader(user) || isBranchManager(user)) && defaultTeam
                ? `/sales-planning/team/${defaultTeam}`
                : '/sales-planning/teams'
            )
        ),
      ability: ACCESS_SPT_ABILITY,
    },
    {
      name: adminToolsConstants.ADMIN_TOOLS,
      path: adminToolPaths[0],
      isCurrentLocation: () => adminToolPaths.some((path) => isCurrentLocation(path)),
      ability: ACCESS_PLAN_BUILDER_ABILITY,
    },
    {
      name: housingConstants.HOUSING,
      path: housingPaths[0],
      isCurrentLocation: () => housingPaths.some((path) => isCurrentLocation(path)),
      ability: ACCESS_HOUSING_ABILITY,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-100 border-b">
      <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div className="flex justify-between h-10">
          <div className="flex">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {menuItems.map((item) =>
                (userCan(user, item.ability) ? (
                  <Link
                    to={item.path}
                    key={item.name}
                    className={classNames(
                      (item.isCurrentLocation ? item.isCurrentLocation() : isCurrentLocation(item.path))
                        ? 'border-gray-900 text-gray-900 border-b-4'
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-700 border-b-2',
                      'inline-flex items-center px-1 pt-1 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ) : null))}
            </div>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.path}
              className={classNames(
                isCurrentLocation(item.path)
                  ? 'border-gray-900 text-gray-900 border-b-4'
                  : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-700 border-b-2',
                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};

TopNav.propTypes = {
  user: PropTypes.object,
};

export default TopNav;
