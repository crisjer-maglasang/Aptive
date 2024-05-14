import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Select } from '@/components/common';
import { agreementLengthUnitsSelector } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/agreement-lengths';

const EditUnit = ({ value, name, onChange }) => {
  const units = useSelector(agreementLengthUnitsSelector);

  const options = useMemo(() => {
    if (!units) {
      return [];
    }

    return units.map((unit) => ({
      label: unit,
      value: unit,
    }));
  }, [units]);

  return (
    <Select
      {...{
        onChange,
        value,
        options,
        name,
      }}
      required
    />
  );
};

EditUnit.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditUnit;
