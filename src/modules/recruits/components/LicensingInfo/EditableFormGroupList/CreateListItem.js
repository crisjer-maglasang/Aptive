import { FormProvider, useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CustomButton } from '@/components/common';
import { addFsExcludeClass } from '@/lib/utils';

const CreateListItem = ({
  isAdmin,
  fieldsData,
  canEditField,
  onAddItem,
  buttonText,
  validationSchema,
  isPersonalWizard,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const defaultValues = useMemo(
    () => fieldsData.reduce((res, { name }) => ({ ...res, [name]: '' }), {}),
    [fieldsData],
  );

  const methods = useForm({
    defaultValues,
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    context: { isWizard: isPersonalWizard, isAdmin: isAdmin },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    getValues,
    trigger,
  } = methods;

  const data = getValues();

  useEffect(() => {
    const isFilled = isValid && Object?.values(data).every((item) => item?.length > 0);
    setIsButtonDisabled(!isFilled);
  }, [data, isValid]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValue(name, value, { shouldValidate: true });

    // Re-validate dependent fields upon the field update.
    fieldsData.find((field) => field.name === name)?.revalidate.map(async (dependency) => {
      if (data[dependency]) {
        await trigger(dependency);
      }
    });
  }, [
    setValue,
    trigger,
    fieldsData,
    data,
  ]);

  const onBlurTrimSpace = (event, name) => {
    handleChange({
      target: {
        name,
        value: event.target.value.trim(),
      },
      type: event.type,
    });
  };

  const handleAddItem = () => {
    onAddItem({ ...data, setId: uuidv4() });
    reset(defaultValues);
  };

  return (
    <>
      <div className={classNames('flex items-start pt-6 pl-6 pr-6 space-x-4')}>
        <FormProvider {...methods}>
          {fieldsData.map(({
            component: FieldComponent,
            name: fieldName,
            props,
          }) => {
            return (
              <FieldComponent
                {...props}
                key={fieldName}
                id={fieldName}
                name={fieldName}
                register={register}
                onChange={handleChange}
                onBlur={(event) => onBlurTrimSpace(event, fieldName)}
                error={errors[fieldName]}
                disabled={!canEditField(fieldName)}
                className={addFsExcludeClass()}
                formElementWrapperClassName="flex flex-1 flex-col items-start"
              />
            );
          })}
        </FormProvider>
      </div>

      <div className="flex items-center justify-start ml-6">
        <CustomButton
          onClick={handleSubmit(handleAddItem)}
          color="white"
          disabled={isButtonDisabled}
          text={buttonText}
        />
      </div>
    </>
  );
};

CreateListItem.propTypes = {
  isAdmin: PropTypes.bool,
  fieldsData: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.elementType.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
  })),
  isEditable: PropTypes.bool,
  onAddItem: PropTypes.func,
  buttonText: PropTypes.string,
  validationSchema: PropTypes.object,
  canEditField: PropTypes.func,
  isPersonalWizard: PropTypes.bool,
};

export default CreateListItem;
