import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { userSelector } from '@/redux/auth';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { dashboardConstants, mergeClassName } from '@/lib';
import { Avatar } from '@/components/common';

const {
  SUPER_ADMIN_GROUP,
  DEALER_ADMIN_GROUP,
  ADMIN_LABEL,
} = dashboardConstants;

const UserMenu = ({ user, userNavigation }) => {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="flex items-center justify-between gap-x-3"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <Avatar image={user?.profile_img} userName={`${user?.first_name} ${user?.last_name}`} />
              {[SUPER_ADMIN_GROUP, DEALER_ADMIN_GROUP].includes(user?.group_id) && (
                <>
                  <div className="flex items-center justify-center px-2.5 py-1.5 rounded-md bg-green-100 text-green-800 text-xs font-medium">
                    {ADMIN_LABEL}
                  </div>
                  <ChevronDownIcon className={mergeClassName('w-4 h-4 stroke-gray-500', { '-rotate-180': open })} />
                </>
              )}
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              static
              className="z-[1500] absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                item.isDisplayed ? (
                  <Menu.Item as="li" key={item.name}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={mergeClassName(
                          'w-full px-4 py-2 text-sm text-gray-700 text-left',
                          { 'bg-gray-100': active },
                        )}
                        onClick={item.onClick}
                      >
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ) : null
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  user: userSelector(state),
});

export default connect(mapStateToProps, null)(UserMenu);
