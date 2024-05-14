import {
  pricingConstants,
  productManagerConstants,
} from '@/modules/AdminTools/lib/constants';
import Price from './Price';
import ProductSelect from './ProductSelect';

const table = (required) => [
  {
    label: productManagerConstants.NAME_LABEL,
    id: productManagerConstants.NAME,
    render: ({ index }) => <ProductSelect {...{ index }} />,
  },
  ...pricingConstants.PRICES.map(({ id, label }) => ({
    label,
    id,
    render: ({ index }) => <Price {...{ index, required }} field={id} />,
  })),
  {
    id: 'trash',
    label: '',
    render: ({ remove }) => (
      <div className="cursor-pointer text-primary-300" onClick={remove}>
        remove
      </div>
    ),
  },
];

export default table;
