import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { mergeClassName } from '@/lib';
import classNames from 'classnames';

const NavigationMenu = ({ name, navigationOption, isBrand }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCurrentLocation = () => {
    const paths = navigationOption.map((item) => item.path);

    return paths.includes(location.pathname);
  };

  return (
    <Menu
      as="div"
      className={classNames(
        'relative inline-flex items-center',
        !isBrand &&
          (isCurrentLocation()
            ? 'border-gray-900 text-gray-900 border-b-4'
            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-700 border-b-2')
      )}
    >
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="flex items-center justify-between gap-x-3"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <div
                className={classNames(
                  isBrand && 'flex items-center justify-center',
                  'sm:text-sm leading-4 text-gray-700 font-medium px-1 pt-1'
                )}
              >
                {name}
              </div>
              {isBrand && (
                <ChevronDownIcon
                  className={mergeClassName('w-4 h-4 stroke-gray-500', {
                    '-rotate-180': open,
                  })}
                />
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
              className={classNames(
                'z-[1500] absolute top-[40px]  bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                isBrand
                  ? 'w-48 py-1 rounded-md'
                  : ' w-[350px] py-2 rounded-t-none rounded-lg'
              )}
            >
              {navigationOption.map((item) =>
                item.isDisplayed ? (
                  <Menu.Item as="li" key={item.name}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={mergeClassName(
                          'w-full text-left',
                          isBrand
                            ? 'px-4 py-2 text-sm text-gray-700'
                            : 'px-8 py-[10px] gap-2',
                          { 'bg-gray-100': active }
                        )}
                        onClick={() => navigate(item.path)}
                      >
                        {isBrand ? (
                          item.name
                        ) : (
                          <div className="inline-flex gap-1">
                            <div className="w-full flex flex-col gap-1">
                              <div className="text-base leading-5 text-gray-900">
                                {item.name}
                              </div>
                              {item.description && (
                                <div className="text-sm leading-4 text-gray-600">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            <ChevronRightIcon className="w-5 h-5 stroke-gray-400" />
                          </div>
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ) : null
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default NavigationMenu;
