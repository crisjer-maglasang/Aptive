import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';

const InitialDiscount = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="number"
      name="plan_data.initial_discount"
      label="Initial Discount"
      step={0.01}
      min={0}
      max={100}
      required
    />
  );
};

export default InitialDiscount;
