import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const apiClientNameSpace = `${nameSpace}/api-clients`;

export const updatePlanBuilderApiClientAsync = createAsyncAction(
  `${apiClientNameSpace}/UPDATE_API_CLIENT`
);

export const createPlanBuilderApiClientAsync = createAsyncAction(
  `${apiClientNameSpace}/CREATE_API_CLIENT`
);

export const removePlanBuilderApiClientAsync = createAsyncAction(
  `${apiClientNameSpace}/REMOVE_API_CLIENT`
);

export const requestPlanBuilderApiClientsAsync = createAsyncAction(
  `${apiClientNameSpace}/REQUEST_API_CLIENT`
);

export const clearPlanBuilderApiTokens = createAsyncAction(
  `${apiClientNameSpace}/CLEAR_API_CLIENT_TOKEN`
);
