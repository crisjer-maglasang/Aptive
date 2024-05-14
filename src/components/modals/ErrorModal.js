import { ExclamationIcon } from '@heroicons/react/outline';
import ModalWrapper from './ModalWrapper';
import { CustomButton } from '@/components/common';
import PropTypes from 'prop-types';

const ErrorModal = ({ isOpened, onCancel, title, message, children }) => {
  return (
    <ModalWrapper
      onCloseModal={onCancel}
      isOpened={isOpened}
      width="max-w-[512px] w-full"
    >
      <div className="p-6 flex flex-nowrap items-start justify-between gap-x-4">
        <div className="w-10">
          <div className="w-10 h-10 flex items-center justify-center bg-aptivered-lightest rounded-full">
            <ExclamationIcon className="h-6 w-6 stroke-aptivered" aria-hidden="true" />
          </div>
        </div>
        <div className="grow">
          {title
            ? <h1 className="mb-2 text-lg font-medium text-gray-900">{title}</h1>
            : null}
          {message
            ? <p className="mb-4 text-sm text-gray-600">{message}</p>
            : null}
          {children}
          <div className="flex items-center justify-end">
            <CustomButton
              color="red"
              className="px-6 py-2 font-normal"
              onClick={onCancel}
            >
              OK
            </CustomButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

ErrorModal.propTypes = {
  isOpened: PropTypes.bool,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
};

export default ErrorModal;
