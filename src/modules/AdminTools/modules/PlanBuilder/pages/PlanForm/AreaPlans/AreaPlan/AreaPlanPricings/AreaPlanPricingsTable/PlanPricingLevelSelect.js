import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormContext, useWatch } from 'react-hook-form';
import { useMemo } from 'react';

import { CustomFormElement } from '@/components';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { useAreaPlan } from '../../AreaContext';

const PlanPricingLevelSelect = ({ index }) => {
  const { register, setValue } = useFormContext();

  const { plan_pricing_levels } = useSelector(settingsSelector);

  const areaPlan = useAreaPlan();
  const name = `${areaPlan}.area_plan_pricings`;
  const selectName = `${name}[${index}].plan_pricing_level_id`;
  const pricings = useWatch({
    name,
  });
  const currentPlanPricingLevelId = useWatch({
    name: selectName,
  });

  const excludeIds = useMemo(
    () =>
      pricings
        .filter(
          ({ plan_pricing_level_id }) =>
            currentPlanPricingLevelId === '' ||
            +plan_pricing_level_id !== +currentPlanPricingLevelId
        )
        .map(({ plan_pricing_level_id }) => +plan_pricing_level_id),
    [currentPlanPricingLevelId, pricings]
  );

  const options = useMemo(
    () => [
      {
        name: 'Select a Pricing Level',
        value: '',
      },
      ...plan_pricing_levels
        .filter(({ id }) => !excludeIds.includes(+id))
        .map(({ name, id }) => ({
          name,
          value: id,
        })),
    ],
    [excludeIds, plan_pricing_levels]
  );

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);
  const planPricingLevelErrors =
    planErrors?.[`${name}.${index}.plan_pricing_level_id`];

  return (
    <div className="w-28">
      <CustomFormElement
        type="select"
        register={register}
        id={selectName}
        name={selectName}
        selectOptions={options}
        onChange={({ target: { value } }) => setValue(selectName, value)}
        error={planPricingLevelErrors}
      />
    </div>
  );
};

PlanPricingLevelSelect.propTypes = {
  index: PropTypes.number.isRequired,
};

export default PlanPricingLevelSelect;
