import { XIcon } from '@heroicons/react/outline';
import { CustomButton } from '@/components/common';
import { addFsExcludeClass } from '@/lib/utils';
import PropTypes from 'prop-types';

const EditableListItem = ({
  canEditField,
  id,
  index,
  fields,
  register,
  parentName,
  onChange,
  onBlur,
  onDelete,
  errors,
}) => {
  return (
    <div className="flex items-start pt-6 pl-6 pr-6 space-x-4">
      {fields.map(({
        component: FieldComponent,
        name: fieldName,
        props,
      }) => {
        const entityName = `${parentName}[${index}].${fieldName}`;
        const entityError = errors && errors?.[index]?.[fieldName];

        return (
          <FieldComponent
            {...props}
            key={`${fieldName}-${id}`}
            id={`${fieldName}-${id}`}
            name={entityName}
            register={register}
            onChange={onChange}
            onBlur={(event) => onBlur(event, entityName)}
            error={entityError}
            disabled={!canEditField(entityName)}
            className={addFsExcludeClass()}
            formElementWrapperClassName="flex flex-1 flex-col items-start"
          />
        );
      })}
      <CustomButton
        onClick={() => onDelete(id, index)}
        color="white"
        className="items-center mt-6 h-9"
        disabled={!canEditField(parentName)}
      >
        <XIcon className="inline-block w-6 h-6" aria-hidden="true" />
      </CustomButton>
    </div>
  );
};

EditableListItem.propTypes = {
  canEditField: PropTypes.func,
  id: PropTypes.string,
  index: PropTypes.number,
  fields: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.elementType.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
  })),
  register: PropTypes.func,
  parentName: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onDelete: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.arrayOf(PropTypes.object),
};

export default EditableListItem;
