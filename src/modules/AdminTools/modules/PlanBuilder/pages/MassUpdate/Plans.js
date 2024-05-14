import { useSelector } from 'react-redux';

import { CustomButton, Select } from '@/components/common';
import { useFormContext } from 'react-hook-form';
import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';

const toOptions = (arr) =>
  arr.map(({ id, name }) => ({
    label: `${id} - ${name}`,
    value: id,
  }));

const Plans = () => {
  const { setValue } = useFormContext();
  const [planCategories, setPlanCategories] = useState([]);
  const [planIds, setPlanIds] = useState([]);
  const plans = useSelector(plansSelector);
  const {
    options: { plan_categories },
  } = useSelector(settingsSelector);
  const filteredPlans = useMemo(() => {
    if (planCategories.length === 0) {
      return plans;
    }

    return plans.filter(({ plan_category_ids }) =>
      planCategories.some((id) => plan_category_ids.includes(id))
    );
  }, [planCategories, plans]);
  const allPlans = useMemo(
    () => filteredPlans.map(({ id }) => id),
    [filteredPlans]
  );
  const planOptions = useMemo(() => toOptions(filteredPlans), [filteredPlans]);

  const addAll = useCallback(() => {
    setPlanIds(allPlans);
  }, [allPlans]);

  const onPlanChange = (planIds) => {
    setPlanIds(planIds);
  };

  useEffect(() => {
    setPlanIds((oldPlanIds) =>
      oldPlanIds.filter((oldPlanId) => allPlans.includes(oldPlanId))
    );
  }, [allPlans]);

  useEffect(() => {
    setValue('plan_ids', planIds);
  }, [planIds, setValue]);

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row space-x-4 items-center">
        <div className="pl-4">Plans</div>
        <div>
          <CustomButton onClick={addAll} color="green">
            Select All Plans
          </CustomButton>
        </div>
        <div>Plan Categories:</div>
        <div className="w-64">
          <Select
            isMulti
            closeMenuOnSelect={false}
            name={'plan_categories'}
            value={planCategories}
            options={plan_categories}
            onChange={({ target: { value } }) => setPlanCategories(value)}
          />
        </div>
      </div>
      <div className="w-full px-4">
        <Select
          isMulti
          closeMenuOnSelect={false}
          name={'plan_ids'}
          value={planIds}
          options={planOptions}
          onChange={({ target: { value } }) => onPlanChange(value)}
          required
        />
      </div>
    </div>
  );
};

export default Plans;
