import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const InitialDiscountValue = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'initial_discount_value'}
      label={'Initial Discount $'}
      required
      type="number"
      min={0}
      step="0.01"
      {...props}
    />
  );
};

export default InitialDiscountValue;
