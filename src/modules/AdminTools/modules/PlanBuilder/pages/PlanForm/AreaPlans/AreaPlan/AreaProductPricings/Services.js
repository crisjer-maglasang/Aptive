import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';

import { Select } from '@/components/common';
import Labeled from '@/modules/AdminTools/components/Labeled';
import { useAreaPlan } from '../AreaContext';
import useExcludeProducts from './useExcludeProducts';
import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';

const Services = ({ ServicesHeader }) => {
  const products = useSelector(productsSelector);

  const areaPlan = useAreaPlan();
  const servicesName = `${areaPlan}.service_product_ids`;

  const excludeIds = useExcludeProducts({ exceptServices: true });

  if (!products) {
    return null;
  }

  const options = products.products
    .filter(({ id }) => !excludeIds?.includes(id))
    .map(({ name, id }) => ({
      label: name,
      value: id,
    }));

  return (
    <Labeled label={<ServicesHeader />}>
      <Controller
        name={servicesName}
        render={({ field: { onChange, value, name } }) => (
          <Select
            {...{
              options,
              name,
              onChange,
              value,
            }}
            isMulti={true}
            closeMenuOnSelect={false}
          />
        )}
      />
    </Labeled>
  );
};

Services.propTypes = {
  ServicesHeader: PropTypes.elementType.isRequired,
};

export default Services;
