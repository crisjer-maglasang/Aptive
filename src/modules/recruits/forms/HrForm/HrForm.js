import { connect } from 'react-redux';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  featureFlagsSelector,
  hrDataSelector,
  nextStepSelector,
  repApprovedSelector,
  repEditableSelector,
  repSubmittedSelector,
  selectIsOnboardingDataUpdated,
  selectUserIdSelected,
  setOnboardingFormCompleted,
  updateRepAsync,
} from '@/redux/onboarding';
import { isAdminSelector } from '@/redux/auth';
import { formLoadingSelector } from '@/redux/loading';
import { updateRepByIdAsync } from '@/redux/reps';
import { onboardingConstants } from '@/lib';
import { validationSchema } from './hrValidationSchema';
import { ProfileWizardContext, WizardFormWrapper } from '../../components';
import { CustomButtonGroup, FormSection } from '@/components/common';
import { resetOnboardingSectionData } from '@/lib/initialState';
import { useProfileEditable } from '../../components/ProfileWizard/hooks';
import { useScrollIntoView, useStableCallback } from '@/hooks';
import { adapterMapModified } from '@/lib/adapters';
import {
  IdUpload,
  W9Upload,
  WotcSurvey,
  DirectDeposit,
  I9Upload,
} from '../../components/HRInfo';
import PropTypes from 'prop-types';
import { validateHrInfo } from '@/lib/validations/submit';

const {
  HR_INFO_FORM_NAME,
  HR_INFO_FORM_TITLE,
  WOTC_TAX_SURVEY_SECTION_NAME,
  WOTC_TAX_SURVEY_SECTION_TITLE,
  ID_COPY_UPLOAD_SECTION_NAME,
  ID_COPY_UPLOAD_SECTION_TITLE,
  WIZARD_TYPE_RECRUIT,
  W9_DOCUMENTS_SECTION_NAME,
  W9_DOCUMENTS_SECTION_TITLE,
  DIRECT_DEPOSIT_SECTION_NAME,
  DIRECT_DEPOSIT_SECTION_TITLE,
  DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME,
  WORKDAY_ID,
  I9_DOCUMENTS_SECTION_NAME,
  I9_DOCUMENTS_SECTION_TITLE,
  I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME,
} = onboardingConstants;

