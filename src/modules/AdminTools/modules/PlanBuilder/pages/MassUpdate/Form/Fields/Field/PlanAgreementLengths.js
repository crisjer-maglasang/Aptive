import Select from '@/modules/AdminTools/components/Form/Select';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { createSelector } from 'reselect';

const toOptions = (settings) => {
  if (!settings) {
    return [];
  }

  return settings.options.agreement_lengths;
};

const agreementLengthsSelector = createSelector(settingsSelector, (state) =>
  toOptions(state)
);

const PlanAgreementLengths = () => (
  <Select
    name="plan_data.agreement_length_ids"
    label="Length of service"
    selector={agreementLengthsSelector}
    error="updatePlan"
    isMulti
    required
  />
);

export default PlanAgreementLengths;
