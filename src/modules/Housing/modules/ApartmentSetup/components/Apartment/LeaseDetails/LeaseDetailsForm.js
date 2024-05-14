import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import ApartmentFormWrapper from '../Modal/ApartmentFormWrapper';
import { CustomButtonGroup, CustomFormElement } from '@/components/common';
import { useFormActions, leaseValidationSchema } from '@/modules/Housing/modules/ApartmentSetup/lib/';
import { apartmentFormLoadingSelector } from '@/modules/Housing/redux/loading';
import {
  apartmentConstants,
  defaultSelectOption,
  rentDueSelectOption,
} from '@/modules/Housing/lib';
import {
  apartmentDataSelector,
  leaseDataSelector,
} from '@/modules/Housing/redux/apartment';
import { useApartmentEditable } from '@/modules/Housing/hooks';

const {
  LEASE_DETAILS_FORM_TITLE,
  LEASED_BY_NAME,
  EXPECTED_RENT_DUE_NAME,
  RENT_DUE_DATE_NAME,
  EXPECTED_RENT_NAME,
  EXPECTED_START_DATE_NAME,
  EXPECTED_END_DATE_NAME,
  ACTUAL_START_DATE_NAME,
  ACTUAL_END_DATE_NAME,
  LEASED_NOTES_NAME,
  LEASED_BY_LABEL,
  EXPECTED_RENT_DUE_LABEL,
  RENT_DUE_DATE_LABEL,
  EXPECTED_RENT_LABEL,
  EXPECTED_START_DATE_LABEL,
  EXPECTED_END_DATE_LABEL,
  ACTUAL_START_DATE_LABEL,
  ACTUAL_END_DATE_LABEL,
  LEASED_NOTES_LABEL,
  LEASE_DETAILS_FORM_NAME,
} = apartmentConstants;

const LeaseDetailsForm = ({
  // Own Props
  complex,
  apartmentId,
  nextStep,
  onClose,
  // State / Dispatch
  isApartmentLoading,
  leaseDetailsData,
  selectedApartment,
}) => {
  const formRef = useRef(null);
  const canEditField = useApartmentEditable({ isArchived: selectedApartment.is_archived });

  const {
    methods,
    handleSubmitForm,
    handleChange,
    onChangeDecimalCurrency,
  } = useFormActions({
    validationSchema: leaseValidationSchema,
    formData: leaseDetailsData,
    nextStep,
    apartmentId,
    complexId: complex?.id,
    selected: selectedApartment,
    formDataName: LEASE_DETAILS_FORM_NAME,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = methods;

  const {
    [EXPECTED_RENT_NAME]: rentCost,
  } = getValues();

  return (
    <ApartmentFormWrapper ref={formRef} step={4} title={LEASE_DETAILS_FORM_TITLE} isLoading={isApartmentLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <CustomFormElement
              id={LEASED_BY_NAME}
              name={LEASED_BY_NAME}
              label={LEASED_BY_LABEL}
              type="text"
              onChange={handleChange}
              register={register}
              error={errors?.[LEASED_BY_NAME]}
              disabled={!canEditField(LEASED_BY_NAME)}
            />
            <CustomFormElement
              id={EXPECTED_RENT_DUE_NAME}
              name={EXPECTED_RENT_DUE_NAME}
              label={EXPECTED_RENT_DUE_LABEL}
              type="select"
              selectOptions={[...defaultSelectOption, ...rentDueSelectOption]}
              onChange={handleChange}
              register={register}
              error={errors?.[EXPECTED_RENT_DUE_NAME]}
              disabled={!canEditField(EXPECTED_RENT_DUE_NAME)}
            />
            <CustomFormElement
              id={RENT_DUE_DATE_NAME}
              name={RENT_DUE_DATE_NAME}
              label={RENT_DUE_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[RENT_DUE_DATE_NAME]}
              disabled={!canEditField(RENT_DUE_DATE_NAME)}
            />
            <CustomFormElement
              id={EXPECTED_RENT_NAME}
              name={EXPECTED_RENT_NAME}
              label={EXPECTED_RENT_LABEL}
              type="currency"
              register={register}
              value={rentCost}
              mask={{
                allowDecimal: true,
                decimalSymbol: '.',
                decimalLimit: 2,
                integerLimit: 3,
              }}
              onChange={handleChange}
              onBlur={(event) => onChangeDecimalCurrency(event, EXPECTED_RENT_NAME)}
              disabled={!canEditField(EXPECTED_RENT_NAME)}
            />
            <CustomFormElement
              id={EXPECTED_START_DATE_NAME}
              name={EXPECTED_START_DATE_NAME}
              label={EXPECTED_START_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[EXPECTED_START_DATE_NAME]}
              disabled={!canEditField(EXPECTED_START_DATE_NAME)}
            />
            <CustomFormElement
              id={EXPECTED_END_DATE_NAME}
              name={EXPECTED_END_DATE_NAME}
              label={EXPECTED_END_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[EXPECTED_END_DATE_NAME]}
              disabled={!canEditField(EXPECTED_END_DATE_NAME)}
            />
            <CustomFormElement
              id={ACTUAL_START_DATE_NAME}
              name={ACTUAL_START_DATE_NAME}
              label={ACTUAL_START_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[ACTUAL_START_DATE_NAME]}
              disabled={!canEditField(ACTUAL_START_DATE_NAME)}
            />
            <CustomFormElement
              id={ACTUAL_END_DATE_NAME}
              name={ACTUAL_END_DATE_NAME}
              label={ACTUAL_END_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[ACTUAL_END_DATE_NAME]}
              disabled={!canEditField(ACTUAL_END_DATE_NAME)}
            />
            <CustomFormElement
              colSpan={6}
              rows={5}
              id={LEASED_NOTES_NAME}
              name={LEASED_NOTES_NAME}
              label={LEASED_NOTES_LABEL}
              type="textArea"
              onChange={handleChange}
              register={register}
              error={errors?.[LEASED_NOTES_NAME]}
              disabled={!canEditField(LEASED_NOTES_NAME)}
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

LeaseDetailsForm.propTypes = {
  complex: PropTypes.object,
  apartmentId: PropTypes.number,
  nextStep: PropTypes.object,
  onClose: PropTypes.func,
  isApartmentLoading: PropTypes.bool,
  leaseDetailsData: PropTypes.object,
  createApartment: PropTypes.func,
  updateApartment: PropTypes.func,
  selectedApartment: PropTypes.object,
  setSelectedApartment: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isApartmentLoading: apartmentFormLoadingSelector(state),
  selectedApartment: apartmentDataSelector(state),
  leaseDetailsData: leaseDataSelector(state),
});

export default connect(mapStateToProps)(LeaseDetailsForm);
