import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { ConfirmationModal, ModalWrapper } from '@/components';
import { default as ApartmentForm } from './ApartmentForm';
import { connect } from 'react-redux';
import { apartmentDataSelector, archiveApartmentAsync } from '@/modules/Housing/redux/apartment';
import { apartmentConstants } from '@/modules/Housing/lib';
import { apartmentFormLoadingSelector } from '@/modules/Housing/redux/loading';

const {
  ARCHIVE_APARTMENT_CONFIRMATION_TITLE,
  ARCHIVE_APARTMENT_CONFIRMATION_MESSAGE,
  ARCHIVE_APARTMENT_CONFIRMATIONS_BUTTON,
  ARCHIVE_APARTMENT_CONFIRMATION_CANCEL,
} = apartmentConstants;

const ApartmentModal = ({
  // Own Props
  isOpen,
  onClose,
  apartmentId,
  complex,
  selectedApartment,
  archiveApartment,
  isApartmentLoading,
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    onClose();
  }, [
    onClose,
  ]);

  const onConfirmationArchive = () => {
    archiveApartment({ complexId: complex.id, apartmentId });
    setConfirmationOpen(false);
    onCloseModal();
  };

  const onConfirmationBack = () => {
    setConfirmationOpen(false);
  };

  const onArchiveClick = () => {
    setConfirmationOpen(true);
  };

  return (
    <ModalWrapper
      isOpened={isOpen}
      onCloseModal={onCloseModal}
    >
      <div className="w-full p-4 text-right border-b border-gray-200 sm:px-6">
        {!isApartmentLoading && !selectedApartment.is_archived ? (
          <button
            onClick={onArchiveClick}
            type="button"
            className="text-base font-normal leading-6 text-gray-700 border border-gray-300 rounded-md px-3 py-2"
          >
            Archive apartment
          </button>
        ) : <div className="h-[42px]" />}
        <ConfirmationModal
          isOpened={confirmationOpen}
          modalWidth="max-w-[592px] w-full"
          onCancel={onConfirmationBack}
          onAction={onConfirmationArchive}
          title={ARCHIVE_APARTMENT_CONFIRMATION_TITLE}
          message={ARCHIVE_APARTMENT_CONFIRMATION_MESSAGE}
          cancelLabel={ARCHIVE_APARTMENT_CONFIRMATION_CANCEL}
          confirmLabel={ARCHIVE_APARTMENT_CONFIRMATIONS_BUTTON}
        />
      </div>
      <ApartmentForm
        apartmentId={apartmentId}
        complex={complex}
        onClose={onCloseModal}
      />
    </ModalWrapper>
  );
};

ApartmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  apartmentId: PropTypes.number,
  complex: PropTypes.object,
  archiveApartment: PropTypes.func,
  selectedApartment: PropTypes.object,
  isApartmentLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  selectedApartment: apartmentDataSelector(state),
  isApartmentLoading: apartmentFormLoadingSelector(state),
});

const mapDispatchToProps = {
  archiveApartment: archiveApartmentAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentModal);
