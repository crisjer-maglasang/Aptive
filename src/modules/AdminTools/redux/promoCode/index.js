import { promotionsReducer, promotionsWatcher } from './promotions';
import { campaignsReducer, campaignsWatcher } from './campaigns';
import { promotionUsagesReducer, promotionUsagesWatcher } from './promotionUsages';
import { referralUsagesReducer, referralUsagesWatcher } from './referralUsages';

export const promoCodeReducers = {
  ...promotionsReducer,
  ...campaignsReducer,
  ...promotionUsagesReducer,
  ...referralUsagesReducer,
};

export const promoCodeSagas = [
  promotionsWatcher(),
  campaignsWatcher(),
  promotionUsagesWatcher(),
  referralUsagesWatcher(),
];
