import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const areaPlansNameSpace = `${nameSpace}/areaPlans`;

export const requestAreaPlansAsync = createAsyncAction(
  `${areaPlansNameSpace}/REQUEST_AREA_PLANS`
);

export const requestBillingFrequenciesAsync = createAsyncAction(
  `${areaPlansNameSpace}/REQUEST_BILLING_FREQUENCIES`
);
