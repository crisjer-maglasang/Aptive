import { Dialog, Transition } from '@headlessui/react';
import { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { mergeClassName } from '@/lib/utils';

const SideDrawerWrapper = ({ children, isOpened, onCloseModal, middle, large, extraLarge }) => {
  const styles = mergeClassName(
    'w-screen',
    {
      'max-w-md': middle,
      'max-w-xl': large,
      'max-w-2xl': extraLarge,
    },
  );

  return (
    <Transition.Root show={Boolean(isOpened)} as={Fragment}>
      <Dialog
        static
        open={isOpened}
        onClose={onCloseModal}
        className="fixed inset-0 overflow-hidden grid z-[2000]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-600 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className={styles}>
                <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

SideDrawerWrapper.propTypes = {
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  onCloseModal: PropTypes.func,
  middle: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

export default memo(SideDrawerWrapper);
