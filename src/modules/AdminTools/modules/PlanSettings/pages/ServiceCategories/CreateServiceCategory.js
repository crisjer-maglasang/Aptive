import ServiceCategoryForm from './ServiceCategoryForm';
import { CustomButton } from '@/components';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { createProductCategoryAsync } from '@/modules/AdminTools/redux/productManager/product-categories';

const defaultValues = {
  [productManagerConstants.NAME]: '',
  [productManagerConstants.ORDER]: 0,
  [productManagerConstants.PRODUCT_SUB_CATEGORIES]: [],
};

const CreateProduct = () => {
  return (
    <ServiceCategoryForm
      defaultValues={defaultValues}
      request={createProductCategoryAsync.request}
    >
      <CustomButton color={'green'}>Create Service Category</CustomButton>
    </ServiceCategoryForm>
  );
};

export default CreateProduct;
