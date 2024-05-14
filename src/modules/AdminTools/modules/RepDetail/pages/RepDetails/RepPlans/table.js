import { formatCurrency } from '@/lib/utils';
import Products from './Products';
import { pricingConstants } from '@/modules/AdminTools/lib/constants';

const { PRICES } = pricingConstants;

export const table = [
  {
    label: 'order',
    sortBy: 'order',
    render: ({ order }) => order,
  },
  {
    label: 'name',
    sortBy: 'name',
    render: (plan) => <Products {...{ plan }} />,
  },
  ...PRICES.map((price) => ({
    label: price.label,
    sortBy: price.id,
    render: (plan) => formatCurrency(plan[price.id]),
  })),
];
