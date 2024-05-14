import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormContext, useWatch } from 'react-hook-form';

import AddButton from '@/modules/AdminTools/components/AddButton';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { useAreaPlan } from '../AreaContext';
import { useEffect } from 'react';

const AddPricing = ({ append }) => {
  const { plan_pricing_levels } = useSelector(settingsSelector);
  const areaPlan = useAreaPlan();
  const name = `${areaPlan}.area_plan_pricings`;

  const pricings = useWatch({ name });
  const { setValue } = useFormContext();

  useEffect(() => {
    if (pricings === undefined) {
      setValue(name, []);
    }
  }, [name, pricings, setValue]);

  return (
    <AddButton
      onClick={append}
      shouldShow={plan_pricing_levels.length > pricings?.length}
    >
      Add new level
    </AddButton>
  );
};

AddPricing.propTypes = {
  append: PropTypes.func.isRequired,
};

export default AddPricing;
