import { CustomFormElement } from '@/components';
import { useFormContext } from 'react-hook-form';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';

const { ORDER, ORDER_LABEL } = productManagerConstants;

const Order = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="number"
      name={ORDER}
      label={ORDER_LABEL}
      step={1}
      required
    />
  );
};

export default Order;
