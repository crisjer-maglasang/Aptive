import { createSelector } from 'reselect';

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

const BillingFrequencies = () => (
  <Select
    name="area_data.billing_frequencies"
    label="Billing Frequency"
    error="updatePlan"
    selector={billingFrequencyOptionSelector}
    isMulti
    required
  />
);

export default BillingFrequencies;
