import { memo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ModalWrapper } from '@/components';
import DocumentsModal from '../DocumentsModal/DocumentsModal';
import ImageModal from '../ImageModal/ImageModal';
import DeclineModal from '../DeclineModal/DeclineModal';
import { ApprovalContext } from '../../providers';
import { getRepToApprove, requestApprovalDocumentsAsync, selectLoadingState, setIsApproved } from '@/redux/approval';

const DocumentsApproval = ({ isOpened, closeModal }) => {
  const dispatch = useDispatch();
  const isRepsLoading = useSelector(selectLoadingState);
  const { isViewImage, isDeclineModal } = useContext(ApprovalContext);

  useEffect(() => {
    if (isRepsLoading) {
      closeModal();
    }

    return () => {
      dispatch(requestApprovalDocumentsAsync.success({ items: [] }));
      dispatch(getRepToApprove());
      dispatch(setIsApproved(false));
    };
  }, [isRepsLoading]);

  return (
    <>
      <ModalWrapper
        isOpened={isOpened}
        onCloseModal={closeModal}
        width={isViewImage ? 'max-w-[1440px]' : 'max-w-[816px] w-full'}
      >
        {isViewImage ? <ImageModal /> : <DocumentsModal closeModal={closeModal} />}
      </ModalWrapper>
      {isDeclineModal && <DeclineModal />}
    </>
  );
};

DocumentsApproval.propTypes = {
  isOpened: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default memo(DocumentsApproval);
