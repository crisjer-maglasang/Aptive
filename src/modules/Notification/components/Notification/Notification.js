import { memo } from 'react';
import PropTypes from 'prop-types';
import { BellIcon } from '@heroicons/react/outline';
import { Popover } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { mergeClassName } from '@/lib/utils';
import { hasNotificationsSelector, hasUnreadNotificationsSelector, selectIsLoading } from '@/redux/notifications';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

const Notification = ({ openProfile }) => {
  const hasNotifications = useSelector(hasNotificationsSelector);
  const hasUnreadNotifications = useSelector(hasUnreadNotificationsSelector);
  const isLoading = useSelector(selectIsLoading);

  const isDisabled = isLoading || !hasNotifications;

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            disabled={isDisabled}
            className="group relative flex items-center justify-center p-1 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-aptivegreen"
          >
            <BellIcon
              className={mergeClassName(
                'h-6 w-6 stroke-gray-400',
                { 'group-hover:stroke-gray-500': hasNotifications, 'stroke-gray-300': isDisabled },
              )}
              aria-hidden="true"
            />
            {hasUnreadNotifications
              && <div className="w-2 h-2 absolute top-1.5 right-1.5 rounded-full bg-aptivered" />}
          </Popover.Button>
          <NotificationPopup isOpened={open} openProfile={openProfile} />
        </>
      )}
    </Popover>
  );
};

Notification.propTypes = {
  openProfile: PropTypes.func,
};

export default memo(Notification);
