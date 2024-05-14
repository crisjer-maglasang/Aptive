import { useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';

import { Select } from '@/components/common';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const PlanCategorySelect = () => {
  const { setValue } = useFormContext();

  const [searchParams] = useSearchParams();

  const {
    options: { plan_categories },
  } = useSelector(settingsSelector);

  const name = 'plan_category_id';

  useEffect(() => {
    if (plan_categories.length === 0) {
      return;
    }

    if (!searchParams.get('plan_category_id')) {
      setValue('plan_category_id', plan_categories[0].value);
    }
  }, [plan_categories, searchParams, setValue]);

  return (
    <div className="w-64">
      <div className="flex items-center">
        <div className="flex text-sm font-medium text-gray-700">
          <label>{'*Plan Category'}</label>
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
              options={plan_categories}
              defaultOption={{ value: '', label: 'Select...' }}
              required
            />
          )}
        />
      </div>
    </div>
  );
};

export default PlanCategorySelect;
