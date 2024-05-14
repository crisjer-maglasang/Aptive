import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const bedsHistoryNameSpace = `${nameSpace}/bedsHistory`;

export const requestBedsHistoryAsync = createAsyncAction(`${nameSpace}/GET_BEDS_HISTORY`);

export const exportBedsHistoriesAsync = createAsyncAction(`${nameSpace}/EXPORT_BEDS_HISTORIES`);