const HrForm = ({
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
  hrData,
  nextStep,
  updateRep,
  updateRepById,
  setFormCompleted,
  featureFlags,
}) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  const {
    [I9_DOCUMENTS_SECTION_FEATURE_FLAG_NAME]: isI9DocumentsSectionEnabled,
    [DIRECT_DEPOSIT_SECTION_FEATURE_FLAG_NAME]: isDirectDepositSectionEnabled,
  } = featureFlags;

  const { section, setSection, showViewHistory, recruitingSeasonId } =
    useContext(ProfileWizardContext);

  const formRef = useRef(null);
  const wotcTaxSurveySectionRef = useRef(null);
  const idCopyUploadSectionRef = useRef(null);
  const w9DocumentSectionRef = useRef(null);
  const directDepositSectionRef = useRef(null);
  const i9DocumentSectionRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      ...hrData,
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    context: {
      isAdmin,
      isWizard: isPersonalWizard,
      isI9DocumentsSectionEnabled,
      isDirectDepositSectionEnabled,
      defaultValues: hrData,
    }, // TODO: rename isWizard to isPersonalWizard in validation schema
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    setValue,
    getValues,
    clearErrors,
    control,
  } = methods;

  const hasWorkdayId =
    useWatch({
      name: WORKDAY_ID,
      control,
    }).length > 0;

  const isCompleted = validateHrInfo(getValues(), featureFlags).hrInfoIsValid;

  const { isEditable, canEditField } = useProfileEditable({
    wizardType,
    isPersonalWizard,
    isSubmitted,
    isAdmin,
    isApproved,
    isRepEditable,
  });

  const handleChange = useCallback((event) => {
    const { name, type, files, checked } = event.target;
    let { value } = event.target;

    value = type === 'file' ? files[0] : value;
    value = type === 'checkbox' ? checked : value;

    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: type !== 'file',
    });

    resetOnboardingSectionData(name, value, (name, value) => {
      setValue(name, value); // Skip validation when resetting sub-fields.
      clearErrors(name); // Clear errors for sub-fields if any.
    });
  }, [
    setValue,
    clearErrors,
  ]);

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
      ...hrData,
    });
  }, [reset, hrData]);

  useEffect(() => {
    setFormCompleted({ formId: HR_INFO_FORM_NAME, isCompleted });
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
  }, [nextStep, isEditable, handleSubmit, handleSubmitForm]);

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
      [WOTC_TAX_SURVEY_SECTION_NAME]: wotcTaxSurveySectionRef,
      [ID_COPY_UPLOAD_SECTION_NAME]: idCopyUploadSectionRef,
      [W9_DOCUMENTS_SECTION_NAME]: w9DocumentSectionRef,
      [I9_DOCUMENTS_SECTION_NAME]: i9DocumentSectionRef,
      [DIRECT_DEPOSIT_SECTION_NAME]: directDepositSectionRef,
    }[section],
    (parent) => !(parent === formRef.current.parentElement),
    () => setSection(null),
  );

  return (
    <WizardFormWrapper
      ref={formRef}
      step={5}
      title={HR_INFO_FORM_TITLE}
      isLoading={formLoading}
    >
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <FormSection
            ref={w9DocumentSectionRef}
            title={W9_DOCUMENTS_SECTION_TITLE}
          >
            <W9Upload
              isPersonalWizard={isPersonalWizard}
              hrData={hrData}
              canEditField={canEditField}
              userId={userId}
              onChangeHandler={handleChange}
            />
          </FormSection>

          {isI9DocumentsSectionEnabled && (
            <FormSection
              ref={i9DocumentSectionRef}
              title={I9_DOCUMENTS_SECTION_TITLE}
            >
              <I9Upload
                isPersonalWizard={isPersonalWizard}
                hrData={hrData}
                canEditField={canEditField}
                userId={userId}
              />
            </FormSection>
          )}

          <FormSection
            ref={wotcTaxSurveySectionRef}
            title={WOTC_TAX_SURVEY_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(WOTC_TAX_SURVEY_SECTION_NAME);
            }}
          >
            <WotcSurvey canEditField={canEditField} />
          </FormSection>

          <FormSection
            ref={idCopyUploadSectionRef}
            title={ID_COPY_UPLOAD_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(ID_COPY_UPLOAD_SECTION_NAME);
            }}
          >
            <IdUpload
              userId={userId}
              canEditField={canEditField}
              onChangeHandler={handleChange}
            />
          </FormSection>

          {isDirectDepositSectionEnabled && (
            <FormSection
              ref={directDepositSectionRef}
              title={DIRECT_DEPOSIT_SECTION_TITLE}
              viewHistory={isAdmin && !isPersonalWizard}
              onViewHistory={() => {
                showViewHistory(DIRECT_DEPOSIT_SECTION_NAME);
              }}
            >
              <DirectDeposit
                disabled={!hasWorkdayId}
                canEditField={canEditField}
                onChangeHandler={handleChange}
              />
            </FormSection>
          )}

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

HrForm.defaultProps = {
  wizardType: WIZARD_TYPE_RECRUIT,
  isPersonalWizard: true,
};

HrForm.propTypes = {
  wizardType: PropTypes.string,
  isPersonalWizard: PropTypes.bool,
  userId: PropTypes.number,
  isUpdated: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  isApproved: PropTypes.bool,
  isAdmin: PropTypes.bool,
  formLoading: PropTypes.bool,
  hrData: PropTypes.object,
  featureFlags: PropTypes.object,
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
  selectedRepId: selectUserIdSelected(state),
  isSubmitted: repSubmittedSelector(state),
  isRepEditable: repEditableSelector(state),
  isApproved: repApprovedSelector(state),
  isAdmin: isAdminSelector(state),
  formLoading: formLoadingSelector(state),
  hrData: hrDataSelector(state),
  nextStep: nextStepSelector(state),
  featureFlags: featureFlagsSelector(state),
});

const mapDispatchToProps = {
  updateRep: updateRepAsync.request,
  updateRepById: updateRepByIdAsync.request,
  setFormCompleted: setOnboardingFormCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(HrForm);
