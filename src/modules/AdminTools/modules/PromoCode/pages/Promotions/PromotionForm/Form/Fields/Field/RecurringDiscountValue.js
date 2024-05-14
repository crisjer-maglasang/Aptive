import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const RecurringDiscountValue = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'recurring_discount_value'}
      label={'Recurring Discount $'}
      required
      type="number"
      min={0}
      step="0.01"
      {...props}
    />
  );
};

export default RecurringDiscountValue;
