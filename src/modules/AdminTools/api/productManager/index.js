import * as products from './products';
import * as productCategories from './product-categories';
import * as productSubCategories from './product-sub-categories';

const combinedApis = {
  ...products,
  ...productCategories,
  ...productSubCategories,
};

export default combinedApis;
