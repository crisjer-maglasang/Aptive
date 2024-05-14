import { dashboardConstants } from '@/lib';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router';
import { Footer, Toasts } from '@/components/layout';
import TopNav from './TopNav';
import AppBar from './AppBar';
import { isHideMenuSelector } from '@/modules/Housing/redux/apartment';

const { USERS_GROUP } = dashboardConstants;

const Layout = ({
  user,
  isAuthenticated,
  isHideMenu,
}) => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <AppBar user={user} isAuthenticated={isAuthenticated} />
      {isAuthenticated && user?.group_id !== USERS_GROUP && !isHideMenu ? (
        <TopNav user={user} />
      ) : null}
      <Outlet />
      <Footer />
      <Toasts />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isHideMenu: isHideMenuSelector(state),
});

Layout.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  isHideMenu: PropTypes.bool,
};

export default connect(mapStateToProps, null)(memo(Layout));
