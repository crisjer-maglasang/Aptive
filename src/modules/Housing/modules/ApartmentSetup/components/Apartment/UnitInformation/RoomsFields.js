import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CustomFormElement } from '@/components/common';
import {
  apartmentConstants,
  defaultSelectOption,
  numberOfRoomsSelectOptions,
  numberOfBedsSelectOptions,
} from '@/modules/Housing/lib';
import PropTypes from 'prop-types';

const {
  UNIT_NUMBER_OF_ROOMS_NAME,
  UNIT_ROOMS_NAME,
  UNIT_NUMBER_OF_BEDS_NAME,
  UNIT_NUMBER_OF_ROOMS_LABEL,
  UNIT_ROOMS_LABEL,
} = apartmentConstants;

const RoomsField = ({
  handleChange,
  canEditField,
}) => {
  const {
    watch,
    control,
    formState: { errors },
    register,
  } = useFormContext();

  const {
    [UNIT_NUMBER_OF_ROOMS_NAME]: numOfRooms,
  } = watch();

  const { fields: bedFields, append, remove } = useFieldArray({
    control,
    name: UNIT_ROOMS_NAME,
  });

  useEffect(() => {
    if (numOfRooms) {
      let currentNumberOfRooms = bedFields.length;

      while (currentNumberOfRooms < parseInt(numOfRooms)) {
        append({ [UNIT_NUMBER_OF_BEDS_NAME]: '' });
        currentNumberOfRooms++;
      }

      while (currentNumberOfRooms > parseInt(numOfRooms)) {
        remove(currentNumberOfRooms - 1);
        currentNumberOfRooms--;
      }
    }
  }, [numOfRooms, bedFields, append, remove]);

  return (
    <>
      <CustomFormElement
        id={UNIT_NUMBER_OF_ROOMS_NAME}
        name={UNIT_NUMBER_OF_ROOMS_NAME}
        label={UNIT_NUMBER_OF_ROOMS_LABEL}
        type="select"
        selectOptions={[...defaultSelectOption, ...numberOfRoomsSelectOptions]}
        onChange={handleChange}
        register={register}
        error={errors?.[UNIT_NUMBER_OF_ROOMS_NAME]}
        disabled={!canEditField(UNIT_NUMBER_OF_ROOMS_NAME)}
        required
      />
      {bedFields && bedFields.map((field, index) => {
        const bedFieldName = `${UNIT_ROOMS_NAME}.${index}.${UNIT_NUMBER_OF_BEDS_NAME}`;

        return (
          <CustomFormElement
            id={bedFieldName}
            key={bedFieldName}
            name={bedFieldName}
            label={`${UNIT_ROOMS_LABEL} ${index + 1}`}
            type="select"
            selectOptions={[...defaultSelectOption, ...numberOfBedsSelectOptions]}
            onChange={handleChange}
            register={register}
            error={errors?.[UNIT_ROOMS_NAME]?.[index]?.[UNIT_NUMBER_OF_BEDS_NAME]}
            disabled={!canEditField(UNIT_NUMBER_OF_BEDS_NAME)}
            required
          />
        );
      })}
    </>
  );
};

RoomsField.propTypes = {
  handleChange: PropTypes.func,
  canEditField: PropTypes.func,
};

export default RoomsField;
