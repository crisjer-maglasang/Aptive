import {
  pricingConstants,
  productManagerConstants,
} from '@/modules/AdminTools/lib/constants';
import EditProduct from './EditProduct';
import Price from './Price';
import ProductCategory from './ProductCategory';
import ProductSubCategory from './ProductSubCategory';

const {
  NAME,
  NAME_LABEL,
  ORDER,
  ORDER_LABEL,
  PRODUCT_SUB_CATEGORY,
  PRODUCT_SUB_CATEGORY_LABEL,
  PRODUCT_CATEGORY,
  PRODUCT_CATEGORY_LABEL,
  IS_RECURRING,
  IS_RECURRING_LABEL,
  EXT_REF,
  EXT_REF_LABEL,
} = productManagerConstants;

const table = [
  {
    label: NAME_LABEL,
    sortBy: NAME,
    render: ({ product }) => <EditProduct {...{ product }} />,
  },
  {
    label: PRODUCT_CATEGORY_LABEL,
    sortBy: PRODUCT_CATEGORY,
    render: ({ product }) => (
      <ProductCategory subCategoryId={product[PRODUCT_SUB_CATEGORY]} />
    ),
  },
  {
    label: PRODUCT_SUB_CATEGORY_LABEL,
    sortBy: PRODUCT_SUB_CATEGORY,
    render: ({ product }) => (
      <ProductSubCategory subCategoryId={product[PRODUCT_SUB_CATEGORY]} />
    ),
  },
  {
    label: ORDER_LABEL,
    sortBy: ORDER,
    render: ({ product }) => product[ORDER],
  },
  {
    label: IS_RECURRING_LABEL,
    render: ({ product }) => (product[IS_RECURRING] ? 'Yes' : 'No'),
  },
  {
    label: EXT_REF_LABEL,
    sortBy: EXT_REF,
    render: ({ product }) => product[EXT_REF] || 'Empty',
  },
  ...pricingConstants.PRICES.map(({ id, label }) => ({
    sortBy: id,
    label,
    render: ({ product }) => <Price field={id} product={product} />,
  })),
];

export default table;
