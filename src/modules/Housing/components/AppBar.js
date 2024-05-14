import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { WizardProfileModal } from '@/components';
import logo from '../../../assets/newaptivelogo.svg';
import { logoutAsync } from '@/redux/auth';
import { dashboardConstants } from '@/lib';
import { Avatar } from '@/components/common';
import { Notification } from '@/modules/Notification';
import UserMenu from '@/components/layout/UserMenu';
import * as planBuilderRoute from '@/modules/AdminTools/routing/plan-builder';
import { addFsExcludeClass } from '@/lib/utils';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';
import { DropdownButton } from '@/modules/Housing/components/common';
import {
  requestSeasonSummaries,
  setSelectedSeason,
  seasonSummariesSelector,
  selectedSeasonSelector,
} from '@/modules/Housing/redux/season';
import { isSeasonSummariesLoadingSelector } from '@/modules/Housing/redux/loading';
import { Loader } from '@/components/common';

const AppBar = ({
  user,
  isAuthenticated,
  logout,
  getSeasonSummaries,
  selectSeason,
  seasonSummaries,
  isSeasonLoading,
}) => {
  const {
    MY_PROFILE,
    SETTINGS,
    SIGN_OUT,
    OPEN_MENU,
    USERS_GROUP,
    USER_MANAGEMENT,
    SUPER_ADMIN_GROUP,
    DEALER_ADMIN_GROUP,
  } = dashboardConstants;
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState({});

  useEffect(() => {
    getSeasonSummaries();
  }, [getSeasonSummaries]);

  useEffect(() => {
    if (seasonSummaries.length > 0) {
      setSelectedSeason(seasonSummaries.find((s) => s.is_current));
    }
  }, [seasonSummaries]);

  useEffect(() => {
    if (selectedSeason) {
      selectSeason(selectedSeason);
    }
  }, [selectedSeason, selectSeason]);

  const onProfileClick = useCallback(() => {
    setProfileOpen(true);
  }, []);

  const onProfileClose = useCallback(() => {
    setProfileOpen(false);
  }, []);

  const userNavigation = [
    {
      name: MY_PROFILE,
      onClick: onProfileClick,
      isDisplayed: user && user?.group_id !== USERS_GROUP,
    },
    {
      name: planBuilderConstants.PLAN_BUILDER,
      onClick: () => navigate(planBuilderRoute.PATH),
      isDisplayed:
        user &&
        [SUPER_ADMIN_GROUP, DEALER_ADMIN_GROUP].includes(user?.group_id),
    },
    {
      name: USER_MANAGEMENT,
      onClick: () => navigate('/onboarding/users-management'),
      isDisplayed:
        user &&
        [SUPER_ADMIN_GROUP, DEALER_ADMIN_GROUP].includes(user?.group_id),
    },
    { name: SETTINGS, isDisplayed: true },
    { name: SIGN_OUT, onClick: logout, isDisplayed: true },
  ];

  const handleChangeSeason = (season) => {
    setSelectedSeason(seasonSummaries.find((s) => s.value === season.value));
  };

  return (
    <Disclosure as="header" className="bg-white border-b shadow-sm">
      {({ open }) => (
        <>
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between items-center">
              <Link to="/" className="py-4">
                <img className="block w-auto h-8" src={logo} alt="Aptive" />
              </Link>

              {user && isAuthenticated && (
                <div className="flex items-center gap-4">
                  {isSeasonLoading ? (
                    <Loader />
                  ) : (
                    <DropdownButton
                      options={seasonSummaries}
                      label={selectedSeason?.label || 'Select Season'}
                      onChange={handleChangeSeason}
                      buttonClassName="px-2 py-1 rounded-md border border-gray-200 justify-start items-center gap-2 flex bg-white"
                      labelClassName="text-right text-sm font-normal font-['Inter'] leading-6"
                      iconClassName="w-4 h-4 text-gray-900"
                    />
                  )}

                  <div className="flex items-center lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className="flex items-center justify-center p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-aptivegreen"
                      aria-expanded="false"
                    >
                      <span className="sr-only">{OPEN_MENU}</span>
                      {open ? (
                        <XIcon className="w-6 h-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="w-6 h-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:justify-between gap-x-5">
                    <Notification openProfile={onProfileClick} />
                    <UserMenu userNavigation={userNavigation} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {user && (
            <Disclosure.Panel className="lg:hidden">
              <div className="border-t border-gray-200">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    <Avatar
                      image={user?.profile_img}
                      userName={`${user?.first_name} ${user?.last_name}`}
                    />
                    <div className={addFsExcludeClass()}>
                      <p className="font-medium text-gray-800">
                        {`${user.first_name} ${user.last_name}`}
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Notification openProfile={onProfileClick} />
                </div>
                <ul>
                  {userNavigation.map(({ name, isDisplayed, onClick }) =>
                    isDisplayed ? (
                      <li key={name}>
                        <button
                          type="button"
                          onClick={onClick}
                          className="w-full px-4 py-2 font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 text-left"
                        >
                          {name}
                        </button>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </Disclosure.Panel>
          )}

          {user && user?.group_id !== USERS_GROUP && (
            <WizardProfileModal
              isOpen={profileOpen}
              onClose={onProfileClose}
              isPersonalWizard={true}
            />
          )}
        </>
      )}
    </Disclosure>
  );
};

AppBar.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
  getSeasonSummaries: PropTypes.func,
  selectSeason: PropTypes.func,
  seasonSummaries: PropTypes.array,
  isSeasonLoading: PropTypes.bool,
};

const mapDispatchToProps = {
  logout: logoutAsync.request,
  getSeasonSummaries: requestSeasonSummaries.request,
  selectSeason: setSelectedSeason,
};

const mapStateToProps = (state) => ({
  seasonSummaries: seasonSummariesSelector(state),
  currentSeason: selectedSeasonSelector(state),
  isSeasonLoading: isSeasonSummariesLoadingSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
