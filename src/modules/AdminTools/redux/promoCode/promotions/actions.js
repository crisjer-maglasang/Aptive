import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const promotionNameSpace = `${nameSpace}/promotion`;

export const requestPromotionsAsync = createAsyncAction(
  `${promotionNameSpace}/REQUEST_PROMOTIONS`
);

export const requestPromotionTypesAsync = createAsyncAction(
  `${promotionNameSpace}/REQUEST_PROMOTION_TYPES`
);

export const disablePromotionAsync = createAsyncAction(
  `${promotionNameSpace}/DISABLE_PROMOTION`
);

export const removePromotionAsync = createAsyncAction(
  `${promotionNameSpace}/REMOVE_PROMOTION`
);

export const updatePromotionAsync = createAsyncAction(
  `${promotionNameSpace}/UPDATE_PROMOTION`
);

export const createPromotionAsync = createAsyncAction(
  `${promotionNameSpace}/CREATE_PROMOTION`
);
