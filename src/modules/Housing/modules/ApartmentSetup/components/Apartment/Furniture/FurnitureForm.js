import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import ApartmentFormWrapper from '../Modal/ApartmentFormWrapper';
import { CustomButtonGroup, CustomFormElement, PhoneNumber } from '@/components/common';
import { useFormActions, furnitureValidationSchema } from '@/modules/Housing/modules/ApartmentSetup/lib/';
import {
  apartmentConstants,
  furnishedSelectOptions,
  defaultSelectOption,
} from '@/modules/Housing/lib';
import {
  apartmentDataSelector,
  furnitureDataSelector,
} from '@/modules/Housing/redux/apartment';
import { apartmentFormLoadingSelector } from '@/modules/Housing/redux/loading';
import { useApartmentEditable } from '@/modules/Housing/hooks';

const {
  FURNITURE_FURNISHED_NAME,
  FURNITURE_MONTHLY_COST_NAME,
  FURNITURE_DELIVERY_DATE_NAME,
  FURNITURE_PICKUP_DATE_NAME,
  FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME,
  FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME,
  FURNITURE_EMAIL_NAME,
  FURNITURE_PHONE_NAME,
  FURNITURE_NOTES_NAME,

  FURNITURE_FURNISHED_LABEL,
  FURNITURE_MONTHLY_COST_LABEL,
  FURNITURE_DELIVERY_DATE_LABEL,
  FURNITURE_PICKUP_DATE_LABEL,
  FURNITURE_WASHER_DRYER_DELIVERY_DATE_LABEL,
  FURNITURE_WASHER_DRYER_PICKUP_DATE_LABEL,
  FURNITURE_EMAIL_LABEL,
  FURNITURE_PHONE_LABEL,
  FURNITURE_NOTES_LABEL,
  FURNITURE_FORM_TITLE,

  FURNITURE_FORM_NAME,
} = apartmentConstants;

const FurnitureForm = ({
  // Own Props
  complex,
  apartmentId,
  nextStep,
  onClose,

  // State / Dispatch
  isApartmentLoading,
  furnitureData,
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
    validationSchema: furnitureValidationSchema,
    formData: furnitureData,
    nextStep,
    apartmentId,
    complexId: complex?.id,
    selected: selectedApartment,
    formDataName: FURNITURE_FORM_NAME,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = methods;

  const {
    [FURNITURE_MONTHLY_COST_NAME]: furnitureMonthlyCost,
  } = getValues();

  return (
    <ApartmentFormWrapper ref={formRef} step={2} title={FURNITURE_FORM_TITLE} isLoading={isApartmentLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <CustomFormElement
              id={FURNITURE_FURNISHED_NAME}
              name={FURNITURE_FURNISHED_NAME}
              label={FURNITURE_FURNISHED_LABEL}
              type="select"
              selectOptions={[...defaultSelectOption, ...furnishedSelectOptions]}
              onChange={handleChange}
              register={register}
              error={errors?.[FURNITURE_FURNISHED_NAME]}
              disabled={!canEditField(FURNITURE_FURNISHED_NAME)}
            />
            <CustomFormElement
              id={FURNITURE_MONTHLY_COST_NAME}
              name={FURNITURE_MONTHLY_COST_NAME}
              label={FURNITURE_MONTHLY_COST_LABEL}
              type="currency"
              register={register}
              value={furnitureMonthlyCost}
              mask={{
                allowDecimal: true,
                decimalSymbol: '.',
                decimalLimit: 2,
                integerLimit: 3,
              }}
              onChange={handleChange}
              onBlur={(event) => onChangeDecimalCurrency(event, FURNITURE_MONTHLY_COST_NAME)}
              disabled={!canEditField(FURNITURE_MONTHLY_COST_NAME)}
            />
            <CustomFormElement
              id={FURNITURE_DELIVERY_DATE_NAME}
              name={FURNITURE_DELIVERY_DATE_NAME}
              label={FURNITURE_DELIVERY_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[FURNITURE_DELIVERY_DATE_NAME]}
              disabled={!canEditField(FURNITURE_DELIVERY_DATE_NAME)}
            />
            <CustomFormElement
              id={FURNITURE_PICKUP_DATE_NAME}
              name={FURNITURE_PICKUP_DATE_NAME}
              label={FURNITURE_PICKUP_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[FURNITURE_PICKUP_DATE_NAME]}
              disabled={!canEditField(FURNITURE_PICKUP_DATE_NAME)}
            />
            <CustomFormElement
              id={FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME}
              name={FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME}
              label={FURNITURE_WASHER_DRYER_DELIVERY_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME]}
              disabled={!canEditField(FURNITURE_WASHER_DRYER_DELIVERY_DATE_NAME)}
            />
            <CustomFormElement
              id={FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME}
              name={FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME}
              label={FURNITURE_WASHER_DRYER_PICKUP_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME]}
              disabled={!canEditField(FURNITURE_WASHER_DRYER_PICKUP_DATE_NAME)}
            />
            <PhoneNumber
              id={FURNITURE_PHONE_NAME}
              name={FURNITURE_PHONE_NAME}
              label={FURNITURE_PHONE_LABEL}
              onChange={handleChange}
              register={register}
              error={errors?.[FURNITURE_PHONE_NAME]}
              disabled={!canEditField(FURNITURE_PHONE_NAME)}
            />
            <CustomFormElement
              id={FURNITURE_EMAIL_NAME}
              name={FURNITURE_EMAIL_NAME}
              label={FURNITURE_EMAIL_LABEL}
              type="text"
              onChange={handleChange}
              register={register}
              error={errors?.[FURNITURE_EMAIL_NAME]}
              disabled={!canEditField(FURNITURE_EMAIL_NAME)}
            />
            <CustomFormElement
              colSpan={6}
              rows={4}
              id={FURNITURE_NOTES_NAME}
              name={FURNITURE_NOTES_NAME}
              label={FURNITURE_NOTES_LABEL}
              type="textArea"
              onChange={handleChange}
              register={register}
              error={errors?.[FURNITURE_NOTES_NAME]}
              disabled={!canEditField(FURNITURE_NOTES_NAME)}
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

FurnitureForm.propTypes = {
  complex: PropTypes.object,
  apartmentId: PropTypes.number,
  nextStep: PropTypes.object,
  onClose: PropTypes.func,
  isApartmentLoading: PropTypes.bool,
  furnitureData: PropTypes.object,
  createApartment: PropTypes.func,
  updateApartment: PropTypes.func,
  selectedApartment: PropTypes.object,
  setSelectedApartment: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isApartmentLoading: apartmentFormLoadingSelector(state),
  selectedApartment: apartmentDataSelector(state),
  furnitureData: furnitureDataSelector(state),
});

export default connect(mapStateToProps)(FurnitureForm);
