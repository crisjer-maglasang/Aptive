import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { XIcon } from '@heroicons/react/outline';
import { ConfirmationModal, ModalWrapper, Loader } from '@/components';
import { availableContractsLoadingSelector } from '@/redux/loading';
import { requestAvailableContractsAsync, saveAndSendContractAsync } from '@/redux/contracts';
import { dashboardConstants } from '@/lib';
import NewAgreementList from './NewAgreementList';
import { addFsExcludeClass } from '@/lib/utils';
import PropTypes from 'prop-types';

const {
  QUIT_CONFIRMATION_TITLE,
  QUIT_CONFIRMATION_MESSAGE,
  QUIT_CONFIRMATIONS_BUTTON,
} = dashboardConstants;

const AddContract = (
  {
    agreements,
    rep,
    isOpen,
    onClose,
    loading,
    requestAvailableContracts,
    saveAndSendContract,
  },
) => {
  const [selectedAgreements, setSelectedAgreements] = useState([]);
  const [addendums, setAddendums] = useState({});
  const [mds, setMds] = useState({});
  const [addendumOpened, setAddendumOpened] = useState();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const onConfirmationQuit = () => {
    setConfirmationOpen(false);
    closeModal();
  };

  const onConfirmationBack = () => {
    setConfirmationOpen(false);
  };

  const onToggleAddendum = useCallback(
    ({ agreement, addendum }) => {
      setAddendumOpened(addendumOpened ? null : agreement.id);
      setAddendums({
        ...addendums,
        [agreement.id]: addendum,
      });
    },
    [addendumOpened, addendums],
  );

  const onToggleSelectedAgreement = useCallback(
    ({ agreement }) => {
      if (selectedAgreements.includes(agreement.id)) {
        // remove it
        setSelectedAgreements(
          selectedAgreements.filter(
            (selectedAgreement) => selectedAgreement !== agreement.id,
          ),
        );

        if (agreement.is_addendum && addendumOpened) {
          setAddendumOpened(null);
          setAddendums({
            ...addendums,
            [agreement.id]: '',
          });
        }
      } else {
        // add it
        setSelectedAgreements([...selectedAgreements, agreement.id]);

        if (agreement.is_addendum && !addendumOpened) {
          setAddendumOpened(agreement.id);
        }
      }
    },
    [selectedAgreements, addendumOpened],
  );

  const onChangeMd = useCallback(
    ({ agreement, md }) => {
      setMds({
        ...mds,
        [agreement.id]: md,
      });
    },
    [mds],
  );

  useEffect(() => {
    if (rep?.id && isOpen) {
      requestAvailableContracts({ recruitId: rep?.id });
    }
  }, [requestAvailableContracts, rep?.id, isOpen]);

  const closeModal = () => {
    onClose();
    setSelectedAgreements([]);
    setAddendums({});
    setMds({});
    setAddendumOpened(null);
  };

  const onCancelClicked = useCallback(() => {
    setConfirmationOpen(true);
  }, [confirmationOpen]);

  const onSaveClicked = useCallback(() => {
    selectedAgreements.forEach((agreementId) => {
      const agreement = agreements.find((ag) => ag.id === agreementId);

      if (!agreement) {
        console.warn('Could not find agreement: ', agreementId);

        return;
      }

      saveAndSendContract({
        recruitId: rep.id,
        templateId: agreement.template_id,
        type: agreement.type,
        addendum: addendums[agreementId],
        mdPercentage: mds[agreementId],
      });
    });

    closeModal();
  }, [
    agreements,
    selectedAgreements,
    addendums,
    mds,
    onClose,
    rep,
    saveAndSendContract,
  ]);

  return (
    <>
      <ModalWrapper
        isOpened={isOpen}
        width="max-w-[592px] w-full"
        onCloseModal={onCancelClicked}
      >
        <div className="flex px-4 py-4 border-b justify-between">
          <span className={addFsExcludeClass('text-gray-700')}>
            {rep && rep.first_name && rep.last_name ? `${rep.first_name} ${rep.last_name}` : ''}
            {' '}
            &gt; Add New Agreement
          </span>
          <button
            type="button"
            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen"
            onClick={onCancelClicked}
          >
            <span className="sr-only">Close</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="bg-gray-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto h-96">
          {loading ? (
            <Loader />
          ) : (
            <NewAgreementList
              onToggleAddendum={onToggleAddendum}
              addendumOpened={addendumOpened}
              agreements={agreements || []}
              selectedAgreements={selectedAgreements}
              onToggleSelected={onToggleSelectedAgreement}
              addendums={addendums}
              mds={mds}
              onChangeMd={onChangeMd}
            />
          )}
        </div>
        <div className="bg-white border-t rounded-b-lg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className={
              'w-full inline-flex justify-center rounded-md border border-transparent ' +
            'shadow-sm px-4 py-2 bg-aptivegreen text-base font-medium text-white hover:bg-aptivegreen ' +
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen-500 ' +
            `sm:ml-3 sm:w-40 sm:text-sm ${
              addendumOpened ? 'hidden' : ''
            }`}
            onClick={onSaveClicked}
            disabled={addendumOpened}
          >
            Save & Send
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen sm:mt-0 sm:ml-3 sm:w-20 sm:text-sm"
            onClick={onCancelClicked}
          >
            Cancel
          </button>
        </div>
      </ModalWrapper>

      <ConfirmationModal
        isOpened={confirmationOpen}
        modalWidth="max-w-[592px] w-full"
        onCancel={onConfirmationBack}
        onAction={onConfirmationQuit}
        title={QUIT_CONFIRMATION_TITLE}
        message={QUIT_CONFIRMATION_MESSAGE}
        cancelLabel="Go back"
        confirmLabel={QUIT_CONFIRMATIONS_BUTTON}
      />
    </>
  );
};

AddContract.propTypes = {
  agreements: PropTypes.arrayOf(PropTypes.object),
  rep: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  requestAvailableContracts: PropTypes.func,
  saveAndSendContract: PropTypes.func,
};

const mapStateToProps = (state, { recruit }) => {
  const { contracts, reps } = state;
  const recruitId = recruit && recruit.id;

  const availableContracts =
    contracts &&
    recruit &&
    contracts[recruitId] &&
    contracts[recruitId].available;
  const rep = reps && recruitId && reps[recruitId];

  return {
    loading: availableContractsLoadingSelector(state),
    agreements: availableContracts,
    rep,
  };
};

const mapDispatchToProps = {
  saveAndSendContract: saveAndSendContractAsync.request,
  requestAvailableContracts: requestAvailableContractsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContract);
