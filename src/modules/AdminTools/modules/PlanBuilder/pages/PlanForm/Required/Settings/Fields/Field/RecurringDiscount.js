import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import { CustomFormElement } from '@/components/common';

const { RECURRING_DISCOUNT, RECURRING_DISCOUNT_LABEL } = planBuilderConstants;

const RecurringDiscount = () => {
  const { register } = useFormContext();

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);

  const discountErrors = planErrors?.[RECURRING_DISCOUNT];

  return (
    <CustomFormElement
      register={register}
      type="number"
      step={0.01}
      id={RECURRING_DISCOUNT}
      name={RECURRING_DISCOUNT}
      label={RECURRING_DISCOUNT_LABEL}
      required
      error={discountErrors}
      min={0}
    />
  );
};

export default RecurringDiscount;
