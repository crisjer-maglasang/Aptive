import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Select } from '@/components/common';
import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';
import { CustomErrorMessage } from '@/components/common/Form';

const PlanSelect = ({ planId, label, other }) => {
  const { setValue } = useFormContext();
  const plans = useSelector(plansSelector);
  const otherValue = useWatch({ name: other });
  const currentValue = useWatch({ name: planId });

  const errors = useSelector(
    (state) => state?.errors?.errors?.planUpgradePathsUpdate?.[planId]
  );

  const filteredPlans = useMemo(() => {
    return plans.filter(({ id }) => id != otherValue);
  }, [otherValue, plans]);

  const options = useMemo(() => {
    if (!filteredPlans) {
      return [];
    }

    return filteredPlans.map(({ id, name }) => ({
      label: `${id} - ${name}`,
      value: id,
    }));
  }, [filteredPlans]);

  useEffect(() => {
    if (!options.length || currentValue) {
      return;
    }

    const timeout = setTimeout(() => {
      setValue(planId, options[0].value);
    }, 150);

    return () => clearTimeout(timeout);
  }, [options, setValue, planId, currentValue]);

  return (
    <div className="flex flex-col w-64">
      <div className="flex items-center">
        <div className="flex text-sm font-medium text-gray-700">
          <label>
            {label}
            <span className="text-red-500">{' *'}</span>
          </label>
        </div>
      </div>
      <div className="mt-0.5 block rounded-md shadow-sm">
        <Controller
          name={planId}
          render={({ field: { onChange, value, name } }) => (
            <Select
              {...{
                name,
                onChange,
                value,
                options,
              }}
              hasError={errors}
              required
            />
          )}
        />
      </div>
      {errors?.length && <CustomErrorMessage text={errors[0]} />}
    </div>
  );
};

PlanSelect.propTypes = {
  label: PropTypes.string,
  other: PropTypes.string,
  planId: PropTypes.string,
};

export default PlanSelect;
