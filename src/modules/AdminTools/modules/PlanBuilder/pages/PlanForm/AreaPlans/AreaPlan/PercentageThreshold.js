import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components';
import { useAreaPlan } from './AreaContext';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

const { PERCENTAGE_THRESHOLD_LABEL, PERCENTAGE_THRESHOLD } =
  planBuilderConstants;

const PercentageThreshold = () => {
  const areaPlan = useAreaPlan();
  const name = `${areaPlan}.${PERCENTAGE_THRESHOLD}`;
  const { register } = useFormContext();

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);

  const percentageErrors = planErrors?.[name];

  return (
    <div className="mt-4 w-48">
      <CustomFormElement
        {...{ register }}
        type="number"
        name={name}
        label={PERCENTAGE_THRESHOLD_LABEL}
        max={100}
        min={0}
        error={percentageErrors}
      />
    </div>
  );
};

export default PercentageThreshold;
