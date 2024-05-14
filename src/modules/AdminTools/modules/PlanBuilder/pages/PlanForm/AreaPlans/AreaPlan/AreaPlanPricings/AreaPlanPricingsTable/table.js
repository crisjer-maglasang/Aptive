import PlanPricingLevelSelect from './PlanPricingLevelSelect';
import Price from './Price';
import {
  planPricingLevelConstants,
  pricingConstants,
} from '@/modules/AdminTools/lib/constants';

const table = (required) => [
  {
    label: planPricingLevelConstants.NAME_LABEL,
    id: planPricingLevelConstants.NAME,
    render: ({ index }) => <PlanPricingLevelSelect {...{ index }} />,
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
