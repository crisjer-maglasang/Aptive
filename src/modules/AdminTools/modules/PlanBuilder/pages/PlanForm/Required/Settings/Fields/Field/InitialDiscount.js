import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import { CustomFormElement } from '@/components/common';

const { INITIAL_DISCOUNT, INITIAL_DISCOUNT_LABEL } = planBuilderConstants;

const InitialDiscount = () => {
  const { register } = useFormContext();

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);

  const discountErrors = planErrors?.[INITIAL_DISCOUNT];

  return (
    <CustomFormElement
      register={register}
      type="number"
      id={INITIAL_DISCOUNT}
      name={INITIAL_DISCOUNT}
      label={INITIAL_DISCOUNT_LABEL}
      required
      error={discountErrors}
      min={0}
      step={0.01}
    />
  );
};

export default InitialDiscount;
