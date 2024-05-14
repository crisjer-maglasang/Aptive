import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';

import { Select } from '@/components/common';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import { targetContractValuesSelector } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/target-contract-values';
import { selectAreasList } from '@/redux/areas-new';

const { AREA_LABEL, AREA } = planBuilderConstants;

const AreaSelect = () => {
  const areas = useSelector(selectAreasList);
  const targetContractValues = useSelector(targetContractValuesSelector);

  const { setValue } = useFormContext();

  const options = useMemo(() => {
    if (!areas) {
      return [];
    }
    const areaIds = targetContractValues.map(({ area_id }) => area_id);

    return areas
      .filter(({ area_id }) => !areaIds.includes(area_id))
      .map(({ area_id, area_name }) => ({
        label: area_name,
        value: area_id,
      }));
  }, [areas, targetContractValues]);

  useEffect(() => {
    if (!options.length) {
      return;
    }
    setValue(AREA, options[0].value);
  }, [options, setValue]);

  return (
    <div className="flex flex-col w-64">
      <div className="flex items-center">
        <div className="flex text-sm font-medium text-gray-700">
          <label>
            {'*'}
            {AREA_LABEL}
          </label>
        </div>
      </div>
      <div className="mt-0.5 block rounded-md shadow-sm">
        <Controller
          name={AREA}
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

export default AreaSelect;
