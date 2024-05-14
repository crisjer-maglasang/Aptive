import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const RecurringDiscountRate = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'recurring_discount_rate'}
      label={'Recurring Discount %'}
      required
      type="number"
      min={0}
      step="1"
      {...props}
    />
  );
};

export default RecurringDiscountRate;
