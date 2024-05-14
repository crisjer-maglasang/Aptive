import Select from '@/modules/AdminTools/components/Form/Select';
import { promotionNonReferralOptionsSelector } from '@/modules/AdminTools/redux/promoCode/promotions';

const PromotionsSelect = (props) => (
  <Select
    name="promotion_id"
    label="Promotion"
    selector={promotionNonReferralOptionsSelector}
    error="promotionUsagesUpdate"
    required
    {...props}
  />
);

export default PromotionsSelect;
