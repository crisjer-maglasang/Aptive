import { dashboardConstants } from '@/lib';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router';
import { AppBar, Footer, TopNav, Toasts } from '.';

const { USERS_GROUP } = dashboardConstants;

const Layout = ({ user, isAuthenticated }) => (
  <div className="w-full flex flex-col min-h-screen bg-gray-50">
    <AppBar user={user} isAuthenticated={isAuthenticated} />
    {isAuthenticated && user?.group_id !== USERS_GROUP ? (
      <TopNav user={user} />
    ) : null}
    <Outlet />
    <Footer />
    <Toasts />
  </div>
);

Layout.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

export default memo(Layout);
