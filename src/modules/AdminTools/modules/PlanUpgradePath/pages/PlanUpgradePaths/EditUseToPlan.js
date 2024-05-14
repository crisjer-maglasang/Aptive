import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { CustomFormElement } from '@/components';

const EditUseToPlan = ({ id, value, onChange }) => {
  const useToPlanCast = useMemo(() => {
    if (typeof fieldValue !== 'string') {
      return value ? 'true' : 'false';
    }

    return value;
  }, [value]);

  const radioOptions = [
    {
      label: 'Yes',
      value: 'true',
      id: `useToPlanEditTrue-${id}`,
    },
    {
      label: 'No',
      value: 'false',
      id: `useToPlanEditFalse-${id}`,
    },
  ];

  return (
    <CustomFormElement
      type="radio"
      radioOptions={radioOptions}
      checked={useToPlanCast}
      onChange={({ target: { value } }) => {
        if (typeof value === 'string') {
          value = value === 'true';
        }

        onChange({ target: { value } }, true);
      }}
      orientation="horizontal"
      required
    />
  );
};

EditUseToPlan.propTypes = {
  value: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditUseToPlan;
