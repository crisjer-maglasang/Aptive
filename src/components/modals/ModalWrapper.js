import { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';

const ModalWrapper = ({ children, isOpened, width, onCloseModal }) => {
  return (
    <Transition.Root show={Boolean(isOpened)} as={Fragment}>
      <Dialog
        static
        open={isOpened}
        onClose={onCloseModal}
        className="fixed inset-0 min-h-screen overflow-y-auto grid z-[2000]"
      >
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
        <div className={`self-center justify-self-center p-2 ${width ?? ''}`}>
          <Dialog.Panel className="rounded-lg bg-white shadow-xl relative">
            <div tabIndex={0} aria-hidden={true} />
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

ModalWrapper.propTypes = {
  width: PropTypes.string,
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default memo(ModalWrapper);
