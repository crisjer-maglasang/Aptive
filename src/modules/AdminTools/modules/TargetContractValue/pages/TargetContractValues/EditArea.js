import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Select } from '@/components/common';
import { useGetAreaOptions } from './AreaContext';

const EditArea = ({ value, onChange, name }) => {
  const [originalValue] = useState(value);
  const getOptions = useGetAreaOptions();

  const [options, setOptions] = useState(getOptions(value));

  useEffect(() => {
    setOptions(getOptions(originalValue));
  }, [getOptions, originalValue]);

  return (
    <Select
      {...{
        onChange,
        value,
        options,
        name,
      }}
    />
  );
};

EditArea.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditArea;
