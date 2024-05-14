import * as promotions from './promotions';
import * as campaigns from './campaigns';
import * as promotionUsages from './promotion-usages';
import * as referralUsages from './referral-usages';

const combinedApis = {
  ...promotions,
  ...campaigns,
  ...promotionUsages,
  ...referralUsages,
};

export default combinedApis;
