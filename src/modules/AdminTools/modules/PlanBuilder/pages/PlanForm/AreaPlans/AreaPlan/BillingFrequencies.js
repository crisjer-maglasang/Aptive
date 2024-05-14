import { createSelector } from 'reselect';

import { useAreaPlan } from './AreaContext';
import Select from '@/modules/AdminTools/components/Form/Select';
import { billingFrequenciesSelector } from '@/modules/AdminTools/redux/planBuilder/area-plans';

const toOptions = (arr) =>
  arr.map((billingFrequency) => ({
    label: billingFrequency,
    value: billingFrequency,
  }));

const billingFrequencyOptionSelector = createSelector(
  billingFrequenciesSelector,
  (state) => toOptions(state)
);

const BillingFrequencies = () => {
  const areaPlan = useAreaPlan();
  const name = `${areaPlan}.billing_frequencies`;

  return (
    <div className="mt-4 flex-grow">
      <Select
        isMulti
        required
        name={name}
        label="Billing Frequency"
        error="updatePlan"
        selector={billingFrequencyOptionSelector}
      />
    </div>
  );
};

export default BillingFrequencies;
