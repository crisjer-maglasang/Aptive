import { createSelector } from 'reselect';

import Select from '@/modules/AdminTools/components/Form/Select';
import { promotionTypesSelector } from '@/modules/AdminTools/redux/promoCode/promotions';

const toOptions = (arr) =>
  arr.map((promotionType) => ({
    label: promotionType,
    value: promotionType,
  }));

const promotionTypesOptionsSelector = createSelector(
  promotionTypesSelector,
  (state) => toOptions(state)
);

const PromotionTypeSelect = () => {
  return (
    <Select
      label="Promotion Type"
      name="promotion_type"
      selector={promotionTypesOptionsSelector}
      error="promotionsUpdate"
      required
    />
  );
};

export default PromotionTypeSelect;
