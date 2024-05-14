import { createSelector } from 'reselect';

import Select from '@/modules/AdminTools/components/Form/Select';
import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';

const toOptions = (arr) =>
  arr.map(({ name, id }) => ({
    label: `${id} - ${name}`,
    value: id,
  }));

const productOptionsSelector = createSelector(productsSelector, (state) =>
  toOptions(state.products)
);

const Addons = (props) => (
  <Select
    isMulti
    label="Addons"
    name="product_ids"
    selector={productOptionsSelector}
    error="promotionsUpdate"
    {...props}
  />
);

export default Addons;
