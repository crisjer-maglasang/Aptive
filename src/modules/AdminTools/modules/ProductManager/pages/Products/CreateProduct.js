import ProductForm from './ProductForm';
import { CustomButton } from '@/components';
import {
  pricingConstants,
  productManagerConstants,
} from '@/modules/AdminTools/lib/constants';
import { createProductAsync } from '@/modules/AdminTools/redux/productManager/products';

const defaultValues = {
  [productManagerConstants.NAME]: '',
  [productManagerConstants.ORDER]: 0,
  [productManagerConstants.EXT_REF]: '',
  [productManagerConstants.IMAGE]: '',
  [productManagerConstants.PRODUCT_SUB_CATEGORY]: '',
  [productManagerConstants.PRODUCT_CATEGORY]: '',
  [productManagerConstants.RECURRING]: 'true',
  [productManagerConstants.NEEDS_CUSTOMER_SUPPORT]: 'false',
  [pricingConstants.INITIAL_MIN]: 0,
  [pricingConstants.INITIAL_MAX]: 0,
  [pricingConstants.RECURRING_MIN]: 0,
  [pricingConstants.RECURRING_MAX]: 0,
  [pricingConstants.DESCRIPTION]: '',
};

const CreateProduct = () => {
  return (
    <ProductForm
      defaultValues={defaultValues}
      request={createProductAsync.request}
    >
      <CustomButton color={'green'}>Create Service</CustomButton>
    </ProductForm>
  );
};

export default CreateProduct;
