import { createAction } from '@/redux/root';

export const nameSpace = '@@/errors';

export const addErrorAction = createAction(`${nameSpace}/ADD_ERROR`);

export const removeAllErrorsAction = createAction(`${nameSpace}/REMOVE_ALL_ERRORS`);
