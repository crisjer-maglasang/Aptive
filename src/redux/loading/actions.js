import { createAction } from '@/redux/root';

export const nameSpace = '@@/loading';

export const setLoadingAction = createAction(`${nameSpace}/SET_LOADING`);
export const unsetLoadingAction = createAction(`${nameSpace}/UNSET_LOADING`);
