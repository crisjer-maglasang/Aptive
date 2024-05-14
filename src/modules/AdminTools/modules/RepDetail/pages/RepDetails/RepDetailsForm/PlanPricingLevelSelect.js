import { useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';

import { Select } from '@/components/common';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const PlanPricingLevelSelect = () => {
  const { setValue } = useFormContext();

  const [searchParams] = useSearchParams();

  const {
    options: { plan_pricing_levels },
  } = useSelector(settingsSelector);

  const name = 'plan_pricing_level_id';

  useEffect(() => {
    if (plan_pricing_levels.length === 0) {
      return;
    }

    if (!searchParams.get('plan_pricing_level_id')) {
      setValue('plan_pricing_level_id', plan_pricing_levels[0].value);
    }
  }, [plan_pricing_levels, searchParams, setValue]);

  return (
    <div className="w-64">
      <div className="flex items-center">
        <div className="flex text-sm font-medium text-gray-700">
          <label>{'*Plan Pricing Level'}</label>
        </div>
      </div>
      <div className={'mt-0.5 block rounded-md shadow-sm'}>
        <Controller
          name={name}
          render={({ field: { onChange, value, name } }) => (
            <Select
              {...{
                name,
                onChange,
                value,
              }}
              options={plan_pricing_levels}
              defaultOption={{ value: '', label: 'Select...' }}
              required
            />
          )}
        />
      </div>
    </div>
  );
};

export default PlanPricingLevelSelect;
