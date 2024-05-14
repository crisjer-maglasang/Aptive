import { memo } from 'react';
import PropTypes from 'prop-types';
import { ExclamationIcon } from '@heroicons/react/outline';
import ConfirmationActions from './ConfirmationActions';
import ModalWrapper from './ModalWrapper';
import { MODAL_ACTIONS } from '@/modules/RepsApproval/lib';

const ConfirmationModal = ({
  modalWidth,
  isOpened,
  onCancel,
  onAction,
  title,
  message,
  children,
  cancelLabel,
  confirmLabel,
}) => {
  return (
    <ModalWrapper
      onCloseModal={onCancel}
      isOpened={isOpened}
      width={modalWidth}
    >
      <div className="p-6 flex flex-nowrap items-start justify-between gap-x-4">
        <div className="w-10">
          <div className="w-10 h-10 flex items-center justify-center bg-aptivered-lightest rounded-full">
            <ExclamationIcon className="h-6 w-6 stroke-aptivered" aria-hidden="true" />
          </div>
        </div>
        <div className="grow">
          <h1 className="mb-2 text-lg font-medium text-gray-900">{title}</h1>
          {message
            ? <p className=" mb-4 text-sm text-gray-600">{message}</p>
            : null}
          {children}
          {onAction ? (
            <ConfirmationActions
              onAction={onAction}
              onCancel={onCancel}
              cancelLabel={cancelLabel}
              confirmLabel={confirmLabel}
            />
          ) : null}
        </div>
      </div>
    </ModalWrapper>
  );
};

ConfirmationModal.defaultProps = {
  cancelLabel: MODAL_ACTIONS.CANCEL,
  confirmLabel: MODAL_ACTIONS.SUBMIT,
};

ConfirmationModal.propTypes = {
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  modalWidth: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  isDisabled: PropTypes.bool,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onAction: PropTypes.func,
};

export default memo(ConfirmationModal);
