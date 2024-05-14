import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';

const MonthlyDiscount = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="number"
      name="plan_data.monthly_discount"
      label="Monthly Discount"
      step={0.01}
      min={0}
      max={100}
      required
    />
  );
};

export default MonthlyDiscount;
