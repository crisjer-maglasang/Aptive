import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/approval';

export const requestRepsForApprovalAsync = createAsyncAction(`${nameSpace}/REQUEST_REPS_FOR_APPROVAL`);

export const requestRegionalsAsync = createAsyncAction(`${nameSpace}/REQUEST_REGIONALS`);

export const requestApprovalDocumentsAsync = createAsyncAction(`${nameSpace}/REQUEST_APPROVAL_DOCUMENTS`);

export const updateApprovalDocumentsAsync = createAsyncAction(`${nameSpace}/UPDATE_APPROVAL_DOCUMENTS`);

export const getRepToApprove = createAction(`${nameSpace}/GET_REP_TO_APPROVE`);

export const setIsApproved = createAction(`${nameSpace}/SET_IS_APPROVED`);
