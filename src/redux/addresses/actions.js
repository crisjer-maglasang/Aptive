import { createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/addresses';

export const getAddressesAsync = createAsyncAction(`${nameSpace}/GET_ADDRESSES`);
