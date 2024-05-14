import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { combineApartmentData } from '@/modules/Housing/modules/ApartmentSetup/lib';
import { useStableCallback } from '@/hooks';
import { formatCurrencyStringToNumber, formatNumberToCurrencyString } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import {
  createApartmentAsync,
  updateApartmentAsync,
  setSelectedApartmentAction,
  uploadDocumentAsync,
} from '@/modules/Housing/redux/apartment';
import { apartmentConstants } from '@/modules/Housing/lib';

const {
  DOCUMENT_UPLOAD_FORM_NAME,
} = apartmentConstants;

export function useFormActions({
  validationSchema,
  formData,
  nextStep,
  complexId,
  apartmentId,
  selected,
  formDataName,
}) {
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: formData,
    mode: 'all',
    reValidateMode: 'onChange',
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = methods;

  useEffect(() => {
    reset({
      ...formData,
    });
  }, [formData]);

  const handleChange = useCallback((event) => {
    const { name, type, files } = event.target;
    let { value } = event.target;

    value = type === 'file' ? files[0] : value;

    setValue(name, value, { shouldValidate: true, shouldDirty: true, shouldTouch: type !== 'file' });
  }, [
    setValue,
  ]);

  const onChangeDecimalCurrency = (event, name) => {
    handleChange({
      target: {
        name,
        value: formatNumberToCurrencyString(
          formatCurrencyStringToNumber(event.target.value),
          2,
        ),
      },
      type: event.type,
    });
  };

  const handleSubmitForm = useStableCallback((onSuccess) => {
    const callBack = apartmentId ? (formDataName === DOCUMENT_UPLOAD_FORM_NAME ? uploadDocumentAsync.request : updateApartmentAsync.request) : createApartmentAsync.request;
    const callBackOnSuccess = apartmentId ? (onSuccess ?? (() => {})) : uploadDocumentAsync.request;

    const sendingData = {
      ...selected,
      [formDataName] : getValues(),
    };
    dispatch(callBack({
      data: Object.entries(sendingData).reduce((acc, [, data]) => {
        return { ...acc, ...combineApartmentData(data || {}) };
      }, {}),
      complexId,
      ...(apartmentId && { apartmentId: apartmentId }),
      successCallback: callBackOnSuccess,
    }));
  });

  useEffect(() => {
    if (nextStep && apartmentId && !selected.is_archived) {
      handleSubmit(
        () => handleSubmitForm(nextStep.applyTransition),
        () => nextStep.declineTransition(),
      )();
    } else if (nextStep) {
      const values = getValues();

      if (selected.is_archived) {
        nextStep.applyTransition();
      } else {
        handleSubmit(() => {
          dispatch(setSelectedApartmentAction({
            [formDataName]: values,
          }));
          nextStep.applyTransition();
        })();
      }
    }
  }, [
    selected.is_archived,
    nextStep,
    handleSubmit,
    handleSubmitForm,
    apartmentId,
    formDataName,
    getValues,
    dispatch,
  ]);

  return {
    methods,
    handleChange,
    handleSubmitForm,
    onChangeDecimalCurrency,
  };
}
