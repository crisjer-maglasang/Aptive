import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';

const RecurringDiscount = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="number"
      name="plan_data.recurring_discount"
      label="Recurring Discount"
      step={0.01}
      min={0}
      required
    />
  );
};

export default RecurringDiscount;
