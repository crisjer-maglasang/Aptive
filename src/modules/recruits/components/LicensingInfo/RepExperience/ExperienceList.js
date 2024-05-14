import { CustomErrorMessage, CustomFormElement } from '@/components/common/Form';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CustomButton } from '@/components/common';
import { repExperienceRadioConfig } from '@/lib/configs';
import { onboardingConstants } from '@/lib/constants';
import ExperienceListItem from './ExperienceListItem';

const {
  REP_EXPERIENCE_LABEL,
  HAS_REP_EXPERIENCE,
} = onboardingConstants;

const ExperienceList = ({
  canEditField,
  constants,
  onChangeHandler,
  wrapperClassName,
}) => {
  const { register, control, getValues, setValue, trigger, formState: { errors } } = useFormContext();

  const data = getValues(constants.parentName);
  const errorValues = errors[constants.parentName];

  const { append, remove } = useFieldArray({
    control,
    name: constants.parentName,
    defaultValues: { [constants.parentName]: [] },
  });

  const handleOnChange = useCallback((event) => {
    try {
      const { name, value } = event.target;
      const [, parentName, index, fieldName] = name.match(/(\w+)\[(\d+)]\.(\w+)/);

      setValue(name, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });

      // Re-validate dependent fields upon the field update.
      constants.fields.find((field) => field.name === fieldName)?.revalidate.map(async (dependency) => {
        if (data[index]?.[dependency]) {
          await trigger(`${parentName}[${index}].${dependency}`);
        }
      });
    } catch (error) {
      //
    }
  }, [
    setValue,
    trigger,
    constants.fields,
    data,
  ]);

  const onBlurTrimSpace = (event, name) => {
    handleOnChange({
      target: {
        name,
        value: event.target.value.trim(),
      },
      type: event.type,
    });
  };

  const handleDeleteClick = useCallback((id, index) => {
    remove(index);
  }, [remove]);

  const appendEmptyListElement =useCallback(() => {
    append(constants.fields.reduce((acc, item) => ({ ...acc, [item.name]: '' }), {}));
  }, [append, constants.fields]);

  const handleAddClick= useCallback(() => {
    appendEmptyListElement();
  }, [appendEmptyListElement]);

  const onRadioChangeHandler = (event) => {
    const { value } = event.target;

    if (value === '0') {
      remove();
    } else {
      appendEmptyListElement();
    }

    onChangeHandler(event);
  };

  return (
    <>
      <div className={wrapperClassName}>
        <CustomFormElement
          label={REP_EXPERIENCE_LABEL}
          type="radio"
          id={HAS_REP_EXPERIENCE}
          name={HAS_REP_EXPERIENCE}
          colSpan={12}
          register={register}
          radioOptions={repExperienceRadioConfig}
          onChange={onRadioChangeHandler}
          orientation="horizontal"
          required
          disabled={!canEditField(HAS_REP_EXPERIENCE)}
          isOpen={data?.[HAS_REP_EXPERIENCE] === repExperienceRadioConfig[0].value}
        />
      </div>
      {data?.length > 0 ? data?.map((dataset, index) => {
        return (
          <ExperienceListItem
            errors={errors}
            fields={constants.fields}
            canEditField={canEditField}
            index={index}
            id={dataset.setId}
            handleDeleteClick={handleDeleteClick}
            parentName={constants.parentName}
            handleOnChange={handleOnChange}
            dataset={dataset}
            register={register}
            onBlur={onBlurTrimSpace}
            key={index}
            showDelete={data.length > 1}
          />
        );
      }) : null}
      {data?.length > 0 && (
        <div className="flex justify-end">
          <CustomButton
            onClick={handleAddClick}
            color="white"
            className="items-center mt-6 h-9"
            disabled={!canEditField(constants.parentName)}
          >
            {constants.buttonText}
          </CustomButton>
        </div>
      )}
      {errorValues?.message && (
        <div className="mt-4">
          <CustomErrorMessage text={errorValues?.message} />
        </div>
      )}
    </>

  );
};

ExperienceList.propTypes = {
  canEditField: PropTypes.func,
  constants: PropTypes.object,
  onChangeHandler: PropTypes.func,
};

export default ExperienceList;
