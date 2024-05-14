import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRoutes, useSearchParams } from 'react-router-dom';
import routes from './routing/routes';
import { isAuthenticatedSelector, userSelector } from '@/redux/auth';
import { requestNotificationsAsync } from '@/redux/notifications';
import { useLocation } from 'react-router';
import { useRefreshToken } from '@/hooks';
import { ConfigCatProvider, createConsoleLogger, LogLevel } from 'configcat-react';

export const App = ({ isAuthenticated, user, getNotifications }) => {
  useRefreshToken(isAuthenticated);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const redirectUrl = searchParams.get('redirectUrl');
  const routing = useRoutes(routes(isAuthenticated, user, redirectUrl));
  const logger = createConsoleLogger(LogLevel.Off);

  useEffect(() => {
    if (isAuthenticated) {
      getNotifications();
    }
  }, [getNotifications, isAuthenticated, location.pathname]);

  return (
    <ConfigCatProvider sdkKey={process.env.REACT_APP_CONFIG_CAT_SDK_KEY} options={{ logger, pollIntervalSeconds: 300 }}>
      {routing}
    </ConfigCatProvider>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = {
  getNotifications: requestNotificationsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
