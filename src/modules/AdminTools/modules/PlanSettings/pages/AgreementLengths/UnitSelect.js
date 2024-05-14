import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Select } from '@/components/common';
import { Controller } from 'react-hook-form';
import { agreementLengthUnitsSelector } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/agreement-lengths';
import { agreementLengthConstants } from '@/modules/AdminTools/lib/constants';

const { UNIT, UNIT_LABEL } = agreementLengthConstants;

const UnitSelect = () => {
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
    <div className="flex flex-col w-64">
      <div className="flex items-center">
        <div className="flex text-sm font-medium text-gray-700">
          <label>
            {UNIT_LABEL}
            <span className="text-red-500">{' *'}</span>
          </label>
        </div>
      </div>
      <div className="mt-0.5 block rounded-md shadow-sm">
        <Controller
          name={UNIT}
          render={({ field: { onChange, value, name } }) => (
            <Select
              {...{
                name,
                onChange,
                value,
                options,
              }}
              required
            />
          )}
        />
      </div>
    </div>
  );
};

export default UnitSelect;
