import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { ProfileWizardContext } from '@/modules/recruits/components';
import { getAddressesAsync } from '@/redux/addresses';
import {
  currentStepSelector,
  onboardingMenuItemsSelector,
  repApprovedSelector,
  repOnboardedSelector,
  repReadyToSubmitSelector,
  repSubmittedSelector,
  selectedSelector,
  setCurrentStepAction,
  setNextStepAction,
  workdayCompleteSelector,
} from '@/redux/onboarding';
import { isAdminSelector, userSelector } from '@/redux/auth';
import {
  requestExperienceOptionsAsync,
  requestApartmentStatusesAsync,
  requestRecruitingSeasonAsync,
  requestRepAsContactAsync,
  requestUserAsContactAsync,
} from '@/redux/reps';
import { requestSalesSeasonAsync } from '@/redux/seasons';
import { HousingAndVehicleForm, HrForm, LicensingForm, PersonalInfoForm, UniformForm, SubmitProfileForm } from '@/modules/recruits/forms';
import { DocumentsTab } from '@/modules/recruits/components/Contracts';
import { WorkdayTasksTab } from '@/modules/recruits/components/WorkdayTasks';
import { requestRepContractsAsync } from '@/redux/contracts';
import { dashboardConstants, onboardingSidebar } from '@/lib/constants';
import { AttachmentsTab, AdminViewTab } from '@/modules/recruits/components';
import { Sidebar } from '.';
import { ActivityTracker } from '@/components/layout';

const { SUPER_ADMIN_GROUP, DEALER_ADMIN_GROUP, USERS_GROUP } = dashboardConstants;

const {
  PERSONAL_INFO_STEP_ID,
  HOUSING_VEHICLE_STEP_ID,
  UNIFORM_STEP_ID,
  LICENSING_STEP_ID,
  HR_STEP_ID,
  SUBMIT_PROFILE_STEP_ID,
  DOCUMENTS_STEP_ID,
  WORKDAY_TASK_STEP_ID,
  ATTACHMENTS_STEP_ID,
  ADMIN_VIEW_STEP_ID,
} = onboardingSidebar;

