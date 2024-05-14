import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import { Select } from '@/components/common';
import Field from './Field';
import { useFormContext } from 'react-hook-form';

const Fields = ({ Edits, dataField, fieldOptions }) => {
  const [fields, setPlanFields] = useState([]);
  const { unregister } = useFormContext();

  const options = useMemo(
    () => fieldOptions.filter(({ value }) => !fields.includes(value)),
    [fieldOptions, fields]
  );

  const remove = (field) => {
    setPlanFields((oldFields) => oldFields.filter((ff) => ff !== field));
    unregister(`${dataField}.${field}`);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row items-center">
        <div className="px-4">Fields:</div>
        <div className="w-64">
          <Select
            name="planDataFields"
            options={options}
            onChange={({ target: { value } }) =>
              setPlanFields((oldFields) => [...oldFields, value])
            }
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        {fields.map((field) => (
          <Field key={field} Edit={Edits[field]} remove={() => remove(field)} />
        ))}
      </div>
    </div>
  );
};

Fields.propTypes = {
  Edits: PropTypes.object.isRequired,
  dataField: PropTypes.string.isRequired,
  fieldOptions: PropTypes.array.isRequired,
};

export default Fields;
