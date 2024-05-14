import classNames from 'classnames';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';
import { onboardingConstants } from '@/lib';

const ProfileButton = ({ onClick }) => {
  const { VIEW_PROFILE_BUTTON } = onboardingConstants;

  return (
    <Menu as="div" className="relative grid grid-flow-col pt-2 pb-2 h-[3.5rem]">
      <Menu.Button className="p-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <DotsVerticalIcon
          style={{
            display: 'flex',
            alignItems: 'right',
            justifyContent: 'space-between',
          }}
          className="w-3 h-3"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute w-48 mt-2 origin-bottom-left bg-white rounded-md shadow-lg left-0 bottom-2 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={onClick}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {VIEW_PROFILE_BUTTON}
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileButton;
