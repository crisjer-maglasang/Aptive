import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';

const Order = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="number"
      name="plan_data.order"
      label="Order"
      step={1}
      required
    />
  );
};

export default Order;
