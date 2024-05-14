import { createReducer } from '@/redux/root';
import { referralUsageNameSpace, filterReferralUsagesAsync } from './';
import { NAME } from './selectors';

const FilterReferralUsages = ({ current_page, data, per_page, total }) => {
  return {
    currentPage: current_page,
    perPage: per_page,
    total,
    data,
  };
};

const referralUsagesInitialState = {
  referralUsages: FilterReferralUsages({
    current_page: 1,
    data: [],
    per_page: 10,
    total: 0,
  }),
};

export const referralUsagesReducer = {
  [NAME]: createReducer(referralUsageNameSpace, referralUsagesInitialState, {
    [filterReferralUsagesAsync.success]: ({ state, action: { payload } }) => {
      state.referralUsages = FilterReferralUsages(payload);
    },
  }),
};
