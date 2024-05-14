import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import ApartmentFormWrapper from '../Modal/ApartmentFormWrapper';
import { CustomButtonGroup, CustomFormElement } from '@/components/common';
import { useFormActions, moveoutValidationSchema } from '@/modules/Housing/modules/ApartmentSetup/lib/';
import { apartmentFormLoadingSelector } from '@/modules/Housing/redux/loading';
import {
  apartmentConstants,
  defaultSelectOption,
  moveOutNoticeSelectOption,
} from '@/modules/Housing/lib';
import {
  apartmentDataSelector,
  moveOutSelector,
} from '@/modules/Housing/redux/apartment';
import { useApartmentEditable } from '@/modules/Housing/hooks';

const {
  MOVE_OUT_NOTICE_DATE_LABEL,
  MOVE_OUT_NOTICE_GIVEN_LABEL,
  DATE_MOVE_OUT_NOTICE_WAS_GIVEN_LABEL,
  ACTUAL_MOVE_OUT_DATE_LABEL,
  MOVE_OUT_NOTES_LABEL,
  MOVE_OUT_FORM_NAME,
  MOVE_OUT_NOTICE_DATE_NAME,
  MOVE_OUT_NOTICE_GIVEN_NAME,
  DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME,
  ACTUAL_MOVE_OUT_DATE_NAME,
  MOVE_OUT_NOTES_NAME,
  MOVE_OUT_FORM_TITLE,
} = apartmentConstants;

const MoveOutForm = ({
  // Own Props
  complex,
  apartmentId,
  nextStep,
  onClose,
  // State / Dispatch
  isApartmentLoading,
  moveOutData,
  selectedApartment,
}) => {
  const formRef = useRef(null);
  const canEditField = useApartmentEditable({ isArchived: selectedApartment.is_archived });

  const {
    methods,
    handleSubmitForm,
    handleChange,
  } = useFormActions({
    validationSchema: moveoutValidationSchema,
    formData: moveOutData,
    nextStep,
    apartmentId,
    complexId: complex?.id,
    selected: selectedApartment,
    formDataName: MOVE_OUT_FORM_NAME,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <ApartmentFormWrapper ref={formRef} step={5} title={MOVE_OUT_FORM_TITLE} isLoading={isApartmentLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <CustomFormElement
              id={MOVE_OUT_NOTICE_DATE_NAME}
              name={MOVE_OUT_NOTICE_DATE_NAME}
              label={MOVE_OUT_NOTICE_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[MOVE_OUT_NOTICE_DATE_NAME]}
              disabled={!canEditField(MOVE_OUT_NOTICE_DATE_NAME)}
            />
            <CustomFormElement
              id={MOVE_OUT_NOTICE_GIVEN_NAME}
              name={MOVE_OUT_NOTICE_GIVEN_NAME}
              label={MOVE_OUT_NOTICE_GIVEN_LABEL}
              type="select"
              selectOptions={[...defaultSelectOption, ...moveOutNoticeSelectOption]}
              onChange={handleChange}
              register={register}
              error={errors?.[MOVE_OUT_NOTICE_GIVEN_NAME]}
              disabled={!canEditField(MOVE_OUT_NOTICE_GIVEN_NAME)}
              required
            />
            <CustomFormElement
              id={DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME}
              name={DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME}
              label={DATE_MOVE_OUT_NOTICE_WAS_GIVEN_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME]}
              disabled={!canEditField(DATE_MOVE_OUT_NOTICE_WAS_GIVEN_NAME)}
            />
            <CustomFormElement
              id={ACTUAL_MOVE_OUT_DATE_NAME}
              name={ACTUAL_MOVE_OUT_DATE_NAME}
              label={ACTUAL_MOVE_OUT_DATE_LABEL}
              type="date"
              onChange={handleChange}
              register={register}
              error={errors?.[ACTUAL_MOVE_OUT_DATE_NAME]}
              disabled={!canEditField(ACTUAL_MOVE_OUT_DATE_NAME)}
            />
            <CustomFormElement
              colSpan={6}
              rows={6}
              id={MOVE_OUT_NOTES_NAME}
              name={MOVE_OUT_NOTES_NAME}
              label={MOVE_OUT_NOTES_LABEL}
              type="textArea"
              onChange={handleChange}
              register={register}
              error={errors?.[MOVE_OUT_NOTES_NAME]}
              disabled={!canEditField(MOVE_OUT_NOTES_NAME)}
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

MoveOutForm.propTypes = {
  complex: PropTypes.object,
  apartmentId: PropTypes.number,
  nextStep: PropTypes.object,
  onClose: PropTypes.func,
  isApartmentLoading: PropTypes.bool,
  moveOutData: PropTypes.object,
  createApartment: PropTypes.func,
  updateApartment: PropTypes.func,
  selectedApartment: PropTypes.object,
  setSelectedApartment: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isApartmentLoading: apartmentFormLoadingSelector(state),
  selectedApartment: apartmentDataSelector(state),
  moveOutData: moveOutSelector(state),
});

export default connect(mapStateToProps)(MoveOutForm);
