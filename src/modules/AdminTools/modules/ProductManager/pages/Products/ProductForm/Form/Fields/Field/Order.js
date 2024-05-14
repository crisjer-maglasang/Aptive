import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';

const { ORDER, ORDER_LABEL } = productManagerConstants;

const Order = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="number"
      step={1}
      name={ORDER}
      label={ORDER_LABEL}
      required
    />
  );
};

export default Order;
