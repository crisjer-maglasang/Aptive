import { addFsExcludeClass } from '@/lib/utils';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ExperienceListItem = ({
  errors,
  id,
  fields,
  canEditField,
  index,
  handleDeleteClick,
  handleOnChange,
  register,
  onBlur,
  parentName,
  showDelete,
  dataset,
}) => {
  return (
    <div key={index} className={classNames({ 'mt-3': index > 0 })}>
      <div
        className={classNames(
          'p-5 bg-gray-50 border shadow-sm',
          index > 0 ? 'mt-3 rounded-lg' : 'border-t-0 rounded-b-lg',
        )}
      >
        {showDelete && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleDeleteClick(id, index)}
              className="text-sm text-gray-700 p-0.5"
              disabled={!canEditField(parentName)}
            >
              Delete
            </button>
          </div>
        )}
        <div className="w-full px-3 py-4 bg-gray-50 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
          {fields.map(({
            component: FieldComponent,
            name: fieldName,
            props,
            dependsOn,
          }) => {
            const entityName = `${parentName}[${index}].${fieldName}`;
            const entityError = errors && errors?.[parentName]?.[index]?.[fieldName];
            const isDisplay = dependsOn ? dataset?.[dependsOn.name] === dependsOn.value : true;

            return isDisplay ? (
              <FieldComponent
                {...props}
                key={`${fieldName}-${id}`}
                id={`${fieldName}-${id}`}
                name={entityName}
                register={register}
                onChange={handleOnChange}
                onBlur={(event) => onBlur(event, entityName)}
                error={entityError}
                disabled={!canEditField(fieldName)}
                className={addFsExcludeClass()}
                formElementWrapperClassName="flex-1 mt-1"
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

ExperienceListItem.propTypes = {
  canEditField: PropTypes.func,
  id: PropTypes.string,
  index: PropTypes.number,
  fields: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.elementType.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
  })),
  register: PropTypes.func,
  handleOnChange: PropTypes.func,
  onBlur: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  parentName: PropTypes.string,
  errors: PropTypes.object,
  showDelete: PropTypes.bool,
};

export default ExperienceListItem;
