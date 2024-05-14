import { useSelector } from 'react-redux';

import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';
import ProductsHeader from './ProductsHeader';
import ProductsTable from './ProductsTable';

const Products = () => {
  const products = useSelector(productsSelector)?.products || [];
  const isLoadingProducts = useSelector(
    (state) => state?.loading?.products?.isLoading || false
  );

  const showForm = isLoadingProducts || products.length > 0;

  return (
    <div>
      <ProductsHeader />
      {showForm ? <ProductsTable /> : <div>No Products</div>}
    </div>
  );
};

export default Products;
