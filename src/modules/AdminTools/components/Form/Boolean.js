import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const Boolean = ({ name, ...props }) => {
  const radioOptions = [
    {
      label: 'Yes',
      value: 'true',
      id: `${name}True`,
    },
    {
      label: 'No',
      value: 'false',
      id: `${name}False`,
    },
  ];
  const { register, setValue } = useFormContext();
  const value = useWatch({ name });

  const valueCast = useMemo(() => {
    if (typeof value !== 'string') {
      return value ? 'true' : 'false';
    }

    return value;
  }, [value]);

  return (
    <CustomFormElement
      {...{ register, name, radioOptions }}
      type="radio"
      id={name}
      checked={valueCast}
      onChange={({ target: { value } }) => setValue(name, value)}
      orientation="horizontal"
      required
      {...props}
    />
  );
};

Boolean.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Boolean;
