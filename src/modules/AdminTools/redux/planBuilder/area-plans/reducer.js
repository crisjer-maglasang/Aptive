import { createReducer } from '@/redux/root';
import {
  areaPlansNameSpace,
  requestAreaPlansAsync,
  requestBillingFrequenciesAsync,
} from './actions';
import { NAME } from './selectors';

export const areaPlansReducer = {
  [NAME]: createReducer(
    areaPlansNameSpace,
    {
      areaPlans: new Map(),
      areaPlansArray: [],
      billingFrequencies: [],
    },
    {
      [requestAreaPlansAsync.success]: ({ state, action: { payload } }) => {
        const areaPlans = new Map();

        if (Array.isArray(payload)) {
          payload.forEach((areaPlan) => areaPlans.set(areaPlan.id, areaPlan));
          state.areaPlansArray = payload;
        }

        state.areaPlans = areaPlans;
      },
      [requestBillingFrequenciesAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state.billingFrequencies = payload;
      },
    }
  ),
};
