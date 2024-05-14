import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { CustomFormElement } from '@/components';

const { ORDER, PRODUCT_SUB_CATEGORIES } = productManagerConstants;

const Order = ({ index }) => {
  const name = `${PRODUCT_SUB_CATEGORIES}[${index}].${ORDER}`;

  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="number"
      name={name}
      step={1}
      required
    />
  );
};

Order.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Order;
