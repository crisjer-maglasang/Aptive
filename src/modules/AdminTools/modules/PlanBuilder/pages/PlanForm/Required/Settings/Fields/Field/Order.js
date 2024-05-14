import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import { CustomFormElement } from '@/components/common';

const { ORDER, ORDER_LABEL } = planBuilderConstants;

const Order = () => {
  const { register } = useFormContext();

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);

  const discountErrors = planErrors?.[ORDER];

  return (
    <CustomFormElement
      register={register}
      type="number"
      id={ORDER}
      name={ORDER}
      label={ORDER_LABEL}
      step={1}
      required
      error={discountErrors}
    />
  );
};

export default Order;
