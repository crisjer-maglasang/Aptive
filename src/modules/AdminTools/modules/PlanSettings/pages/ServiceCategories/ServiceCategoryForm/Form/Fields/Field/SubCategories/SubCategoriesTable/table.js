import Order from './Order';
import Name from './Name';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';

const { NAME, ORDER } = productManagerConstants;

const table = [
  {
    label: NAME,
    render: ({ index }) => <Name {...{ index }} />,
  },
  {
    label: ORDER,
    render: ({ index }) => <Order {...{ index }} />,
  },
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
