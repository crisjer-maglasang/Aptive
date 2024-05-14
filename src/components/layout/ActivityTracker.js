import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { logUserSessionAsync } from '@/redux/auth';

const ActivityTracker = ({
  maxInactivityInSeconds,
  maxActivityInSeconds,
  userId,
  logUserSession,
}) => {
  const localStorageSessionStartedKey = `sessionStarted${userId ? userId : ''}`;
  const localStorageInactivityKey = `inactivityTime${userId ? userId : ''}`;
  const localStorageTabsOpenedKey = `tabsOpened${userId ? userId : ''}`;

  const getSessionStartedAt = useCallback(() => {
    return parseInt(localStorage.getItem(localStorageSessionStartedKey));
  }, [localStorageSessionStartedKey]);

  const finishSession = useCallback(() => {
    logUserSession({
      sessionStartedAt: getSessionStartedAt(),
      sessionFinishedAt: getTimestamp(),
      userId: userId,
    });

    localStorage.setItem(localStorageInactivityKey, '0');
    localStorage.setItem(localStorageSessionStartedKey, '0');
  }, [getSessionStartedAt, localStorageInactivityKey, localStorageSessionStartedKey, logUserSession, userId]);

  const updateInactivityTime = useCallback((value) => {
    localStorage.setItem(localStorageInactivityKey, value.toString());
    if (value >= maxInactivityInSeconds) {
      finishSession();
    }
  }, [finishSession, localStorageInactivityKey, maxInactivityInSeconds]);

  const getInactivityTime = useCallback(() => {
    return parseInt(localStorage.getItem(localStorageInactivityKey));
  }, [localStorageInactivityKey]);

  const resetInactivityTime = useCallback(() => {
    updateInactivityTime(0);
  }, [updateInactivityTime]);

  const getOpenedTabsNumber = useCallback(() => {
    const tabsNumber = parseInt(localStorage.getItem(localStorageTabsOpenedKey));

    return isNaN(tabsNumber) ? 0 : tabsNumber;
  }, [localStorageTabsOpenedKey]);

  const updateOpenedTabsNumber = useCallback((value) => {
    localStorage.setItem(localStorageTabsOpenedKey, value.toString());

    if (value === 0) {
      finishSession();
    }
  }, [finishSession, localStorageTabsOpenedKey]);

  const resetSessionStartedAt = useCallback(() => {
    localStorage.setItem(localStorageSessionStartedKey, getTimestamp().toString());
  }, [localStorageSessionStartedKey]);

  const openTab = useCallback(() => {
    if (!getSessionStartedAt()) {
      resetSessionStartedAt();
    }

    resetInactivityTime();
    updateOpenedTabsNumber(getOpenedTabsNumber() + 1);
  }, [getOpenedTabsNumber, getSessionStartedAt, resetInactivityTime, resetSessionStartedAt, updateOpenedTabsNumber]);

  const closeTab = useCallback(() => {
    const currentlyOpenedTabsNumber = getOpenedTabsNumber();
    const openedTabsNumberAfterClosing = currentlyOpenedTabsNumber > 0 ? currentlyOpenedTabsNumber - 1 : 0;

    updateOpenedTabsNumber(openedTabsNumberAfterClosing);
  }, [getOpenedTabsNumber, updateOpenedTabsNumber]);

  useEffect(() => {
    openTab();

    window.addEventListener('click', resetInactivityTime);
    window.addEventListener('keypress', resetInactivityTime);
    window.addEventListener('scroll', resetInactivityTime);
    window.addEventListener('mousemove', resetInactivityTime);
    window.addEventListener('beforeunload', closeTab);

    return () => {
      window.removeEventListener('beforeunload', closeTab);
      window.removeEventListener('click', resetInactivityTime);
      window.removeEventListener('keypress', resetInactivityTime);
      window.removeEventListener('scroll', resetInactivityTime);
      window.removeEventListener('mousemove', resetInactivityTime);

      closeTab();
    };
  }, [closeTab, finishSession, openTab, resetInactivityTime, updateOpenedTabsNumber]);

  useEffect(() => {
    const intervalDurationInSeconds = 1;

    const interval = setInterval(() => {
      if (!getSessionStartedAt()) {
        resetSessionStartedAt();
      }

      const activityTimeInSeconds = getTimestamp() - getSessionStartedAt();

      if (activityTimeInSeconds >= maxActivityInSeconds) {
        finishSession();
      }

      let inactivityTime = getInactivityTime();
      inactivityTime += intervalDurationInSeconds;

      updateInactivityTime(inactivityTime);
    }, intervalDurationInSeconds * 1000);

    return () => clearInterval(interval);
  }, [
    finishSession,
    getInactivityTime,
    getSessionStartedAt,
    maxActivityInSeconds,
    resetSessionStartedAt,
    updateInactivityTime,
  ]);

  const getTimestamp = () => {
    return Math.round(new Date().getTime() / 1000);
  };

  return <></>;
};

ActivityTracker.propTypes = {
  maxInactivityInSeconds: PropTypes.number.isRequired,
  maxActivityInSeconds: PropTypes.number.isRequired,
  logUserSession: PropTypes.func,
  userId: PropTypes.number,
};

const mapDispatchToProps = {
  logUserSession: logUserSessionAsync.request,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTracker);
