import { useCallback, useState } from 'react';
import RepsApproval from '../components/RepsApproval';
import RepsApprovalProcess from '../components/RepsApprovalProcess/RepsApprovalProcess';

const RepsApprovalPage = () => {
  const [isModal, setIsModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  return (
    <>
      <RepsApproval openModal={onToggleModal} />
      {isModal && <RepsApprovalProcess isOpened={isModal} closeModal={onToggleModal} />}
    </>
  );
};

export default RepsApprovalPage;
