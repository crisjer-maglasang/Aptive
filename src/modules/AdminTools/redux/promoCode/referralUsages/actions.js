import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const referralUsageNameSpace = `${nameSpace}/referralUsage`;

export const filterReferralUsagesAsync = createAsyncAction(
  `${referralUsageNameSpace}/FILTER_REFERRAL_USAGES`
);

export const createReferralUsageAsync = createAsyncAction(
  `${referralUsageNameSpace}/CREATE_REFERRAL_USAGE`
);
