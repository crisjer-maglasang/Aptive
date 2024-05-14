import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const bedManagementNameSpace = `${nameSpace}/bedManagement`;

export const requestUnBeddedSummariesAsync = createAsyncAction(
  `${nameSpace}/GET_UNBEDDED_SUMMARIES`
);

export const requestBedManagementAsync = createAsyncAction(
  `${nameSpace}/GET_BED_MANAGEMENT`
);

export const unassignRepAsync = createAsyncAction(`${nameSpace}/UNASSIGN_REP`);

export const assignRepAsync = createAsyncAction(`${nameSpace}/ASSIGN_REP`);
