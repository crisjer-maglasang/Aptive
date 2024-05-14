import { createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/areas-new';

export const requestAreaAsync = createAsyncAction(`${nameSpace}/REQUEST_AREA`);

export const requestAreasAsync = createAsyncAction(`${nameSpace}/REQUEST_AREAS`);

export const requestAreaMapAsync = createAsyncAction(`${nameSpace}/REQUEST_AREA_MAP`);

export const requestAreasListAsync = createAsyncAction(`${nameSpace}/REQUEST_AREAS_LIST`);
