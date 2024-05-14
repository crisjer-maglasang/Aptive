import { connect } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  employmentHistorySelector,
  nextStepSelector,
  personalDetailDataSelector,
  repExperienceDataSelector,
  referencesHistorySelector,
  repApprovedSelector,
  repEditableSelector,
  repSubmittedSelector,
  selectIsOnboardingDataUpdated,
  setOnboardingFormCompleted,
  updateRepAsync,
} from '@/redux/onboarding';
import { isAdminSelector } from '@/redux/auth';
import { formLoadingSelector } from '@/redux/loading';
import { updateRepByIdAsync } from '@/redux/reps';
import { validationSchema } from './licensingValidationSchema';
import { useProfileEditable } from '../../components/ProfileWizard/hooks';
import { useScrollIntoView, useStableCallback } from '@/hooks';
import { adapterMapModified } from '@/lib/adapters';
import { resetOnboardingSectionData } from '@/lib/initialState';
import { ProfileWizardContext, WizardFormWrapper } from '../../components';
import { onboardingConstants } from '@/lib/constants';
import { CustomButtonGroup, FormSection } from '@/components/common';
import {
  PersonalDetails,
  RepExperience,
  EmploymentHistory,
  References,
  SignatureUpload,
} from '../../components/LicensingInfo';
import PropTypes from 'prop-types';
import { validateLicensingInfo } from '@/lib/validations/submit';

const {
  LICENSING_FORM_NAME,
  LICENSING_FORM_TITLE,
  LICENSING_PERSONAL_DETAILS_SECTION_NAME,
  LICENSING_PERSONAL_DETAILS_SECTION_TITLE,
  EMPLOYMENT_HISTORY_SECTION_NAME,
  EMPLOYMENT_HISTORY_SECTION_TITLE,
  REFERENCES_SECTION_NAME,
  REFERENCES_SECTION_TITLE,
  SIGNATURE_UPLOAD_SECTION_TITLE,
  WIZARD_TYPE_RECRUIT,
  REP_EXPERIENCE_SECTION_TITLE,
  REP_EXPERIENCE_SECTION_NAME,
} = onboardingConstants;

