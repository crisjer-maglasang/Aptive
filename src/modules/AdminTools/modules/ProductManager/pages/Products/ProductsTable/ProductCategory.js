import { useSelector } from 'react-redux';

import { productCategorySelector } from '@/modules/AdminTools/redux/productManager/product-categories';
import { productSubCategorySelector } from '@/modules/AdminTools/redux/productManager/products-sub-categories';

const ProductCategory = ({ subCategoryId }) => {
  const subCategories = useSelector(productSubCategorySelector);

  const subCategory = subCategories?.get(subCategoryId);

  const categories = useSelector(productCategorySelector);

  const category = categories?.get(subCategory?.product_category_id);

  return category?.name || '';
};

export default ProductCategory;
