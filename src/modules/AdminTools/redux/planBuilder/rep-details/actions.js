import { createAction, createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const repDetailsNameSpace = `${nameSpace}/rep_details`;

export const requestRepDetailsAsync = createAsyncAction(
  `${repDetailsNameSpace}/REQUEST_REP_DETAILS`
);

export const requestRepPlansAsync = createAsyncAction(
  `${repDetailsNameSpace}/REQUEST_REP_PLANS`
);

export const clearRepPlans = createAction(
  `${repDetailsNameSpace}/CLEAR_REP_PLANS`
);
