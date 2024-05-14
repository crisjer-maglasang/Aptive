import Select from '@/modules/AdminTools/components/Form/Select';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { createSelector } from 'reselect';

const toOptions = (settings) => {
  if (!settings) {
    return [];
  }

  return settings.options.plan_pricing_levels;
};

const pricingLevelOptionsSelector = createSelector(settingsSelector, (state) =>
  toOptions(state)
);

const RemovePricingLevels = () => (
  <Select
    name="area_data.remove_area_plan_pricings"
    label="REMOVE Pricing Levels"
    selector={pricingLevelOptionsSelector}
    error="updatePlan"
    isMulti
    required
  />
);

export default RemovePricingLevels;