const EditProfile = ({
  // Own Props
  onUserDeleted,
  recruitingSeasonId,

  // State
  menuItems,
  currentStep,
  rep,
  isAdmin,
  isOnboarded,
  isSubmitted,
  isApproved,
  isReadyToSubmit,
  workdayComplete,
  authUser,
  cancelToken,

  // Dispatch
  setCurrentStep,
  setNextStep,
  requestRepAsContact,
  requestUser,
  requestRepContracts,
  getAddresses,
  requestRecruitingSeason,
  requestSalesSeason,
  requestExperienceOptions,
  requestApartmentStatuses,
}) => {
  const {
    wizardType,
    isPersonalWizard,
    isPopup,
    userId,
  } = useContext(ProfileWizardContext);

  useEffect(() => {
    requestRecruitingSeason();
    requestSalesSeason();
    requestExperienceOptions();
    requestApartmentStatuses();
    getAddresses();
  }, [
    requestRecruitingSeason,
    requestSalesSeason,
    requestExperienceOptions,
    requestApartmentStatuses,
    getAddresses,
  ]);

  useEffect(() => {
    if (userId) {
      requestRepAsContact({ userId, recruitingSeasonId, ...(cancelToken && { cancelToken }) });
    } else {
      requestUser({ ...(cancelToken && { cancelToken }) });
    }
  }, [userId, requestUser, requestRepAsContact]);

  useEffect(() => {
    if (userId) {
      requestRepContracts({ userId });
    }
  }, [userId, requestRepContracts]);

  useEffect(() => {
    // For some reason, in case of modal, ReactTooltip component mounts before its target component.
    // As a result event listener doesn't binds to target component.
    //
    // Calling ReactTooltip.rebuild() at here, i.e. in parent component,
    // will rebind event listeners for all the tooltips targets in document and solve the problem.
    //
    // At this point both ReactTooltips and their target components  already mounted.
    //
    // Not need to call ReactTooltip.rebuild() on each render, so leave dependencies empty.
    ReactTooltip.rebuild();
  }, []);

  const getCurrentStepForm = (currentStep) => {
    switch (currentStep) {
      case PERSONAL_INFO_STEP_ID:
        return (
          <PersonalInfoForm
            wizardType={wizardType}
            isPersonalWizard={isPersonalWizard}
            userId={userId}
            cancelToken={cancelToken}
          />
        );
      case HOUSING_VEHICLE_STEP_ID:
        return (
          <HousingAndVehicleForm
            wizardType={wizardType}
            isPersonalWizard={isPersonalWizard}
            userId={userId}
            cancelToken={cancelToken}
          />
        );
      case UNIFORM_STEP_ID:
        return (
          <UniformForm
            wizardType={wizardType}
            isPersonalWizard={isPersonalWizard}
            userId={userId}
            cancelToken={cancelToken}
          />
        );
      case LICENSING_STEP_ID:
        return (
          <LicensingForm
            wizardType={wizardType}
            isPersonalWizard={isPersonalWizard}
            userId={userId}
            cancelToken={cancelToken}
          />
        );
      case HR_STEP_ID:
        return (
          <HrForm
            wizardType={wizardType}
            isPersonalWizard={isPersonalWizard}
            userId={userId}
            cancelToken={cancelToken}
          />
        );
      case SUBMIT_PROFILE_STEP_ID:
        return (
          <SubmitProfileForm />
        );
      case DOCUMENTS_STEP_ID:
        return (
          <DocumentsTab userId={userId} />
        );
      case WORKDAY_TASK_STEP_ID:
        return (
          <WorkdayTasksTab
            userId={rep.userId}
            workdayId={rep?.workdayId}
            recruitingSeasonId={recruitingSeasonId}
          />
        );
      case ATTACHMENTS_STEP_ID:
        return (
          <AttachmentsTab
            userId={rep.userId || null}
            isPersonalWizard={isPersonalWizard}
          />
        );
      case ADMIN_VIEW_STEP_ID:
        return (
          <AdminViewTab
            userId={rep.userId || null}
          />
        );
      default:
        return (
          <PersonalInfoForm
            wizardType={wizardType}
            isPersonalWizard={isPersonalWizard}
            userId={userId}
          />
        );
    }
  };

  return (
    <div className="flex flex-wrap bg-gray-100">
      <div className="w-full sm:w-1/4 p-4">
        <Sidebar
          wizardType={wizardType}
          isPersonalWizard={isPersonalWizard}
          isPopup={isPopup}
          isAdmin={isAdmin}
          isOnboarded={isOnboarded}
          isSubmitted={isSubmitted}
          isApproved={isApproved}
          isReadyToSubmit={isReadyToSubmit}
          workdayComplete={workdayComplete}
          menuItems={menuItems}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setNextStep={setNextStep}
          userId={rep?.userId}
          onUserDeleted={onUserDeleted}
        />
      </div>
      <div className="w-full p-4 overflow-hidden sm:w-3/4 sm:h-70vh sm:overflow-y-scroll">
        {!isPopup && <Outlet />}
        {isPopup && getCurrentStepForm(currentStep)}
        {[USERS_GROUP, SUPER_ADMIN_GROUP, DEALER_ADMIN_GROUP].includes(authUser?.group_id) && (
          <ActivityTracker
            maxActivityInSeconds={parseInt(process.env.REACT_APP_MAX_ACTIVITY_IN_SECONDS)}
            maxInactivityInSeconds={parseInt(process.env.REACT_APP_MAX_INACTIVITY_IN_SECONDS)}
          />
        )}
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  selectedUserId: PropTypes.number,
  onUserDeleted: PropTypes.func,
  menuItems: PropTypes.object.isRequired,
  currentStep: PropTypes.number,
  rep: PropTypes.object,
  isAdmin: PropTypes.bool,
  isOnboarded: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  isApproved: PropTypes.bool,
  isReadyToSubmit: PropTypes.bool,
  workdayComplete: PropTypes.bool,
  setCurrentStep: PropTypes.func,
  setNextStep: PropTypes.func,
  requestRepAsContact: PropTypes.func,
  requestUser: PropTypes.func,
  requestRepContracts: PropTypes.func,
  getAddresses: PropTypes.func,
  requestRecruitingSeason: PropTypes.func,
  requestSalesSeason: PropTypes.func,
  requestExperienceOptions: PropTypes.func,
  requestApartmentStatuses: PropTypes.func,
  recruitingSeasonId: PropTypes.string,
  authUser: PropTypes.object,
  cancelToken: PropTypes.object,
};

const mapStateToProps = (state) => ({
  menuItems: onboardingMenuItemsSelector(state),
  currentStep: currentStepSelector(state),
  rep: selectedSelector(state),
  isAdmin: isAdminSelector(state),
  isOnboarded: repOnboardedSelector(state),
  isSubmitted: repSubmittedSelector(state),
  isApproved: repApprovedSelector(state),
  isReadyToSubmit: repReadyToSubmitSelector(state),
  workdayComplete: workdayCompleteSelector(state),
  authUser: userSelector(state),
});

const mapDispatchToProps = {
  setCurrentStep: setCurrentStepAction,
  setNextStep: setNextStepAction,
  requestRepAsContact: requestRepAsContactAsync.request,
  requestUser: requestUserAsContactAsync.request,
  requestRepContracts: requestRepContractsAsync.request,
  getAddresses: getAddressesAsync.request,
  requestRecruitingSeason: requestRecruitingSeasonAsync.request,
  requestSalesSeason: requestSalesSeasonAsync.request,
  requestExperienceOptions: requestExperienceOptionsAsync.request,
  requestApartmentStatuses: requestApartmentStatusesAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
