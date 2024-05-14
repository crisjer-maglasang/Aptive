import { campaignOptionsSelector } from '@/modules/AdminTools/redux/promoCode/campaigns';
import Select from '@/modules/AdminTools/components/Form/Select';

const Campaign = (props) => (
  <Select
    name="campaign_id"
    label="Campaign"
    selector={campaignOptionsSelector}
    error="promotionsUpdate"
    {...props}
  />
);

export default Campaign;
