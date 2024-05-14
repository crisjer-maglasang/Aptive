import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';

import { Select } from '@/components/common';
import { useAreaPlan } from '../../../AreaContext';
import useExcludeProducts from '../../useExcludeProducts';
import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';
import { pricingConstants } from '@/modules/AdminTools/lib/constants';

const FIELDS = ['is_recurring', ...pricingConstants.PRICE_IDS];

const ProductSelect = ({ index }) => {
  const { setValue } = useFormContext();
  const products = useSelector(productsSelector);

  const areaPlan = useAreaPlan();

  const fieldName = (field) => `${areaPlan}.addons[${index}].${field}`;

  const selectName = fieldName('product_id');

  const excludeIds = useExcludeProducts({ exceptAddonIndex: index });

  if (!products) {
    return null;
  }

  const options = products.options.filter(
    ({ value }) => !excludeIds.includes(value)
  );

  const onChange = ({ target: { value } }) => {
    const productId = value;

    const product = products.get(productId);

    if (product) {
      FIELDS.forEach((field) => setValue(fieldName(field), product[field]));
      setValue(selectName, productId);
    }
  };

  return (
    <div className="w-40">
      <Controller
        name={selectName}
        render={({ field: { value, name } }) => (
          <Select
            {...{
              options,
              name,
              onChange,
              value,
            }}
          />
        )}
      />
    </div>
  );
};

ProductSelect.propTypes = {
  index: PropTypes.number,
};

export default ProductSelect;
