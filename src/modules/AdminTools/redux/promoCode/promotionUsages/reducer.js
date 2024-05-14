import { createReducer } from '@/redux/root';
import { promotionUsageNameSpace, filterPromotionUsagesAsync } from './';
import { NAME } from './selectors';

const FilterPromotionUsages = ({ current_page, data, per_page, total }) => {
  return {
    currentPage: current_page,
    perPage: per_page,
    total,
    data,
  };
};

const promotionUsagesInitialState = {
  promotionUsages: FilterPromotionUsages({
    current_page: 1,
    data: [],
    per_page: 10,
    total: 0,
  }),
};

export const promotionUsagesReducer = {
  [NAME]: createReducer(promotionUsageNameSpace, promotionUsagesInitialState, {
    [filterPromotionUsagesAsync.success]: ({ state, action: { payload } }) => {
      state.promotionUsages = FilterPromotionUsages(payload);
    },
  }),
};
