import Select from '@/modules/AdminTools/components/Form/Select';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { createSelector } from 'reselect';

const toOptions = (settings) => {
  if (!settings) {
    return [];
  }

  return settings.options.plan_service_frequencies;
};

const serviceFrequencySelector = createSelector(settingsSelector, (state) =>
  toOptions(state)
);

const PlanServiceFrequency = () => (
  <Select
    name="plan_data.plan_service_frequency_id"
    label="Annual services"
    selector={serviceFrequencySelector}
    error="updatePlan"
    required
  />
);

export default PlanServiceFrequency;
