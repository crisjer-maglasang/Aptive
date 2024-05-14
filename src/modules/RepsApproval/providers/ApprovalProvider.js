import { createContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectDocumentsToApprove } from '@/redux/approval';

export const ApprovalContext = createContext({});

export const ApprovalProvider = ({ children }) => {
  const repDocuments = useSelector(selectDocumentsToApprove);

  const [allDocuments, setAllDocuments] = useState([]);
  const [document, setDocument] = useState({});
  const [isViewImage, setIsViewImage] = useState(false);
  const [isDeclineModal, setIsDeclinedModal] = useState(false);

  useEffect(() => {
    setAllDocuments(repDocuments);
  }, [repDocuments]);

  const toggleViewImage = useCallback(() => {
    setIsViewImage(!isViewImage);
  }, [isViewImage]);

  const toggleDeclineModal = useCallback(() => {
    setIsDeclinedModal(!isDeclineModal);
  }, [isDeclineModal]);

  const updateDocuments = useCallback((documentData) => {
    const updatedDocuments = allDocuments.map((doc) =>
      (doc.id === documentData.id ? { ...documentData } : doc));

    setDocument(documentData);
    setAllDocuments(updatedDocuments);

    if (isDeclineModal) {
      toggleDeclineModal();
    }
  }, [allDocuments, isDeclineModal]);

  const state = useMemo(() => ({
    document,
    allDocuments,
    isViewImage,
    isDeclineModal,
    setDocument,
    setAllDocuments,
    updateDocuments,
    toggleViewImage,
    toggleDeclineModal,
  }), [document, allDocuments, isViewImage, isDeclineModal]);

  return (
    <ApprovalContext.Provider value={state}>
      {children}
    </ApprovalContext.Provider>
  );
};

ApprovalProvider.propTypes = {
  children: PropTypes.node,
};

