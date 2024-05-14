import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const InitialDiscountRate = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'initial_discount_rate'}
      label={'Initial Discount %'}
      required
      type="number"
      min={0}
      step="1"
      {...props}
    />
  );
};

export default InitialDiscountRate;
