import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const planCanSellTotalsThresholdNameSpace = `${nameSpace}/plan-can-sell-totals-threshold`;

export const updatePlanCanSellTotalsThresholdAsync = createAsyncAction(
  `${planCanSellTotalsThresholdNameSpace}/UPDATE_CAN_SELL_TOTAL_THRESHOLD`
);

export const createPlanCanSellTotalsThresholdAsync = createAsyncAction(
  `${planCanSellTotalsThresholdNameSpace}/CREATE_CAN_SELL_TOTAL_THRESHOLD`
);

export const removePlanCanSellTotalsThresholdAsync = createAsyncAction(
  `${planCanSellTotalsThresholdNameSpace}/REMOVE_CAN_SELL_TOTAL_THRESHOLD`
);

export const requestPlanCanSellTotalsThresholdAsync = createAsyncAction(
  `${planCanSellTotalsThresholdNameSpace}/REQUEST_CAN_SELL_TOTAL_THRESHOLD`
);
