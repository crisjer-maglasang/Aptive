import React, { useState } from 'react';
import { PencilAltIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { Icon } from '@/components';

const ProfileTab = ({ tabName, info }) => {
  const [showInfo, setShowInfo] = useState(false);

  function handleClick() {
    setShowInfo(!showInfo);
  }

  return (
    <div>
      <div
        onClick={handleClick}
        className="relative flex justify-between px-4 py-3 mt-2 overflow-hidden bg-white shadow sm:rounded-md sm:px-6"
      >
        <h3 className="text-sm font-medium leading-6 text-gray-900 ">
          {tabName}
        </h3>
        <div className="flex items-center justify-between w-14">
          <PencilAltIcon className="justify-end w-4 h-4 opacity-50 stroke-current text-aptivegreen hover:opacity-100" />
          <Icon
            icon="arrowDown"
            className={`${
              showInfo ? 'transform rotate-90' : ''
            } opacity-50 text-aptivegreen hover:opacity-100`}
          />
        </div>
      </div>
      <Disclosure>
        {({ open }) => (
          <>
            {showInfo && (
              <Disclosure.Panel static>
                <div className="px-4 py-3 overflow-hidden bg-white rounded-b-lg shadow sm:px-6">
                  {info}
                </div>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ProfileTab;
