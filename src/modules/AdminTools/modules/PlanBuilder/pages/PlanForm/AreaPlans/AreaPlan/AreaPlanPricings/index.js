import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';

import Labeled from '@/modules/AdminTools/components/Labeled';
import { useAreaPlan } from '../AreaContext';
import AddPricing from './AddPricing';
import AreaPlanPricingsTable from './AreaPlanPricingsTable';

const AreaPlanPricings = ({ LevelsHeader, required }) => {
  const areaPlan = useAreaPlan();
  const name = `${areaPlan}.area_plan_pricings`;

  const pricings = useFieldArray({ name });

  const append = () => {
    const pricing = {
      plan_pricing_level_id: '',
    };

    pricings.append(pricing);
  };

  const removeConfirm = (index) => {
    if (window.confirm('Are you sure?')) {
      pricings.remove(index);
    }
  };

  return (
    <Labeled label={<LevelsHeader />}>
      <AreaPlanPricingsTable
        pricings={pricings.fields}
        remove={removeConfirm}
        required={required}
      />
      <AddPricing {...{ append }} />
    </Labeled>
  );
};

AreaPlanPricings.propTypes = {
  LevelsHeader: PropTypes.elementType.isRequired,
  required: PropTypes.bool,
};

AreaPlanPricings.defaultProps = {
  required: true,
};

export default AreaPlanPricings;
