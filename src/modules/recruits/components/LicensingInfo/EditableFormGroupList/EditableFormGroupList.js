import { CustomErrorMessage } from '@/components/common/Form';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CreateListItem from './CreateListItem';
import EditableListItem from './EditableListItem';

const EditableFormGroupList = ({
  isAdmin,
  isPersonalWizard,
  canEditField,
  constants,
  validationSchema,
}) => {
  const { register, control, getValues, setValue, trigger, formState: { errors } } = useFormContext();

  const data = getValues(constants.parentName);
  const errorValues = errors[constants.parentName];

  const { append, remove } = useFieldArray({
    control,
    name: constants.parentName,
    defaultValues: { [constants.parentName]: [] },
  });

  const wrappersClasses = useMemo(
    () => classNames(
      'flex flex-col pb-6 mt-6 border border-gray-200 gap-y-6 gap-x-4',
      { 'border-red-200': errorValues?.message },
    ),
    [errorValues?.message],
  );

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

  return (
    <>
      <div className={wrappersClasses}>

        <CreateListItem
          isAdmin={isAdmin}
          fieldsData={constants.fields}
          canEditField={canEditField}
          buttonText={constants.buttonText}
          onAddItem={append}
          onBlur={(event, fieldName) => onBlurTrimSpace(event, fieldName)}
          validationSchema={validationSchema}
          isPersonalWizard={isPersonalWizard}
        />
        {data?.length > 0
          ? data?.map((dataset, index) => {
            return (
              <div className="border-t border-gray-200" key={dataset.setId}>
                <EditableListItem
                  canEditField={canEditField}
                  id={dataset.setId}
                  index={index}
                  fields={constants.fields}
                  parentName={constants.parentName}
                  onChange={handleOnChange}
                  onBlur={(event, fieldName) => onBlurTrimSpace(event, fieldName)}
                  register={register}
                  onDelete={handleDeleteClick}
                  errors={errorValues}
                />
              </div>
            );
          })
          : null}
      </div>
      {errorValues?.message && (
        <div className="mt-4">
          <CustomErrorMessage text={errorValues?.message} />
        </div>
      )}
    </>

  );
};

EditableFormGroupList.propTypes = {
  isAdmin: PropTypes.bool,
  isPersonalWizard: PropTypes.bool,
  canEditField: PropTypes.func,
  constants: PropTypes.object,
  validationSchema: PropTypes.object,
};

export default EditableFormGroupList;
