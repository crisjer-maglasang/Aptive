import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const promotionUsageNameSpace = `${nameSpace}/promotionUsage`;

export const filterPromotionUsagesAsync = createAsyncAction(
  `${promotionUsageNameSpace}/FILTER_PROMOTION_USAGES`
);

export const createPromotionUsageAsync = createAsyncAction(
  `${promotionUsageNameSpace}/CREATE_PROMOTION_USAGE`
);
