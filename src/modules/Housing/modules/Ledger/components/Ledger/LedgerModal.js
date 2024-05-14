import { ModalWrapper } from '@/components';
import LedgerForm from './LedgerForm';
import PropTypes from 'prop-types';

const LedgerModal = ({ isOpen, onClose, refreshLedgers } ) => {
  return (
    <ModalWrapper isOpened={isOpen} onCloseModal={onClose}>
      <LedgerForm onClose={onClose} refreshLedgers={refreshLedgers} />
    </ModalWrapper>
  );
};

LedgerModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshLedgers: PropTypes.func,
};

export default LedgerModal;
