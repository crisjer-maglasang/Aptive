import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import EditServiceCategory from './EditServiceCategory';

const {
  NAME_LABEL,
  NAME,
  PRODUCT_SUB_CATEGORIES_LABEL,
  PRODUCT_SUB_CATEGORIES,
  ORDER,
  ORDER_LABEL,
} = productManagerConstants;

const table = [
  {
    label: NAME_LABEL,
    sortBy: NAME,
    render: ({ category }) => <EditServiceCategory {...{ category }} />,
  },
  {
    label: ORDER_LABEL,
    sortBy: ORDER,
    render: ({ category }) => category[ORDER],
  },
  {
    label: PRODUCT_SUB_CATEGORIES_LABEL,
    sortBy: PRODUCT_SUB_CATEGORIES,
    render: ({ category }) => category[PRODUCT_SUB_CATEGORIES]?.length || 0,
  },
];

export default table;
