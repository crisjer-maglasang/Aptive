import { createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/seasons-new';

export const requestSalesSeasonAsync = createAsyncAction(`${nameSpace}/GET_SALES_SEASON`);
