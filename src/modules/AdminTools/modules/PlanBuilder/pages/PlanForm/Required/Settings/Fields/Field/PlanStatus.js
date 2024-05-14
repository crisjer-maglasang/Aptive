import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import SettingSelect from './SettingSelect';

const { PLAN_STATUS, PLAN_STATUS_LABEL } = planBuilderConstants;

const PlanStatus = () => (
  <SettingSelect
    name={PLAN_STATUS}
    optionName={'plan_statuses'}
    label={PLAN_STATUS_LABEL}
    required
  />
);

export default PlanStatus;
