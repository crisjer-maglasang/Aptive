import { ModalWrapper } from '@/components';
import PropTypes from 'prop-types';
import ComplexForm from './ComplexForm';
import { CloseIconButton } from '@/components/common';

const ComplexModal = ({
  isOpen,
  onClose,
  complexId,
}) => {

  return (
    <ModalWrapper
        isOpened={isOpen}
        width="max-w-2xl w-full"
        onCloseModal={onClose}
      >
        <div className="px-6 py-6 border-b border-gray-200 flex justify-between">
          <h2 className="text-lg font-bold text-aptivegreen">{complexId ? 'Update Complex' : 'Add Complex'}</h2>
          <CloseIconButton
            onClose={onClose}
            classes="w-7 h-7 text-gray-400 hover:text-gray-500 focus:outline-aptivegreen p-0"
          />
        </div>
        <ComplexForm complexId={complexId} onClose={onClose} />
      </ModalWrapper>
  );
};

ComplexModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ComplexModal;
