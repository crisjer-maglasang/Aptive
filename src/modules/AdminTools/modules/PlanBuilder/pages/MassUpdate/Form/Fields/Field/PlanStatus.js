import Select from '@/modules/AdminTools/components/Form/Select';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { createSelector } from 'reselect';

const toOptions = (settings) => {
  if (!settings) {
    return [];
  }

  return settings.options.plan_statuses;
};

const statusSelector = createSelector(settingsSelector, (state) =>
  toOptions(state)
);

const PlanStatus = () => (
  <Select
    name="plan_data.plan_status_id"
    label="Plan Status"
    selector={statusSelector}
    error="updatePlan"
    required
  />
);

export default PlanStatus;
