import Select from '@/modules/AdminTools/components/Form/Select';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { createSelector } from 'reselect';

const toOptions = (settings) => {
  if (!settings) {
    return [];
  }

  return settings.options.plan_categories;
};

const categoriesSelector = createSelector(settingsSelector, (state) =>
  toOptions(state)
);

const PlanCategories = () => (
  <Select
    name="plan_data.plan_category_ids"
    label="Plan Categories"
    selector={categoriesSelector}
    error="updatePlan"
    isMulti
    required
  />
);

export default PlanCategories;
