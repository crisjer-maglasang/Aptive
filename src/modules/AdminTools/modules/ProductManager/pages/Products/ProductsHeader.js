import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import CreateProduct from './CreateProduct';
import Header from '@/modules/AdminTools/components/Header';

const ProductsHeader = () => (
  <Header title={productManagerConstants.SERVICES}>
    <CreateProduct />
  </Header>
);

export default ProductsHeader;
