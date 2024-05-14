import PropTypes from 'prop-types';
import { dashboardConstants, onboardingConstants } from '@/lib/constants';
import { ProfileWizard } from '@/modules/recruits/components';
import { useCallback, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { resetProfileCompletion, resetSelectedAction, resetStepsAction } from '@/redux/onboarding';
import { userSelector } from '@/redux/auth';
import { resetFilesAction } from '@/redux/files';
import { XIcon } from '@heroicons/react/outline';
import { ModalWrapper } from '@/components';
import axios from 'axios';

const {
  SUPER_ADMIN_GROUP,
  DEALER_ADMIN_GROUP,
  REGIONAL_MANAGEMENT_GROUP,
  MANAGERS_GROUP,
} = dashboardConstants;

const {
  WIZARD_TYPE_ADMIN,
  WIZARD_TYPE_REGIONAL,
  WIZARD_TYPE_RECRUITER,
  WIZARD_TYPE_RECRUIT,
} = onboardingConstants;

const WizardProfileModal = ({
  // Own Props
  isOpen,
  onClose,
  isPersonalWizard,
  userId,
  reloadPageInfo,
  recruitingSeasonId,

  // State
  user,

  // Dispatch
  resetSteps,
  resetFiles,
  resetSelected,
  resetProfileCompletion,
}) => {
  const cancelButtonRef = useRef(null);
  const source = axios.CancelToken.source();

  const onCloseModal = useCallback(() => {
    source.cancel();
    resetSteps();
    resetFiles();
    resetSelected();
    resetProfileCompletion();
    onClose();
  }, [
    resetSteps,
    resetFiles,
    resetSelected,
    onClose,
    source,
  ]);

  const wizardType = useMemo(() => {
    // Only rep's wizard can be opened by other users, i.e. can be not-personal.
    if (!isPersonalWizard) {
      return WIZARD_TYPE_RECRUIT;
    }

    switch (user?.group_id) {
      case SUPER_ADMIN_GROUP:
      case DEALER_ADMIN_GROUP:
        return WIZARD_TYPE_ADMIN;

      case REGIONAL_MANAGEMENT_GROUP:
        return WIZARD_TYPE_REGIONAL;

      case MANAGERS_GROUP:
        return WIZARD_TYPE_RECRUITER;

      default:
        return WIZARD_TYPE_RECRUIT;
    }
  }, [isPersonalWizard, user?.group_id]);

  const onUserDeleted = useCallback(() => {
    onCloseModal();
    reloadPageInfo();
  }, [onCloseModal, reloadPageInfo]);

  return (
    <ModalWrapper
      isOpened={isOpen}
      onCloseModal={onCloseModal}
    >
      <button
        type="button"
        className="px-5 py-5 absolute text-black right-0 top-0 rounded-tr-lg hover:text-gray-600 focus:outline-none"
        onClick={onCloseModal}
        ref={cancelButtonRef}
      >
        <XIcon className="w-6 h-6" aria-hidden="true" />
      </button>
      <ProfileWizard
        wizardType={wizardType}
        isPersonalWizard={isPersonalWizard}
        isPopup={true}
        userId={userId}
        onUserDeleted={onUserDeleted}
        recruitingSeasonId={recruitingSeasonId}
        cancelToken={source.token}
      />
    </ModalWrapper>
  );
};

WizardProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isPersonalWizard: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  reloadPageInfo: PropTypes.func,
  user: PropTypes.object,
  resetSteps: PropTypes.func,
  resetSelected: PropTypes.func,
  resetFiles: PropTypes.func,
  resetProfileCompletion: PropTypes.func,
  recruitingSeasonId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  resetSteps: resetStepsAction,
  resetSelected: resetSelectedAction,
  resetFiles: resetFilesAction,
  resetProfileCompletion: resetProfileCompletion,
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardProfileModal);
