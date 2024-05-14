import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const planNameSpace = `${nameSpace}/plans`;

export const requestPlansAsync = createAsyncAction(
  `${planNameSpace}/REQUEST_PLANS`
);

export const updatePlanAsync = createAsyncAction(
  `${planNameSpace}/UPDATE_PLAN`
);

export const massUpdateAsync = createAsyncAction(
  `${planNameSpace}/MASS_UPDATE`
);

export const createPlanAsync = createAsyncAction(
  `${planNameSpace}/CREATE_PLAN`
);

export const requestPlanAsync = createAsyncAction(
  `${planNameSpace}/REQUEST_PLAN`
);

export const removePlanAsync = createAsyncAction(
  `${planNameSpace}/REMOVE_PLAN`
);
