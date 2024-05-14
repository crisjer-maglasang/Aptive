import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormContext, useWatch } from 'react-hook-form';

import AddButton from '@/modules/AdminTools/components/AddButton';
import { useAreaPlan } from '../../AreaContext';
import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';
import { useEffect } from 'react';

const AddService = ({ append }) => {
  const products = useSelector(productsSelector);

  const areaPlan = useAreaPlan();
  const addons = useWatch({ name: `${areaPlan}.addons` });
  const services = useWatch({ name: `${areaPlan}.service_product_ids` }) ?? [];
  const { setValue } = useFormContext();

  useEffect(() => {
    if (addons === undefined) {
      setValue(`${areaPlan}.addons`, []);
    }
  }, [areaPlan, addons, setValue]);

  const length = addons?.length + services?.length;

  if (!products) {
    return null;
  }

  return (
    <AddButton onClick={append} shouldShow={products.products.length > length}>
      Add additional service
    </AddButton>
  );
};

AddService.propTypes = {
  append: PropTypes.func.isRequired,
};

export default AddService;
