import { formatCurrency } from '@/lib';
import {
  pricingConstants,
  productManagerConstants,
} from '@/modules/AdminTools/lib/constants';

const { IS_RECURRING } = productManagerConstants;

const { RECURRING } = pricingConstants;

const Price = ({ field, product }) => {
  const price = formatCurrency(product[field]);

  const isRecurring = product[IS_RECURRING];

  const needsRecurring = RECURRING.includes(field);

  if (needsRecurring && !isRecurring) {
    return null;
  }

  return price;
};

export default Price;
