import { useCallback, useRef, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { ErrorBox } from '@/components';
import { dashboardConstants } from '@/lib';
import { requestContractLinkAsync, deleteContractAsync } from '@/redux/contracts';
import { contractActionLoadingSelector } from '@/redux/loading';
import { contractsLinkErrorSelector, deleteContractErrorsSelector } from '@/redux/errors';
import { PageLoader } from '@/components/common';
import { ConfirmationModal, ModalWrapper } from '@/components';
import ContractDetails from './ContractDetails';

const {
  DELETE_BUTTON,
  DELETE_CONFIRMATION_TITLE,
  DELETE_CONFIRMATIONS_BUTTON,
} = dashboardConstants;

const ViewContract = ({
  contract,
  rep,
  signEnabled,
  viewEnabled,
  viewError,
  isOpen,
  onClose,
  loading,
  requestContractLink,
  deleteContract,
  deleteErrors,
}) => {
  const cancelButtonRef = useRef(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const onConfirmationDelete = useCallback(() => {
    setConfirmationOpen(false);

    if (contract) {
      deleteContract({
        contractId: contract.id,
        callback: () => onClose({ reloadContracts: true }),
      });
    }
  }, [contract, deleteContract]);

  const onConfirmationBack = () => {
    setConfirmationOpen(false);
  };

  const onLinkLoaded = useCallback(({ link }) => {
    // redirect to the provided link
    window.open(link, '_blank')?.focus();
  }, []);

  const onViewClicked = useCallback(() => {
    if (contract && rep) {
      requestContractLink({
        action: 'view',
        contractId: contract.id,
        recruitId: rep.id,
        callback: onLinkLoaded,
      });
    }
  }, [contract, rep, onLinkLoaded, requestContractLink]);

  const onDeleteClicked = useCallback(() => {
    setConfirmationOpen(true);
  }, []);

  const onSignClicked = useCallback(() => {
    if (contract && rep) {
      requestContractLink({
        action: 'sign',
        contractId: contract.id,
        recruitId: rep.id,
        callback: onLinkLoaded,
      });
    }
  }, [contract, rep, onLinkLoaded, requestContractLink]);

  return (
    <>
      <ModalWrapper
        isOpened={isOpen}
        width="max-w-[592px] w-full"
        onCloseModal={onClose}
      >
        {loading && <PageLoader />}
        <div className="flex justify-between px-4 py-4 border-b">
          <span className="text-gray-700">
            {rep && (`${rep.first_name} ${rep.last_name}`)}
            {' '}
            &gt; Agreement Details
          </span>
          <button
            type="button"
            className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <XIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        {viewError && <ErrorBox errors={viewError} />}
        {deleteErrors && <ErrorBox errors={deleteErrors} />}
        <div className="px-4 pt-5 pb-4 overflow-y-auto bg-gray-50 sm:p-6 sm:pb-4 h-80">
          <ContractDetails contract={contract} />
        </div>
        <div className="px-4 py-3 bg-white rounded-b-lg border-t sm:px-6 sm:flex sm:flex-row-reverse">
          {contract?.isPending ? (
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-red-600 hover:red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-40 sm:text-sm"
              onClick={onDeleteClicked}
            >
              {DELETE_BUTTON}
            </button>
          ) : null}
          {viewEnabled ? (
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-aptivegreen hover:bg-aptivegreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen-500 sm:ml-3 sm:w-40 sm:text-sm"
              onClick={onViewClicked}
            >
              View
            </button>
          ) : null}
          {signEnabled ? (
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-aptivegreen hover:bg-aptivegreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen-500 sm:ml-3 sm:w-40 sm:text-sm"
              onClick={onSignClicked}
            >
              Sign
            </button>
          ) : null}
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen sm:mt-0 sm:ml-3 sm:w-20 sm:text-sm"
            onClick={onClose}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </ModalWrapper>

      <ConfirmationModal
        isOpened={confirmationOpen}
        modalWidth="max-w-[592px] w-full"
        onCancel={onConfirmationBack}
        onAction={onConfirmationDelete}
        title={DELETE_CONFIRMATION_TITLE}
        cancelLabel="Go back"
        confirmLabel={DELETE_CONFIRMATIONS_BUTTON}
      />
    </>
  );
};

const mapStateToProps = (
  state,
  { contract, recruit },
) => {
  const signEnabled = contract && contract.canSign;

  const viewEnabled = contract && contract.signatureRequestId;

  const rep = recruit && recruit.id && state?.reps && state?.reps[recruit.id];

  return {
    loading: contractActionLoadingSelector(state),
    viewError: contractsLinkErrorSelector(state),
    deleteErrors: deleteContractErrorsSelector(state),
    contract,
    rep,
    signEnabled,
    viewEnabled,
  };
};

const mapDispatchToProps = {
  requestContractLink: requestContractLinkAsync.request,
  deleteContract: deleteContractAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewContract);
