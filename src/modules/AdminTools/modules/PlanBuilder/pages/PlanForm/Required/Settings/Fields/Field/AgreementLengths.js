import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';
import SettingSelect from './SettingSelect';

const { AGREEMENT_LENGTH, AGREEMENT_LENGTH_LABEL } = planBuilderConstants;

const AgreementLengths = () => (
  <SettingSelect
    name={AGREEMENT_LENGTH}
    label={AGREEMENT_LENGTH_LABEL}
    optionName={'agreement_lengths'}
    isMulti
    required
  />
);

export default AgreementLengths;
