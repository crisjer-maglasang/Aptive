import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  arrivalDataSelector,
  housingDataSelector,
  nextStepSelector,
  repApprovedSelector,
  repEditableSelector,
  repSubmittedSelector,
  residentialHistoryDataSelector,
  selectIsOnboardingDataUpdated,
  setOnboardingFormCompleted,
  updateRepAsync,
  vehicleDataSelector,
} from '@/redux/onboarding';
import { ArrivalStatus, HousingStatus, ResidentialHistory, VehicleStatus } from '../../../recruits/components/HousingInfo';
import { isAdminSelector } from '@/redux/auth';
import { formLoadingSelector } from '@/redux/loading';
import { updateRepByIdAsync } from '@/redux/reps';
import { onboardingConstants } from '@/lib';
import { ProfileWizardContext, WizardFormWrapper } from '../../components';
import { CustomButtonGroup, FormSection } from '@/components/common';
import { validationSchema } from './housingAndVhValidationSchema';
import { useProfileEditable } from '../../components/ProfileWizard/hooks';
import { useScrollIntoView, useStableCallback } from '@/hooks';
import { adapterMapModified } from '@/lib/adapters';
import { resetOnboardingSectionData } from '@/lib/initialState';
import { validateHousingInfo } from '@/lib/validations/submit';

const {
  HOUSING_AND_VEHICLES_FORM_NAME,
  HOUSING_AND_VEHICLES_FORM_TITLE,
  HOUSING_SECTION_NAME,
  HOUSING_SECTION_TITLE,
  RESIDENTIAL_HISTORY_SECTION_NAME,
  RESIDENTIAL_HISTORY_SECTION_TITLE,
  VEHICLES_SECTION_NAME,
  VEHICLES_SECTION_TITLE,
  WIZARD_TYPE_RECRUIT,
} = onboardingConstants;

const HousingAndVehicleForm = ({
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
  arrivalData,
  housingData,
  residentialHistory,
  vehicleData,
  nextStep,
  updateRep,
  updateRepById,
  setFormCompleted,
}) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  const { section, setSection, showViewHistory, recruitingSeasonId } = useContext(ProfileWizardContext);

  const formRef = useRef(null);
  const housingSectionRef = useRef(null);
  const residentialHistorySectionRef = useRef(null);
  const vehiclesSectionRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      ...arrivalData,
      ...housingData,
      ...residentialHistory,
      ...vehicleData,
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

  const isCompleted = validateHousingInfo(getValues()).housingInfoIsValid;

  const { isEditable, canEditField } = useProfileEditable({
    wizardType,
    isPersonalWizard,
    isSubmitted,
    isAdmin,
    isApproved,
    isRepEditable,
  });

  const handleChange = useCallback((event) => {
    const { name, type, checked } = event.target;
    let { value } = event.target;

    value = type === 'checkbox' ? checked : value;

    setValue(name, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });

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
      ...arrivalData,
      ...housingData,
      ...residentialHistory,
      ...vehicleData,
    });
  }, [
    reset,
    arrivalData,
    housingData,
    residentialHistory,
    vehicleData,
  ]);

  useEffect(() => {
    setFormCompleted({ formId: HOUSING_AND_VEHICLES_FORM_NAME, isCompleted });
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
      [HOUSING_SECTION_NAME]: housingSectionRef,
      [RESIDENTIAL_HISTORY_SECTION_NAME]: residentialHistorySectionRef,
      [VEHICLES_SECTION_NAME]: vehiclesSectionRef,
    }[section],
    (parent) => !(parent === formRef.current.parentElement),
    () => setSection(null),
  );

  return (
    <WizardFormWrapper ref={formRef} step={2} title={HOUSING_AND_VEHICLES_FORM_TITLE} isLoading={formLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <FormSection
            ref={housingSectionRef}
            title={HOUSING_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(HOUSING_SECTION_NAME);
            }}
          >
            <ArrivalStatus
              isAdmin={isAdmin}
              formLoading={formLoading}
              canEditField={canEditField}
              onChangeHandler={handleChange}
            />
            <HousingStatus
              canEditField={canEditField}
              onChangeHandler={handleChange}
            />
          </FormSection>

          <FormSection
            ref={residentialHistorySectionRef}
            title={RESIDENTIAL_HISTORY_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(RESIDENTIAL_HISTORY_SECTION_NAME);
            }}
          >
            <ResidentialHistory
              canEditField={canEditField}
              onChangeHandler={handleChange}
              onBlurTrimSpace={onBlurTrimSpace}
            />
          </FormSection>

          <FormSection
            ref={vehiclesSectionRef}
            title={VEHICLES_SECTION_TITLE}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(VEHICLES_SECTION_NAME);
            }}
          >
            <VehicleStatus
              canEditField={canEditField}
              onChangeHandler={handleChange}
              onBlurTrimSpace={onBlurTrimSpace}
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

HousingAndVehicleForm.defaultProps = {
  wizardType: WIZARD_TYPE_RECRUIT,
  isPersonalWizard: true,
};

HousingAndVehicleForm.propTypes = {
  wizardType: PropTypes.string,
  isPersonalWizard: PropTypes.bool,
  userId: PropTypes.number,
  isUpdated: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  isApproved: PropTypes.bool,
  isRepEditable: PropTypes.bool,
  isAdmin: PropTypes.bool,
  formLoading: PropTypes.bool,
  arrivalData: PropTypes.object,
  housingData: PropTypes.object,
  residentialHistory: PropTypes.object,
  vehicleData: PropTypes.object,
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
  arrivalData: arrivalDataSelector(state),
  housingData: housingDataSelector(state),
  residentialHistory: residentialHistoryDataSelector(state),
  vehicleData: vehicleDataSelector(state),
  formLoading: formLoadingSelector(state),
  nextStep: nextStepSelector(state),
});

const mapDispatchToProps = {
  updateRep: updateRepAsync.request,
  updateRepById: updateRepByIdAsync.request,
  setFormCompleted: setOnboardingFormCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingAndVehicleForm);
