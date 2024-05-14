import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import ApartmentFormWrapper from '../Modal/ApartmentFormWrapper';
import { CustomButtonGroup, CustomFormElement } from '@/components/common';
import { useFormActions, utilitiesValidationSchema } from '@/modules/Housing/modules/ApartmentSetup/lib/';
import {
  apartmentConstants,
  isAddedToRepSelectOptions,
  defaultSelectOption,
} from '@/modules/Housing/lib';
import { apartmentDataSelector, utilitiesDataSelector } from '@/modules/Housing/redux/apartment';
import { apartmentFormLoadingSelector } from '@/modules/Housing/redux/loading';
import { useApartmentEditable } from '@/modules/Housing/hooks';

const {
  UTILITIES_FORM_TITLE,
  UTILITIES_IS_ADDED_TO_REP_NAME,
  UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME,
  UTILITIES_GAS_ACCOUNT_NUMBER_NAME,
  UTILITIES_NOTES_NAME,
  UTILITIES_IS_ADDED_TO_REP_LABEL,
  UTILITIES_ELECTRIC_ACCOUNT_NUMBER_LABEL,
  UTILITIES_GAS_ACCOUNT_NUMBER_LABEL,
  UTILITIES_NOTES_LABEL,
  UTILITIES_FORM_NAME,
} = apartmentConstants;

const UtilitiesForm = ({
  // Own Props
  complex,
  apartmentId,
  nextStep,
  onClose,

  // State / Dispatch
  isApartmentLoading,
  utilitiesData,
  selectedApartment,
}) => {
  const formRef = useRef(null);
  const canEditField = useApartmentEditable({ isArchived: selectedApartment.is_archived });

  const {
    methods,
    handleSubmitForm,
    handleChange,
  } = useFormActions({
    validationSchema: utilitiesValidationSchema,
    formData: utilitiesData,
    nextStep,
    apartmentId,
    complexId: complex?.id,
    selected: selectedApartment,
    formDataName: UTILITIES_FORM_NAME,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <ApartmentFormWrapper ref={formRef} step={3} title={UTILITIES_FORM_TITLE} isLoading={isApartmentLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <CustomFormElement
              id={UTILITIES_IS_ADDED_TO_REP_NAME}
              name={UTILITIES_IS_ADDED_TO_REP_NAME}
              label={UTILITIES_IS_ADDED_TO_REP_LABEL}
              type="select"
              selectOptions={[...defaultSelectOption, ...isAddedToRepSelectOptions]}
              onChange={handleChange}
              register={register}
              error={errors?.[UTILITIES_IS_ADDED_TO_REP_NAME]}
              disabled={!canEditField(UTILITIES_IS_ADDED_TO_REP_NAME)}
            />
            <CustomFormElement
              id={UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME}
              name={UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME}
              label={UTILITIES_ELECTRIC_ACCOUNT_NUMBER_LABEL}
              type="text"
              onChange={handleChange}
              register={register}
              error={errors?.[UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME]}
              disabled={!canEditField(UTILITIES_ELECTRIC_ACCOUNT_NUMBER_NAME)}
            />
            <CustomFormElement
              id={UTILITIES_GAS_ACCOUNT_NUMBER_NAME}
              name={UTILITIES_GAS_ACCOUNT_NUMBER_NAME}
              label={UTILITIES_GAS_ACCOUNT_NUMBER_LABEL}
              type="text"
              onChange={handleChange}
              register={register}
              error={errors?.[UTILITIES_GAS_ACCOUNT_NUMBER_NAME]}
              disabled={!canEditField(UTILITIES_GAS_ACCOUNT_NUMBER_NAME)}
            />
            <CustomFormElement
              colSpan={6}
              rows={4}
              id={UTILITIES_NOTES_NAME}
              name={UTILITIES_NOTES_NAME}
              label={UTILITIES_NOTES_LABEL}
              type="textArea"
              onChange={handleChange}
              register={register}
              error={errors?.[UTILITIES_NOTES_NAME]}
              disabled={!canEditField(UTILITIES_NOTES_NAME)}
            />
          </div>

          <CustomButtonGroup
            orientation="right"
            onCancelClick={onClose}
            wrapperClassName="pt-6 pr-6"
            saveText="Submit"
            withSubmit
            disabledSave={selectedApartment.is_archived}
          />
        </form>
      </FormProvider>
    </ApartmentFormWrapper>
  );
};

UtilitiesForm.propTypes = {
  complex: PropTypes.object,
  apartmentId: PropTypes.number,
  nextStep: PropTypes.object,
  onClose: PropTypes.func,
  isApartmentLoading: PropTypes.bool,
  utilitiesData: PropTypes.object,
  selectedApartment: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isApartmentLoading: apartmentFormLoadingSelector(state),
  selectedApartment: apartmentDataSelector(state),
  utilitiesData: utilitiesDataSelector(state),
});

export default connect(mapStateToProps, null)(UtilitiesForm);
