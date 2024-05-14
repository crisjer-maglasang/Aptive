import { createAsyncAction } from '@/redux/root';

const nameSpace = '@@/archived';

export const archivedLeadsNameSpace = `${nameSpace}/leads`;

export const requestArchivedLeadsAsync = createAsyncAction(`${nameSpace}/GET_ARCHIVED_LEADS`);

export const restoreLeadAsync = createAsyncAction(`${nameSpace}/RESTORE_LEAD_EMAIL`);
