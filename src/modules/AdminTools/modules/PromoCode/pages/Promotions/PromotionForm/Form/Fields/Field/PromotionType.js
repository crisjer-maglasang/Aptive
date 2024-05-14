import { createSelector } from 'reselect';

import Select from '@/modules/AdminTools/components/Form/Select';
import { promotionTypesSelector } from '@/modules/AdminTools/redux/promoCode/promotions';

const toOptions = (arr) =>
  arr.map((promotionType) => ({
    label: promotionType,
    value: promotionType,
  }));

const promotionTypeOptionsSelector = createSelector(
  promotionTypesSelector,
  (state) => toOptions(state)
);

const PromotionType = (props) => (
  <Select
    label="Promotion Type"
    name="promotion_type"
    selector={promotionTypeOptionsSelector}
    error="promotionsUpdate"
    {...props}
  />
);

export default PromotionType;
