import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AddressInformation,
  BasicInformation,
  EmergencyInformation,
  IdInformation,
  MarriageInformation,
  PayDetails,
  SocialMedia,
} from '../../components/PersonalInfo';
import {
  addressDataSelector,
  emergencyDataSelector,
  identificationDataSelector,
  marriageDataSelector,
  nextStepSelector,
  payDetailsSelector,
  personalDataSelector,
  repApprovedSelector,
  repEditableSelector,
  repOnboardedSelector,
  repSubmittedSelector,
  selectIsOnboardingDataUpdated,
  setOnboardingFormCompleted,
  socialMediaDataSelector,
  updateRepAsync,
  featureFlagsSelector,
} from '@/redux/onboarding';
import { isAdminSelector } from '@/redux/auth';
import { formLoadingSelector } from '@/redux/loading';
import { updateRepByIdAsync } from '@/redux/reps';
import { validationSchema } from './personalInfoValidationSchema';
import { ProfileWizardContext, WizardFormWrapper } from '../../components';
import { onboardingConstants } from '@/lib';
import { CustomButtonGroup, FormSection } from '@/components/common';
import { adapterMapModified } from '@/lib/adapters';
import { useProfileEditable } from '../../components/ProfileWizard/hooks';
import { resetOnboardingSectionData } from '@/lib/initialState';
import { useScrollIntoView, useStableCallback } from '@/hooks';
import { validatePersonalInfo } from '@/lib/validations/submit';

const {
  PERSONAL_INFO_FORM_NAME,
  PERSONAL_INFO_FORM_TITLE,
  BASIC_INFO_SECTION_NAME,
  BASIC_INFO_SECTION_TITLE,
  MARRIAGE_INFO_SECTION_NAME,
  MARRIAGE_INFO_SECTION_TITLE,
  PAY_DETAILS_SECTION_NAME,
  PAY_DETAILS_SECTION_TITLE,
  PAY_DETAILS_SECTION_FEATURE_FLAG_NAME,
  EMERGENCY_INFO_SECTION_NAME,
  EMERGENCY_INFO_SECTION_TITLE,
  ADDRESS_SECTION_NAME,
  ADDRESS_SECTION_TITLE,
  GOVERNMENT_ID_SECTION_NAME,
  GOVERNMENT_ID_SECTION_TITLE,
  SOCIAL_MEDIA_TITLE,
  WIZARD_TYPE_RECRUIT,
} = onboardingConstants;

