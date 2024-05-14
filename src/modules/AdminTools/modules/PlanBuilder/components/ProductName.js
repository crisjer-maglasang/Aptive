import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';

const { NAME } = productManagerConstants;

const ProductName = ({ productId }) => {
  const products = useSelector(productsSelector);

  const product = products?.get(productId);
  const name = product?.[NAME];

  return <>{name || 'Empty'}</>;
};

ProductName.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductName;
