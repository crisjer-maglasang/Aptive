import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';
import SettingSelect from './SettingSelect';

const { PLAN_CATEGORIES, PLAN_CATEGORIES_LABEL } = planBuilderConstants;

const PlanCategories = () => (
  <SettingSelect
    name={PLAN_CATEGORIES}
    label={PLAN_CATEGORIES_LABEL}
    optionName={'plan_categories'}
    isMulti={true}
    required
  />
);

export default PlanCategories;
