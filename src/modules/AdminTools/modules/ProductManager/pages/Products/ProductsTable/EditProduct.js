import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ProductForm from '../ProductForm';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { productSubCategorySelector } from '@/modules/AdminTools/redux/productManager/products-sub-categories';
import { updateProductAsync } from '@/modules/AdminTools/redux/productManager/products';

const { NAME, PRODUCT_SUB_CATEGORY, PRODUCT_CATEGORY } =
  productManagerConstants;

const EditProduct = ({ product }) => {
  const subCategories = useSelector(productSubCategorySelector);

  if (!subCategories) {
    return null;
  }

  const categoryId = subCategories.get(
    product[PRODUCT_SUB_CATEGORY]
  )?.product_category_id;

  return (
    <ProductForm
      defaultValues={{ ...product, [PRODUCT_CATEGORY]: categoryId }}
      request={updateProductAsync.request}
    >
      <div className="text-primary-300 cursor-pointer">{product[NAME]}</div>
    </ProductForm>
  );
};

EditProduct.propTypes = {
  product: PropTypes.any.isRequired,
};

export default EditProduct;
