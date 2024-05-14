import { memo } from 'react';
import PropTypes from 'prop-types';
import { MailIcon } from '@heroicons/react/outline';
import ModalWrapper from './ModalWrapper';
import { MODAL_ACTIONS } from '@/modules/RepsApproval/lib';
import { CustomButton } from '@/components/common';

const InformationModal = ({
  modalWidth,
  isOpened,
  title,
  message,
  children,
  closeLabel,
  onClose,
}) => {
  return (
    <ModalWrapper
      onCloseModal={onClose}
      isOpened={isOpened}
      width={modalWidth}
    >
      <div className="p-6 flex flex-nowrap items-start justify-between gap-x-4">
        <div className="w-10">
          <div className="w-10 h-10 flex items-center justify-center bg-aptivegreen rounded-full">
            <MailIcon className="h-6 w-6 stroke-white" aria-hidden="true" />
          </div>
        </div>
        <div className="grow">
          <h1 className="mb-2 text-lg font-medium text-gray-900">{title}</h1>
          {message
            ? <p className=" mb-4 text-sm text-gray-600">{message}</p>
            : null}
          {children}
          <div className="flex items-center justify-end gap-x-3">
            <CustomButton
              color="green"
              onClick={onClose}
              className="px-6 py-2 font-normal"
            >
              {closeLabel}
            </CustomButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

InformationModal.defaultProps = {
  closeLabel: MODAL_ACTIONS.CLOSE,
};

InformationModal.propTypes = {
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  modalWidth: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  isDisabled: PropTypes.bool,
  closeLabel: PropTypes.string,
  onClose: PropTypes.func,
};

export default memo(InformationModal);
