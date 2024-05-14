import { memo, useContext, useEffect, useState } from 'react';
import { Avatar, CustomButton, Loader, PageLoader } from '@/components/common';
import DocumentsCard from '../DocumentsModal/DocumentsCard/DocumentsCard';
import { ApprovalContext } from '../../providers';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectApprovalItemsLoading, selectRepToApprove, updateApprovalDocumentsAsync } from '@/redux/approval';
import { ZoomInIcon } from '@heroicons/react/outline';
import { DOCUMENT_STATUS, MODAL_ACTIONS } from '../../lib';
import { DOCUMENTS } from '@/lib/constants';
import { addFsExcludeClass } from '@/lib/utils';
import { documentViewLinkLoadingSelector } from '@/redux/loading';
import { requestDocumentViewLinkAsync } from '@/redux/contracts';

const { PENDING, APPROVED, REJECTED } = DOCUMENT_STATUS;

const DocumentsModal = ({ closeModal, linkLoading }) => {
  const dispatch = useDispatch();
  const rep = useSelector(selectRepToApprove);
  const isLoading = useSelector(selectApprovalItemsLoading);

  const { document, allDocuments, setDocument, toggleViewImage } = useContext(ApprovalContext);

  const [notApprovedItems, setNotApprovedItems] = useState([]);
  const [approvedItems, setApprovedItems] = useState([]);

  const isDisabled = !approvedItems.length && !notApprovedItems.some((doc) => doc.status === REJECTED);

  const getNextDocument = () => {
    if (document?.status !== PENDING) {
      const nextDocument = allDocuments.find((doc) => doc.status === PENDING);

      setDocument(nextDocument ?? {});
    }
  };

  useEffect(() => {
    const notApproved = allDocuments.filter((doc) =>
      doc.status === PENDING || doc.status === REJECTED);
    const approved = allDocuments.filter((doc) => doc.status === APPROVED);

    setNotApprovedItems(notApproved);
    setApprovedItems(approved);

    getNextDocument();
  }, [allDocuments]);

  const onSubmitApprove = () => {
    dispatch(updateApprovalDocumentsAsync.request({
      userId: rep.userId,
      documents: allDocuments,
    }));
  };

  const onLinkLoaded = ({ link }) => {
    window.open(link, '_blank')?.focus();
  };

  const onClickZoom = () => {
    if (document.docusignDocumentType) {
      dispatch(requestDocumentViewLinkAsync.request({
        userId: rep.userId,
        documentType: document.docusignDocumentType,
        callback: onLinkLoaded,
      }));
    } else {
      toggleViewImage();
    }
  };

  return (
    <>
      {isLoading && <PageLoader className="rounded-2xl" />}
      <div className="px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar
            square
            image={rep?.avatar}
            userName={rep?.userName}
            className="w-6 h-6"
          />
          <h1 className={addFsExcludeClass('text-gray-900 font-semibold')}>{rep?.userName}</h1>
        </div>
      </div>

      <div className="flex flex-nowrap">
        <div className="basis-2/3 border-r border-gray-200">
          {notApprovedItems.length ? (
            <DocumentsCard
              title="Needs approval"
              documents={notApprovedItems}
              hasDivider={Boolean(approvedItems.length)}
            />
          ) : null}
          {approvedItems.length ? (
            <DocumentsCard title="Approved items" documents={approvedItems} />
          ) : null}
          <div />
        </div>
        <div className="basis-1/3 bg-gray-50 p-2">
          <div className="w-64 h-64">
            {linkLoading ? <Loader /> : document?.image ? (
              <button
                type="button"
                className="group w-full h-full rounded-md border border-gray-200 relative"
                onClick={onClickZoom}
              >
                <img
                  key={document?.image}
                  src={document?.image}
                  alt={DOCUMENTS[document?.documentType]}
                  className={addFsExcludeClass('w-full h-full rounded-md object-contain')}
                />
                <span className="sr-only">Open image</span>
                <div className="invisible flex items-start justify-end p-4 group-hover:visible rounded-md absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-black opacity-50 transition-all duration-200" />
                <ZoomInIcon className="invisible group-hover:visible w-7 h-7 stroke-white absolute top-4 right-4 z-10 transition-all duration-200" />
              </button>
            ) : null}
            {document?.helpText}
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-end gap-x-3 border-t">
        <CustomButton
          color="white"
          onClick={closeModal}
          className="px-6 py-2 text-gray-700 font-normal shadow-none"
        >
          {MODAL_ACTIONS.CANCEL}
        </CustomButton>
        <CustomButton
          color="green"
          onClick={onSubmitApprove}
          disabled={isDisabled}
          className="px-6 py-2 font-normal"
        >
          {MODAL_ACTIONS.SUBMIT}
        </CustomButton>
      </div>
    </>
  );
};

DocumentsModal.propTypes = {
  closeModal: PropTypes.func,
};


const mapStateToProps = (state) => {
  return {
    linkLoading: documentViewLinkLoadingSelector(state),
  };
};

export default connect(mapStateToProps)(DocumentsModal);
