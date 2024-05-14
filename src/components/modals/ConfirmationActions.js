import { CustomButton } from '@/components/common';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { MODAL_ACTIONS } from '@/modules/RepsApproval/lib';

const ConfirmationActions = ({
  isDisabled,
  onCancel,
  onAction,
  cancelLabel,
  confirmLabel,
}) => {
  return (
    <div className="flex items-center justify-end gap-x-3">
      <CustomButton
        color="white"
        onClick={onCancel}
        className="px-6 py-2 text-gray-700 font-normal shadow-none"
      >
        {cancelLabel}
      </CustomButton>
      <CustomButton
        type="submit"
        color="red"
        disabled={isDisabled}
        className="px-6 py-2 font-normal"
        onClick={onAction}
      >
        {confirmLabel}
      </CustomButton>
    </div>
  );
};

ConfirmationActions.defaultProps = {
  cancelLabel: MODAL_ACTIONS.CANCEL,
  confirmLabel: MODAL_ACTIONS.SUBMIT,
};

ConfirmationActions.propTypes = {
  isDisabled: PropTypes.bool,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onAction: PropTypes.func,
};

export default memo(ConfirmationActions);
