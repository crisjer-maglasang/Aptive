import PropTypes from 'prop-types';
import { useMemo, memo } from 'react';
import { Actions, Menu, ProgressBar } from '.';
import { calculateWizardProgress } from '../../lib';

const Sidebar = ({
  wizardType,
  isPersonalWizard,
  isPopup,
  isAdmin,
  isOnboarded,
  isSubmitted,
  isApproved,
  isReadyToSubmit,
  workdayComplete,
  menuItems,
  currentStep,
  setCurrentStep,
  setNextStep,
  userId,
  onUserDeleted,
}) => {
  const { progress, message } = useMemo(() => (
    calculateWizardProgress({
      menuItems,
      isSubmitted,
      isApproved,
      workdayComplete,
      isAdmin,
      isReadyToSubmit
    })
  ), [
    menuItems,
    isSubmitted,
    isApproved,
    workdayComplete,
    isAdmin,
    isReadyToSubmit,
  ]);

  return (
    <>
      <ProgressBar
        progress={progress}
        message={message}
      />
      <Menu
        items={menuItems}
        wizardType={wizardType}
        isPersonalWizard={isPersonalWizard}
        isPopup={isPopup}
        isOnboarded={isOnboarded}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setNextStep={setNextStep}
      />
      <Actions
        isPersonalWizard={isPersonalWizard}
        isAdmin={isAdmin}
        userId={userId}
        onUserDeleted={onUserDeleted}
      />
    </>
  );
};

Sidebar.propTypes = {
  wizardType: PropTypes.string.isRequired,
  isPersonalWizard: PropTypes.bool.isRequired,
  isPopup: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isOnboarded: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  isApproved: PropTypes.bool.isRequired,
  isReadyToSubmit: PropTypes.bool,
  workdayComplete: PropTypes.bool.isRequired,
  menuItems: PropTypes.object.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  userId: PropTypes.number,
  onUserDeleted: PropTypes.func,
};

export default memo(Sidebar);
