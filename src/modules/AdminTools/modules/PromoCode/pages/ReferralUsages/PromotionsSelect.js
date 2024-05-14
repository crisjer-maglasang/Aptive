import Select from '@/modules/AdminTools/components/Form/Select';
import { promotionReferralOptionsSelector } from '@/modules/AdminTools/redux/promoCode/promotions';

const PromotionsSelect = (props) => (
  <Select
    name="promotion_id"
    label="Promotion"
    selector={promotionReferralOptionsSelector}
    error="promotionUsagesUpdate"
    required
    {...props}
  />
);

export default PromotionsSelect;
