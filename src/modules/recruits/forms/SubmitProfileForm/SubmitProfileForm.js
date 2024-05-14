import { CustomButton, PageLoader } from '@/components/common';
import { ConfirmationModal, InformationModal } from '@/components';
import { onboardingConstants } from '@/lib/constants';
import { StepHeader } from '@/modules/recruits/components';
import { formLoadingSelector } from '@/redux/loading';
import {
  nextStepSelector,
  repReadyToSubmitSelector,
  repSubmittedSelector,
  submitRepProfileAsync,
} from '@/redux/onboarding';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

const {
  SUBMIT_PROFILE_FORM_TITLE,
} = onboardingConstants;

const SubmitProfileForm = ({
  // State
  isReadyToSubmit,
  isSubmitted,
  nextStep,
  formLoading,

  // Dispatch
  submitProfile,
}) => {
  useEffect(() => {
    if (nextStep) {
      nextStep.applyTransition();
    }
  }, [
    nextStep,
  ]);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isPostSubmitModalOpened, setIsPostSubmitModalOpened] = useState(false);

  const openSubmitConfirmation = useCallback(() => {
    setConfirmationOpen(true);
  }, []);

  const closeSubmitConfirmation = useCallback(() => {
    setConfirmationOpen(false);
  }, []);

  const confirmSubmitConfirmation = useCallback(() => {
    submitProfile();
    setConfirmationOpen(false);
    setIsPostSubmitModalOpened(true);
  }, [submitProfile]);

  const closePostSubmitModal = useCallback(() => {
    setIsPostSubmitModalOpened(false);
  }, [setIsPostSubmitModalOpened]);

  return (
    <div
      className="flex flex-col relative min-h-full pb-6 border border-gray-200 bg-white overflow-hidden rounded-md shadow-sm"
    >
      <StepHeader step={6} title={SUBMIT_PROFILE_FORM_TITLE} />
      {formLoading ? (
        <PageLoader />
      ) : (
        <div className="flex flex-col grow pt-6 px-6">
          <div className="my-auto text-center">
            {isSubmitted ? (
              <div className="font-light text-lg text-gray-900">
                <p className="mb-2">Thank you for submitting your onboarding information and documents!</p>
                <p className="mb-2">It is now pending admin approval.</p>
                <p>An SMS and email will be sent to confirm approval.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 font-light text-lg text-gray-900">
                  Documents uploading will become unavailable after the submission.
                </div>
                <CustomButton
                  name="submit"
                  text="Submit Profile"
                  color="green"
                  disabled={!isReadyToSubmit}
                  className="min-w-[50%] py-5 px-6 sm:text-base uppercase"
                  onClick={openSubmitConfirmation}
                  type="submit"
                />
                <ConfirmationModal
                  isOpened={confirmationOpen}
                  modalWidth="max-w-[592px] w-full"
                  onCancel={closeSubmitConfirmation}
                  onAction={confirmSubmitConfirmation}
                  title="Are you sure you want to submit?"
                  confirmLabel="Submit Profile"
                />
              </>
            )}
            <InformationModal
              isOpened={isPostSubmitModalOpened}
              modalWidth="max-w-[592px] w-full"
              onClose={closePostSubmitModal}
              title="Thank you for submitting your profile"
              message="Thank you for submitting your profile, it will be marked 100% complete once your documents are approved and you complete all HR requirements. Please look for an email for next steps."
              closeLabel="Ok"
            />
          </div>
        </div>
      )}
    </div>
  );
};

SubmitProfileForm.propTypes = {
  isReadyToSubmit: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  nextStep: PropTypes.shape({
    applyTransition: PropTypes.func.isRequired,
    declineTransition: PropTypes.func.isRequired,
  }),
  formLoading: PropTypes.bool,
  submitProfile: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isReadyToSubmit: repReadyToSubmitSelector(state),
  isSubmitted: repSubmittedSelector(state),
  nextStep: nextStepSelector(state),
  formLoading: formLoadingSelector(state),
});

const mapDispatchToProps = {
  submitProfile: submitRepProfileAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProfileForm);
