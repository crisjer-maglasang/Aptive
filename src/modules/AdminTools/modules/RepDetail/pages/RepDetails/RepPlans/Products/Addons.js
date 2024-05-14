import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import ProductName from '@/modules/AdminTools/modules/PlanBuilder/components/ProductName';
import { formatCurrency } from '@/lib/utils';
import Labeled from '@/modules/AdminTools/components/Labeled';
import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';
import SortingDataTable from '@/modules/AdminTools/components/DataTable/SortingDataTable';
import {
  pricingConstants,
  productManagerConstants,
} from '@/modules/AdminTools/lib/constants';

const { NAME } = productManagerConstants;

const { PRICES } = pricingConstants;

const Price = ({ price }) => {
  if (price === null || price === undefined) {
    return null;
  }

  return formatCurrency(price);
};

const table = [
  {
    label: 'name',
    sortBy: 'name',
    render: ({ product_id }) => <ProductName productId={product_id} />,
  },
  ...PRICES.map((price) => ({
    label: price.label,
    sortBy: price.id,
    render: (plan) => <Price price={plan[price.id]} />,
  })),
];

const sortOrders = [NAME, PRICES.map(({ id }) => id)];

const Addons = ({ addons }) => {
  const products = useSelector(productsSelector);

  const getName = useCallback(
    (productId) => {
      const product = products?.get(productId);

      return product?.[NAME];
    },
    [products]
  );

  const indexMap = useMemo(() => {
    const map = new Map();

    addons.forEach(({ id }, index) => {
      map.set(id, index);
    });

    return map;
  }, [addons]);

  const rowMap = useCallback(
    (datum) => ({
      ...datum,
      index: indexMap.get(datum.id),
    }),
    [indexMap]
  );

  const getSortField = useCallback(
    (sortingBy) => {
      if (sortingBy === NAME) {
        return ({ product_id }) => getName(product_id);
      }

      return (addon) => addon[sortingBy];
    },
    [getName]
  );

  return (
    <Labeled label="Addons">
      <SortingDataTable
        data={addons}
        {...{
          rowMap,
          table,
          sortOrders,
          getSortField,
        }}
      />
    </Labeled>
  );
};

Addons.propTypes = {
  addons: PropTypes.array,
};

export default Addons;