const PersonalInfoForm = ({
  // Own Props
  wizardType,
  isPersonalWizard,
  userId,
  cancelToken,

  // State / Dispatch
  isUpdated,
  isSubmitted,
  isApproved,
  isRepEditable,
  isAdmin,
  formLoading,
  featureFlags,
  personalData,
  marriageData,
  payDetails,
  emergencyData,
  addressData,
  idData,
  socialMedia,
  isOnboarded,
  updateRep,
  nextStep,
  updateRepById,
  setFormCompleted,
}) => {
  const [shouldValidateRentNote, setShouldValidateRentNote] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  const { [PAY_DETAILS_SECTION_FEATURE_FLAG_NAME]: isPayDetailsSectionEnabled } = featureFlags;

  const { section, setSection, showViewHistory, recruitingSeasonId } = useContext(ProfileWizardContext);

  const formRef = useRef(null);
  const basicSectionRef = useRef(null);
  const marriageSectionRef = useRef(null);
  const payDetailsRef = useRef(null);
  const emergencySectionRef = useRef(null);
  const addressSectionRef = useRef(null);
  const governmentIdSectionRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      ...personalData,
      ...marriageData,
      ...payDetails,
      ...emergencyData,
      ...addressData,
      ...idData,
      ...socialMedia,
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    context: { isAdmin, isPersonalWizard: isPersonalWizard, wizardType, shouldValidateRentNote },
  });

  const {
    handleSubmit,
    formState: { isDirty, dirtyFields: { rentDeduction: isRentDeductionDirty = false, ssnNumber: isSSNDirty = false } },
    reset,
    setValue,
    getValues,
    clearErrors,
  } = methods;

  const isCompleted = validatePersonalInfo(getValues()).personalInfoIsValid;

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
      ...personalData,
      ...marriageData,
      ...payDetails,
      ...emergencyData,
      ...addressData,
      ...idData,
      ...socialMedia,
    });
  }, [
    reset,
    personalData,
    marriageData,
    payDetails,
    emergencyData,
    addressData,
    idData,
    socialMedia,
  ]);

  useEffect(() => {
    setShouldValidateRentNote(isRentDeductionDirty);
  }, [isRentDeductionDirty]);

  useEffect(() => {
    setFormCompleted({ formId: PERSONAL_INFO_FORM_NAME, isCompleted });
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
      [BASIC_INFO_SECTION_NAME]: basicSectionRef,
      [MARRIAGE_INFO_SECTION_NAME]: marriageSectionRef,
      [PAY_DETAILS_SECTION_NAME]: payDetailsRef,
      [EMERGENCY_INFO_SECTION_NAME]: emergencySectionRef,
      [ADDRESS_SECTION_NAME]: addressSectionRef,
      [GOVERNMENT_ID_SECTION_NAME]: governmentIdSectionRef,
    }[section],
    (parent) => !(parent === formRef.current.parentElement),
    () => setSection(null),
  );

  return (
    <WizardFormWrapper ref={formRef} step={1} title={PERSONAL_INFO_FORM_TITLE} isLoading={formLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <FormSection
            ref={basicSectionRef}
            title={BASIC_INFO_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(BASIC_INFO_SECTION_NAME);
            }}
          >
            <BasicInformation
              userId={userId}
              isAdmin={isAdmin}
              wizardType={wizardType}
              canEditField={canEditField}
              onChangeHandler={handleChange}
              onBlurTrimSpace={onBlurTrimSpace}
            />
          </FormSection>

          <FormSection
            ref={marriageSectionRef}
            title={MARRIAGE_INFO_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(MARRIAGE_INFO_SECTION_NAME);
            }}
          >
            <MarriageInformation
              canEditField={canEditField}
              onChangeHandler={handleChange}
              onBlurTrimSpace={onBlurTrimSpace}
            />
          </FormSection>

          {isPayDetailsSectionEnabled && (isAdmin || isOnboarded) && (
            <FormSection
              ref={payDetailsRef}
              title={PAY_DETAILS_SECTION_TITLE}
              viewHistory={isAdmin && !isPersonalWizard}
              onViewHistory={() => {
                showViewHistory(PAY_DETAILS_SECTION_NAME);
              }}
            >
              <PayDetails
                canEditField={canEditField}
                onChangeHandler={handleChange}
                onBlurTrimSpace={onBlurTrimSpace}
                showRentNote={shouldValidateRentNote}
              />
            </FormSection>
          )}

          <FormSection
            ref={emergencySectionRef}
            title={EMERGENCY_INFO_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(EMERGENCY_INFO_SECTION_NAME);
            }}
          >
            <EmergencyInformation
              canEditField={canEditField}
              onChangeHandler={handleChange}
              onBlurTrimSpace={onBlurTrimSpace}
            />
          </FormSection>

          <FormSection
            ref={addressSectionRef}
            title={ADDRESS_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(ADDRESS_SECTION_NAME);
            }}
          >
            <AddressInformation
              canEditField={canEditField}
              onChangeHandler={handleChange}
              onBlurTrimSpace={onBlurTrimSpace}
            />
          </FormSection>

          <FormSection
            ref={governmentIdSectionRef}
            title={GOVERNMENT_ID_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(GOVERNMENT_ID_SECTION_NAME);
            }}
          >
            <IdInformation
              canEditField={canEditField}
              onChangeHandler={handleChange}
              isSSNDirty={isSSNDirty}
            />
          </FormSection>

          <FormSection title={SOCIAL_MEDIA_TITLE}>
            <SocialMedia
              canEditField={canEditField}
              onChangeHandler={handleChange}
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

PersonalInfoForm.defaultProps = {
  wizardType: WIZARD_TYPE_RECRUIT,
  isPersonalWizard: true,
};

PersonalInfoForm.propTypes = {
  isUpdated: PropTypes.bool,
  wizardType: PropTypes.string,
  isPersonalWizard: PropTypes.bool,
  userId: PropTypes.number,
  isSubmitted: PropTypes.bool,
  isApproved: PropTypes.bool,
  isRepEditable: PropTypes.bool,
  isAdmin: PropTypes.bool,
  formLoading: PropTypes.bool,
  featureFlags: PropTypes.object,
  personalData: PropTypes.object,
  marriageData: PropTypes.object,
  payDetails: PropTypes.object,
  emergencyData: PropTypes.object,
  addressData: PropTypes.object,
  idData: PropTypes.object,
  socialMedia: PropTypes.object,
  isOnboarded: PropTypes.bool,
  updateRep: PropTypes.func,
  updateRepById: PropTypes.func,
  setFormCompleted: PropTypes.func,
  nextStep: PropTypes.shape({
    applyTransition: PropTypes.func.isRequired,
    declineTransition: PropTypes.func.isRequired,
  }),
  cancelToken: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isUpdated: selectIsOnboardingDataUpdated(state),
  isSubmitted: repSubmittedSelector(state),
  isRepEditable: repEditableSelector(state),
  isApproved: repApprovedSelector(state),
  isAdmin: isAdminSelector(state),
  formLoading: formLoadingSelector(state),
  featureFlags: featureFlagsSelector(state),
  personalData: personalDataSelector(state),
  marriageData: marriageDataSelector(state),
  payDetails: payDetailsSelector(state),
  emergencyData: emergencyDataSelector(state),
  addressData: addressDataSelector(state),
  idData: identificationDataSelector(state),
  socialMedia: socialMediaDataSelector(state),
  isOnboarded: repOnboardedSelector(state),
  nextStep: nextStepSelector(state),
});

const mapDispatchToProps = {
  updateRep: updateRepAsync.request,
  updateRepById: updateRepByIdAsync.request,
  setFormCompleted: setOnboardingFormCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm);
