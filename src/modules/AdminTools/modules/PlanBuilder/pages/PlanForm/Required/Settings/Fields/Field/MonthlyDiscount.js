import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import { CustomFormElement } from '@/components/common';

const { MONTHLY_DISCOUNT, MONTHLY_DISCOUNT_LABEL } = planBuilderConstants;

const MonthlyDiscount = () => {
  const { register } = useFormContext();

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);

  const discountErrors = planErrors?.[MONTHLY_DISCOUNT];

  return (
    <CustomFormElement
      register={register}
      type="number"
      id={MONTHLY_DISCOUNT}
      name={MONTHLY_DISCOUNT}
      label={MONTHLY_DISCOUNT_LABEL}
      required
      error={discountErrors}
      min={0}
      step={0.01}
    />
  );
};

export default MonthlyDiscount;
