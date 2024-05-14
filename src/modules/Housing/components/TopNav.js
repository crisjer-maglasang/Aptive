import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { abilityConstants, userCan } from '@/lib';
import { splitPathBySlashes } from '@/lib/utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import NavigationMenu from './NavigationMenu';
import { housingConstants } from '@/modules/Housing/lib';
import { useFeatureFlag } from 'configcat-react';

const {
  ACCESS_HOUSING_ABILITY,
} = abilityConstants;

const {
  APARTMENT_SETUP_FEATURE_FLAG_NAME,
  BED_MANAGEMENT_FEATURE_FLAG_NAME,
} = housingConstants;

const TopNav = ({ user }) => {
  const location = useLocation();
  const { value: isApartmentSetupEnabled } = useFeatureFlag(
    APARTMENT_SETUP_FEATURE_FLAG_NAME,
    false,
  );
  const { value: isBedManagementEnabled } = useFeatureFlag(
    BED_MANAGEMENT_FEATURE_FLAG_NAME,
    false,
  );

  const isCurrentLocation = (path) => {
    const splittedMenuPath = splitPathBySlashes(path);
    const splittedPathname = splitPathBySlashes(location.pathname);

    return path === location.pathname;
  };

  const navigationOption = [
    {
      isDisplayed: true,
      name: 'Onboarding',
      path: '/onboarding',
    },
    {
      isDisplayed: true,
      name: 'Sales planning tool',
      path: '/sales-planning',
    },
    {
      isDisplayed: true,
      name: 'Admin Tools',
      path: '/plan-builder',
    },
    {
      isDisplayed: true,
      name: 'Housing',
      path: '/housing/apartment-setup',
    },
  ];

  const historyNavOptions = [
    {
      isDisplayed: true,
      name: 'Assignment history',
      description: 'Track sales rep assignments to teams over time.',
      path: '#',
    },
    {
      isDisplayed: true,
      name: 'Bed management history',
      description: "History of sales rep's bed assignments in complexes.",
      path: '/housing/beds-history',
    },
    {
      isDisplayed: true,
      name: 'Rent deduction history',
      description: 'Overview of changes in rent deductions for reps.',
      path: '#',
    },
    {
      isDisplayed: true,
      name: 'Rent history',
      description: "Record of changes in reps' housing status and rent.",
      path: '#',
    },
    {
      isDisplayed: true,
      name: 'Rep status history',
      description: "Detailed history of sales reps' job status changes.",
      path: '#',
    },
    {
      isDisplayed: true,
      name: 'Upfront pay history',
      description: "Comprehensive history of reps' upfront payment records.",
      path: '#',
    },
  ];

  const menuItems = [
    ...(isApartmentSetupEnabled ? [{
      name: 'Apartment Setup',
      path: '/housing/apartment-setup',
      ability: ACCESS_HOUSING_ABILITY,
    }] : []),
    {
      name: 'Ledger',
      path: '/housing/ledger',
      ability: ACCESS_HOUSING_ABILITY,
    },
    {
      name: 'Ledger Archive',
      path: '/housing/ledger/archived',
      ability: ACCESS_HOUSING_ABILITY,
    },
    ...(isBedManagementEnabled ? [{
      name: 'Bed management',
      path: '/housing/bed-management',
      ability: ACCESS_HOUSING_ABILITY,
    }] : []),
  ];

  return (
    <Disclosure as="nav" className="bg-white border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-10">
          <div className="flex">
            <div className="hidden sm:flex sm:space-x-8">
              <NavigationMenu
                name="Housing"
                navigationOption={navigationOption}
                isBrand
              />
              {menuItems.map((item) =>
                userCan(user, item.ability) ? (
                  <Link
                    to={item.path}
                    key={item.name}
                    className={classNames(
                      (
                        item.isCurrentLocation
                          ? item.isCurrentLocation()
                          : isCurrentLocation(item.path)
                      )
                        ? 'border-gray-900 text-gray-900 border-b-4'
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-700 border-b-2',
                      'inline-flex items-center px-1 pt-1 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ) : null
              )}
              <NavigationMenu
                name="History"
                navigationOption={historyNavOptions}
              />
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
