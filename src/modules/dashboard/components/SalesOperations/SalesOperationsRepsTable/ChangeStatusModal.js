import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '@/components';

const ChangeStatusModal = ({ isOpened, status, onCancel, onAction, children, getConfirmationMessage, repStatuses }) => {
  const [statusText, setStatusText] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    if (isOpened) {
      setStatusText(repStatuses.find((repStatus) => repStatus.statusCode === status)?.statusTitle);

      setConfirmationMessage(getConfirmationMessage(status, statusText));
    }
  }, [getConfirmationMessage, isOpened, repStatuses, status, statusText]);

  return (
    <ConfirmationModal
      isOpened={isOpened}
      modalWidth="max-w-[528px] w-full"
      title={`Changing status to “${statusText}“`}
      onCancel={onCancel}
      onAction={onAction}
      message={confirmationMessage}
    >
      {children}
    </ConfirmationModal>
  );
};

ChangeStatusModal.propTypes = {
  isOpened: PropTypes.bool,
  status: PropTypes.string,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  onAction: PropTypes.func,
  children: PropTypes.node,
  getConfirmationMessage: PropTypes.func,
  repStatuses: PropTypes.arrayOf(PropTypes.object),
};

export default memo(ChangeStatusModal);
