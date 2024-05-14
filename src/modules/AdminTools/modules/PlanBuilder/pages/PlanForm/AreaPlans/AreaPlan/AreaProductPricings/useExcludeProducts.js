import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { useAreaPlan } from '../AreaContext';

const useExcludeProducts = ({ exceptServices, exceptAddonIndex }) => {
  const [productIds, setProductIds] = useState([]);

  const areaPlan = useAreaPlan();

  const addonName = `${areaPlan}.addons`;

  const servicesName = `${areaPlan}.service_product_ids`;

  const addons = useWatch({ name: addonName });

  const services = useWatch({ name: servicesName });

  useEffect(() => {
    let newProductIds = addons
      ?.filter((_i, index) => {
        if (exceptAddonIndex === undefined) {
          return true;
        }

        return index !== exceptAddonIndex;
      })
      .map(({ product_id }) => +product_id);

    if (!exceptServices) {
      newProductIds = newProductIds.concat(services);
    }

    if (JSON.stringify(productIds) !== JSON.stringify(newProductIds)) {
      setProductIds(newProductIds);
    }
  }, [addons, exceptAddonIndex, exceptServices, productIds, services]);

  return productIds;
};

export default useExcludeProducts;
