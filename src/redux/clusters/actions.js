import { createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/clusters';

export const requestClusterStatsAsync = createAsyncAction(`${nameSpace}/REQUEST_CLUSTER_STATISTICS`);