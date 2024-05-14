import PropTypes from 'prop-types';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CustomFormElement, CustomButton } from '@/components';

const Create = ({ defaultValues, onCreate, fields, error }) => {
  const methods = useForm({ defaultValues });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trimming, setTrimming] = useState(false);
  const { register, setValue, handleSubmit, reset, watch } = methods;
  const data = watch();

  const errors = useSelector(
    (state) => state?.errors?.errors?.[error ?? 'settingUpdate']
  );

  const isUpdating = useSelector(
    (state) => state?.loading?.[error ?? 'updatePlanBuilderSetting']?.isLoading
  );

  const successfulUpdate = useMemo(
    () => isSubmitted && !isUpdating && !errors,
    [isUpdating, errors, isSubmitted]
  );

  useEffect(() => {
    const dataChanged = [];

    Object.keys(data).forEach((inputName) => {
      if (typeof data[inputName] == 'string') {
        const newData = data[inputName].trim();
        if (newData != data[inputName]) {
          dataChanged.push([inputName, newData]);
        }
      }
    });

    let timeoutId;
    if (dataChanged.length > 0) {
      setTrimming(true);

      // Trim all inputs after 1 second (adjust as needed)
      timeoutId = setTimeout(() => {
        dataChanged.forEach(([inputName, newData]) => {
          setValue(inputName, newData);
        });
        setTrimming(false);
      }, 500);
    }

    // Clear the timeout if the component unmounts
    return () => timeoutId && clearTimeout(timeoutId);
  }, [data, setValue]);

  useEffect(() => {
    if (errors && isSubmitted) {
      setIsSubmitted(false);
    }
  }, [setIsSubmitted, errors, isSubmitted]);

  const submit = useCallback(
    (data) => {
      if (trimming) {
        return;
      }

      setIsSubmitted(true);

      onCreate(data);
    },
    [onCreate, trimming]
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (successfulUpdate) {
        reset();
        setIsSubmitted(false);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [reset, successfulUpdate]);

  const unlistedError = useMemo(() => {
    if (!errors) {
      return errors;
    }
    const names = fields.map(({ name }) => name);
    const keys = Object.keys(errors).filter((key) => !names.includes(key));

    return keys.map((key) => errors[key]).join(',');
  }, [errors]);

  return (
    <div className="m-2">
      {unlistedError && <div className="text-red-500">{unlistedError}</div>}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-row m-4 space-x-4">
            {fields.map((field, index) => (
              <Fragment key={index}>
                {field.CreateRender !== false && (
                  <>
                    {!field.CreateRender && (
                      <CustomFormElement
                        {...{ register }}
                        onChange={({ target: { value } }) =>
                          setValue(field.name, value)
                        }
                        {...field}
                        error={errors?.[field.name]}
                      />
                    )}
                    {field.CreateRender && <field.CreateRender />}
                  </>
                )}
              </Fragment>
            ))}
          </div>
          <CustomButton color={'green'} type="submit">
            Create
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};

Create.propTypes = {
  defaultValues: PropTypes.any.isRequired,
  fields: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
  schema: PropTypes.any,
  error: PropTypes.string,
};

export default Create;
