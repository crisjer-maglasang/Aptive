import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const MaxDiscountValue = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'max_discount_value'}
      label={'Max Discount Value'}
      required
      type="number"
      min={0}
      step="0.01"
      {...props}
    />
  );
};

export default MaxDiscountValue;
