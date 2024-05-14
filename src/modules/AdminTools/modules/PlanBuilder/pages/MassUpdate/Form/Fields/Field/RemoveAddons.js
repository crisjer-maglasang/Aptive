import Select from '@/modules/AdminTools/components/Form/Select';
import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';
import { createSelector } from 'reselect';

const productOptionsSelector = createSelector(
  productsSelector,
  (products) => products.options
);

const RemoveAddons = () => (
  <Select
    name="area_data.remove_addons"
    label="REMOVE Additional Services"
    selector={productOptionsSelector}
    error="updatePlan"
    isMulti
    required
  />
);

export default RemoveAddons;
