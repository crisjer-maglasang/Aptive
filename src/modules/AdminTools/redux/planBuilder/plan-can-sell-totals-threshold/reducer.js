import { createReducer } from '@/redux/root';
import {
  planCanSellTotalsThresholdNameSpace,
  updatePlanCanSellTotalsThresholdAsync,
  createPlanCanSellTotalsThresholdAsync,
  removePlanCanSellTotalsThresholdAsync,
  requestPlanCanSellTotalsThresholdAsync,
} from './actions';
import { NAME } from './selectors';

export const planCanSellTotalsThresholdReducer = {
  [NAME]: createReducer(
    planCanSellTotalsThresholdNameSpace,
    {},
    {
      [updatePlanCanSellTotalsThresholdAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state[NAME] = payload;
      },
      [createPlanCanSellTotalsThresholdAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state[NAME] = payload;
      },
      [removePlanCanSellTotalsThresholdAsync.success]: ({ state }) => {
        state[NAME] = {};
      },
      [requestPlanCanSellTotalsThresholdAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state[NAME] = payload;
      },
    }
  ),
};
