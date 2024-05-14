import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  nextStepSelector,
  repApprovedSelector,
  repEditableSelector,
  repSubmittedSelector,
  selectIsOnboardingDataUpdated,
  setOnboardingFormCompleted,
  uniformDataSelector,
  updateRepAsync,
} from '@/redux/onboarding';
import { isAdminSelector } from '@/redux/auth';
import { formLoadingSelector } from '@/redux/loading';
import { updateRepByIdAsync } from '@/redux/reps';
import { validationSchema } from './uniformValidationSchema';
import { ProfileWizardContext } from '../../../recruits/components';
import { onboardingConstants } from '@/lib';
import { CustomButtonGroup, FormSection } from '@/components/common';
import { useScrollIntoView, useStableCallback } from '@/hooks';
import { adapterMapModified } from '@/lib/adapters';
import { useProfileEditable } from '../../../recruits/components/ProfileWizard/hooks';
import { UniformStats } from '../../components/UniformInfo';
import { WizardFormWrapper } from '../../components';
import { validateUniformInfo } from '@/lib/validations/submit';

const {
  UNIFORM_AND_SWAG_FORM_NAME,
  UNIFORM_AND_SWAG_FORM_TITLE,
  UNIFORM_SECTION_NAME,
  WIZARD_TYPE_RECRUIT,
} = onboardingConstants;

const UniformForm = ({
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
  uniformData,
  nextStep,
  updateRep,
  updateRepById,
  setFormCompleted,
}) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  const { section, setSection, showViewHistory, recruitingSeasonId } = useContext(ProfileWizardContext);

  const formRef = useRef(null);
  const uniformSectionRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      ...uniformData,
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
  } = methods;

  const isCompleted = validateUniformInfo(getValues()).uniformInfoIsValid;

  const { isEditable, canEditField } = useProfileEditable({
    wizardType,
    isPersonalWizard,
    isSubmitted,
    isAdmin,
    isApproved,
    isRepEditable,
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setValue(name, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  }, [
    setValue,
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
      ...uniformData,
    });
  }, [
    reset,
    uniformData,
  ]);

  useEffect(() => {
    setFormCompleted({ formId: UNIFORM_AND_SWAG_FORM_NAME, isCompleted });
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
      [UNIFORM_SECTION_NAME]: uniformSectionRef,
    }[section],
    (parent) => !(parent === formRef.current.parentElement),
    () => setSection(null),
  );

  return (
    <WizardFormWrapper ref={formRef} step={3} title={UNIFORM_AND_SWAG_FORM_TITLE} isLoading={formLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <FormSection
            ref={uniformSectionRef}
            viewHistory={isAdmin && !isPersonalWizard}
            onViewHistory={() => {
              showViewHistory(UNIFORM_SECTION_NAME);
            }}
          >
            <UniformStats
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

UniformForm.defaultProps = {
  wizardType: WIZARD_TYPE_RECRUIT,
  isPersonalWizard: true,
};

UniformForm.propTypes = {
  wizardType: PropTypes.string,
  isPersonalWizard: PropTypes.bool,
  userId: PropTypes.number,
  isUpdated: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  isApproved: PropTypes.bool,
  isAdmin: PropTypes.bool,
  formLoading: PropTypes.bool,
  uniformData: PropTypes.object,
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
  uniformData: uniformDataSelector(state),
  nextStep: nextStepSelector(state),
});

const mapDispatchToProps = {
  updateRep: updateRepAsync.request,
  updateRepById: updateRepByIdAsync.request,
  setFormCompleted: setOnboardingFormCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(UniformForm);
