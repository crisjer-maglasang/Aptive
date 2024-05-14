import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import SettingSelect from './SettingSelect';

const { PLAN_SERVICE_FREQUENCY, PLAN_SERVICE_FREQUENCY_LABEL } =
  planBuilderConstants;

const PlanServiceFrequency = () => (
  <SettingSelect
    name={PLAN_SERVICE_FREQUENCY}
    label={PLAN_SERVICE_FREQUENCY_LABEL}
    optionName={'plan_service_frequencies'}
    required
  />
);

export default PlanServiceFrequency;
