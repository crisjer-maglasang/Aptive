import { useSelector } from 'react-redux';

import { productSubCategorySelector } from '@/modules/AdminTools/redux/productManager/products-sub-categories';

const ProductSubCategory = ({ subCategoryId }) => {
  const subCategories = useSelector(productSubCategorySelector);

  const subCategory = subCategories?.get(subCategoryId);

  return subCategory?.name || '';
};

export default ProductSubCategory;
