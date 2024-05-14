import { onboardingConstants } from '@/lib/constants';
import { OnboardingHeader } from '@/modules/recruits/components';
import {
  selectedSelector,
  validateOnboardingFormsCompletion,
  setCurrentStepAction,
  setFeatureFlagAction,
} from '@/redux/onboarding';
import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { EditProfile, ViewHistory } from '.';
import { selectViewSection, selectViewStep, setReviewDocumentAction } from '@/redux/notifications';
import { useFeatureFlag } from 'configcat-react';

const {
  WIZARD_TYPE_ADMIN,
  WIZARD_TYPE_REGIONAL,
  WIZARD_TYPE_RECRUITER,
  WIZARD_TYPE_RECRUIT,
  PAY_DETAILS_SECTION_FEATURE_FLAG_NAME,
  I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME,
  DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME,
} = onboardingConstants;

const MODES = {
  EDIT_PROFILE: 'edit_profile',
  VIEW_HISTORY: 'view_history',
};

export const ProfileWizardContext = createContext(null);

const ProfileWizard = ({
  // Own Props
  wizardType,
  isPersonalWizard,
  isPopup,
  userId,
  onUserDeleted,
  recruitingSeasonId,
  cancelToken,

  // State
  rep,
  uploadFileSection,
  setUploadFileSection,
  uploadFileStep,
  setCurrentStep,
  validateOnboardingCompletion,
  setFeatureFlag,
}) => {
  const [mode, setMode] = useState(MODES.EDIT_PROFILE);
  const [section, setSection] = useState(null);
  const [repName, setRepName] = useState('');

  const { value: isPayDetailsSectionEnabled } =
    useFeatureFlag(PAY_DETAILS_SECTION_FEATURE_FLAG_NAME, false);

  const { value: isI9DocumentsSectionEnabled } =
    useFeatureFlag(I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME, false);

  const { value: isDirectDepositSectionEnabled } =
    useFeatureFlag(DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME, false);

  useEffect(() => {
    setFeatureFlag({ name: PAY_DETAILS_SECTION_FEATURE_FLAG_NAME, value: isPayDetailsSectionEnabled });
  }, [setFeatureFlag, isPayDetailsSectionEnabled]);

  useEffect(() => {
    setFeatureFlag({ name: I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME, value: isI9DocumentsSectionEnabled });
  }, [setFeatureFlag, isI9DocumentsSectionEnabled]);

  useEffect(() => {
    setFeatureFlag({ name: DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME, value: isDirectDepositSectionEnabled });
  }, [setFeatureFlag, isDirectDepositSectionEnabled]);

  useEffect(() => {
    if (rep?.userId) {
      validateOnboardingCompletion();
    }
  }, [rep?.userId, validateOnboardingCompletion]);

  useEffect(() => {
    if (rep.firstName && rep.lastName) {
      setRepName(`${rep.firstName} ${rep.lastName}`);
    }
  }, [rep.firstName, rep.lastName, setRepName]);

  useEffect(() => {
    if (uploadFileSection) {
      setSection(uploadFileSection);
      setCurrentStep(uploadFileStep);
    }
  }, [setCurrentStep, uploadFileSection, uploadFileStep]);

  useEffect(() => {
    if (!section) {
      setUploadFileSection(null);
    }
  }, [section, setUploadFileSection]);

  const showEditProfile = () => {
    setMode(MODES.EDIT_PROFILE);
  };

  const showViewHistory = (section) => {
    setMode(MODES.VIEW_HISTORY);
    setSection(section);
  };

  const getView = (mode) => {
    switch (mode) {
      case MODES.VIEW_HISTORY:
        return (
          <ViewHistory />
        );

      default:
        return (
          <EditProfile
            onUserDeleted={onUserDeleted}
            recruitingSeasonId={recruitingSeasonId}
            cancelToken={cancelToken}
          />
        );
    }
  };

  const profileWizardContextValue = useMemo(() => ({
    wizardType,
    isPersonalWizard,
    isPopup,
    userId,
    section,
    setSection,
    repName,
    setRepName,
    showEditProfile,
    showViewHistory,
    recruitingSeasonId,
  }), [
    wizardType,
    isPersonalWizard,
    isPopup,
    userId,
    section,
    repName,
    recruitingSeasonId,
  ]);

  return (
    <div className="flex flex-col w-screen max-w-5xl rounded overflow-hidden bg-white shadow-xl">
      <ProfileWizardContext.Provider value={profileWizardContextValue}>
        <OnboardingHeader />
        {getView(mode)}
      </ProfileWizardContext.Provider>
    </div>
  );
};

ProfileWizard.defaultProps = {
  wizardType: WIZARD_TYPE_RECRUIT,
  isPersonalWizard: true,
  isPopup: false,
};

ProfileWizard.propTypes = {
  wizardType: PropTypes.oneOf([
    WIZARD_TYPE_ADMIN,
    WIZARD_TYPE_REGIONAL,
    WIZARD_TYPE_RECRUITER,
    WIZARD_TYPE_RECRUIT,
  ]).isRequired,
  isPersonalWizard: PropTypes.bool.isRequired,
  isPopup: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  onUserDeleted: PropTypes.func,
  rep: PropTypes.object,
  uploadFileSection: PropTypes.string,
  uploadFileStep: PropTypes.number,
  setUploadFileSection: PropTypes.func,
  setCurrentStep: PropTypes.func,
  resetCurrentStep: PropTypes.func,
  validateOnboardingCompletion: PropTypes.func,
  recruitingSeasonId: PropTypes.string,
  setFeatureFlag: PropTypes.func,
  cancelToken: PropTypes.object,
};

const mapStateToProps = (state) => ({
  rep: selectedSelector(state),
  uploadFileSection: selectViewSection(state),
  uploadFileStep: selectViewStep(state),
});

const mapDispatchToProps = {
  setUploadFileSection: setReviewDocumentAction,
  setCurrentStep: setCurrentStepAction,
  validateOnboardingCompletion: validateOnboardingFormsCompletion,
  setFeatureFlag: setFeatureFlagAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWizard);
