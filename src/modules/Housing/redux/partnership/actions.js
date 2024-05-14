import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const partnershipNameSpace = `${nameSpace}/apartment`;

export const requestDealersAsync = createAsyncAction(`${nameSpace}/GET_DEALERS`);

export const requestPartnershipsAsync = createAsyncAction(`${nameSpace}/GET_PARTNERSHIPS`);
