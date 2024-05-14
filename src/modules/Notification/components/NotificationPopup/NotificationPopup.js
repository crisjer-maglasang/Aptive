import { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { Popover, Transition } from '@headlessui/react';
import NotificationItem from '../NotificationItem/NotificationItem';
import { useSelector } from 'react-redux';
import { notificationsSelector } from '@/redux/notifications';

const NotificationPopup = ({ isOpened, openProfile }) => {
  const notifications = useSelector(notificationsSelector);

  return (
    <Transition
      show={isOpened}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Popover.Panel
        className="max-w-[380px] max-h-[80vh] overflow-y-auto flex flex-col absolute right-0 top-14 z-20 bg-white shadow-popup rounded-lg overflow-hidden animate-fade-in"
      >
        {({ close }) => (
          <>
            <div className="sticky -top-0.5 z-10 w-full px-4 py-2 bg-zinc-50 border-b">
              <p className="text-sm text-gray-800 font-semibold uppercase">Notifications</p>
            </div>
            {notifications?.map((item) => (
              <NotificationItem
                key={item.id}
                id={item.id}
                type={item.notificationType}
                data={item.content}
                dateCreated={item?.dateCreated}
                isRead={item.isRead}
                close={close}
                openProfile={openProfile}
              />
            ))}
          </>
        )}
      </Popover.Panel>
    </Transition>
  );
};

NotificationPopup.propTypes = {
  isOpened: PropTypes.bool,
  openProfile: PropTypes.func,
};

export default memo(NotificationPopup);