const LicensingForm = ({
  // Own Props
  wizardType,
  isPersonalWizard,
  userId,
  cancelToken,

  // State / Dispatch
  isUpdated,
  isSubmitted,
  isRepEditable,
  isApproved,
  isAdmin,
  formLoading,
  personalDetailsData,
  repExperienceData,
  employmentData,
  referenceData,
  updateRep,
  nextStep,
  updateRepById,
  setFormCompleted,
}) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  const { section, setSection, showViewHistory, recruitingSeasonId } = useContext(ProfileWizardContext);

  const formRef = useRef(null);
  const licensingSectionRef = useRef(null);
  const employmentSectionRef = useRef(null);
  const referencesSectionRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      ...personalDetailsData,
      ...repExperienceData,
      ...employmentData,
      ...referenceData,
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    context: { isAdmin, isWizard: isPersonalWizard }, // TODO: rename isWizard to isPersonalWizard in validation schema
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    setValue,
    getValues,
    clearErrors,
  } = methods;

  const isCompleted = validateLicensingInfo(getValues()).licensingInfoIsValid;

  const { isEditable, canEditField } = useProfileEditable({
    wizardType,
    isPersonalWizard,
    isSubmitted,
    isAdmin,
    isApproved,
    isRepEditable,
  });

  const handleChange = useCallback((event) => {
    const { name, type, files } = event.target;
    let { value } = event.target;

    value = type === 'file' ? files[0] : value;

    setValue(name, value, { shouldValidate: true, shouldDirty: true, shouldTouch: type !== 'file' });

    resetOnboardingSectionData(name, value, (name, value) => {
      setValue(name, value); // Skip validation when resetting sub-fields.
      clearErrors(name); // Clear errors for sub-fields if any.
    });
  }, [
    setValue,
    clearErrors,
  ]);

  const onBlurTrimSpace = useCallback((event, name) => {
    handleChange({
      target: {
        name,
        value: event.target.value.trim(),
      },
      type: event.type,
    });
  }, [handleChange]);

  const handleSubmitForm = useStableCallback((onSuccess) => {
    const updateRepCallback = userId ? updateRepById : updateRep;
    const sendingData = adapterMapModified['combined'](getValues());

    updateRepCallback({
      data: {
        ...sendingData,
        ...(userId && { userId }),
        ...(recruitingSeasonId && { recruitingSeasonId: recruitingSeasonId }),
      },
      ...(cancelToken && { cancelToken }),
      successCallback: onSuccess ?? (() => {}),
    });
  });

  const handleResetForm = useCallback(() => {
    reset({
      ...personalDetailsData,
      ...repExperienceData,
      ...employmentData,
      ...referenceData,
    });
  }, [
    reset,
    personalDetailsData,
    repExperienceData,
    employmentData,
    referenceData,
  ]);

  useEffect(() => {
    setFormCompleted({ formId: LICENSING_FORM_NAME, isCompleted });
  }, [isCompleted, setFormCompleted]);

  useEffect(() => {
    if (isUpdated) {
      handleResetForm();
    }
    // we don't want to reset the form when handleResetForm changes as we might lose data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  useEffect(() => {
    if (nextStep) {
      if (isEditable) {
        handleSubmit(
          () => handleSubmitForm(nextStep.applyTransition),
          () => nextStep.declineTransition(),
        )();
      } else {
        nextStep.applyTransition();
      }
    }
  }, [
    nextStep,
    isEditable,
    handleSubmit,
    handleSubmitForm,
  ]);

  /**
   * Initially `formLoading` is undefined which interprets as false
   * and React mounts a form component.
   *
   * However, in a moment `formLoading` becomes true indicating the real data load.
   * React unmounts the form component and mount Loader instead.
   *
   * And only when data is loaded completely and `formLoading becomes undefined/false again
   * we're ready to scroll to desired form section.
   */
  useEffect(() => {
    if (!shouldScroll && !formLoading) {
      setShouldScroll(true);
    }
  }, [shouldScroll, formLoading]);

  useScrollIntoView(
    shouldScroll && {
      [LICENSING_PERSONAL_DETAILS_SECTION_NAME]: licensingSectionRef,
      [EMPLOYMENT_HISTORY_SECTION_NAME]: employmentSectionRef,
      [REFERENCES_SECTION_NAME]: referencesSectionRef,
    }[section],
    (parent) => !(parent === formRef.current.parentElement),
    () => setSection(null),
  );

  return (
    <WizardFormWrapper ref={formRef} step={4} title={LICENSING_FORM_TITLE} isLoading={formLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <FormSection
            ref={licensingSectionRef}
            title={LICENSING_PERSONAL_DETAILS_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(LICENSING_PERSONAL_DETAILS_SECTION_NAME);
            }}
          >
            <PersonalDetails
              userId={userId}
              canEditField={canEditField}
              onChangeHandler={handleChange}
              onBlurTrimSpace={onBlurTrimSpace}
            />
          </FormSection>

          <FormSection
            ref={employmentSectionRef}
            title={REP_EXPERIENCE_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(REP_EXPERIENCE_SECTION_NAME);
            }}
          >
            <RepExperience
              isAdmin={isAdmin}
              isPersonalWizard={isPersonalWizard}
              canEditField={canEditField}
              onChangeHandler={handleChange}
            />
          </FormSection>

          <FormSection
            ref={employmentSectionRef}
            title={EMPLOYMENT_HISTORY_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(EMPLOYMENT_HISTORY_SECTION_NAME);
            }}
          >
            <EmploymentHistory
              isAdmin={isAdmin}
              isPersonalWizard={isPersonalWizard}
              canEditField={canEditField}
            />
          </FormSection>

          <FormSection
            ref={referencesSectionRef}
            title={REFERENCES_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(REFERENCES_SECTION_NAME);
            }}
          >
            <References
              isAdmin={isAdmin}
              isPersonalWizard={isPersonalWizard}
              canEditField={canEditField}
            />
          </FormSection>

          <FormSection title={SIGNATURE_UPLOAD_SECTION_TITLE}>
            <SignatureUpload
              userId={userId}
              canEditField={canEditField}
            />
          </FormSection>

          {isEditable && (
            <CustomButtonGroup
              orientation="right"
              onCancelClick={handleResetForm}
              disabledCancel={!isDirty}
              withSubmit
            />
          )}
        </form>
      </FormProvider>
    </WizardFormWrapper>
  );
};

LicensingForm.defaultProps = {
  wizardType: WIZARD_TYPE_RECRUIT,
  isPersonalWizard: true,
};

LicensingForm.propTypes = {
  isUpdated: PropTypes.bool,
  wizardType: PropTypes.string,
  isPersonalWizard: PropTypes.bool,
  userId: PropTypes.number,
  isSubmitted: PropTypes.bool,
  isApproved: PropTypes.bool,
  isAdmin: PropTypes.bool,
  formLoading: PropTypes.bool,
  personalDetailsData: PropTypes.object,
  repExperienceData: PropTypes.object,
  employmentData: PropTypes.object,
  referenceData: PropTypes.object,
  updateRep: PropTypes.func,
  updateRepById: PropTypes.func,
  setFormCompleted: PropTypes.func,
  nextStep: PropTypes.shape({
    applyTransition: PropTypes.func.isRequired,
    declineTransition: PropTypes.func.isRequired,
  }),
  isRepEditable: PropTypes.bool,
  cancelToken: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isUpdated: selectIsOnboardingDataUpdated(state),
  isSubmitted: repSubmittedSelector(state),
  isRepEditable: repEditableSelector(state),
  isApproved: repApprovedSelector(state),
  isAdmin: isAdminSelector(state),
  formLoading: formLoadingSelector(state),
  personalDetailsData: personalDetailDataSelector(state),
  repExperienceData: repExperienceDataSelector(state),
  employmentData: employmentHistorySelector(state),
  referenceData: referencesHistorySelector(state),
  nextStep: nextStepSelector(state),
});

const mapDispatchToProps = {
  updateRep: updateRepAsync.request,
  updateRepById: updateRepByIdAsync.request,
  setFormCompleted: setOnboardingFormCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(LicensingForm);
