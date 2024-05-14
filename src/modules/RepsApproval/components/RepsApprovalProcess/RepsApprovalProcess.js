import { memo } from 'react';
import PropTypes from 'prop-types';
import { ApprovalProvider } from '../../providers';
import DocumentsApproval from '../DocumentsApproval/DocumentsApproval';

const RepsApprovalProcess = ({ isOpened, closeModal }) => {
  return (
    <ApprovalProvider>
      <DocumentsApproval isOpened={isOpened} closeModal={closeModal} />
    </ApprovalProvider>
  );
};

RepsApprovalProcess.propTypes = {
  isOpened: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default memo(RepsApprovalProcess);
