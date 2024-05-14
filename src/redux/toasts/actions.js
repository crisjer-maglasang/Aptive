import { createAction } from '@/redux/root';

export const nameSpace = '@@/toasts';

export const addToastsAction = createAction(`${nameSpace}/ADD_TOASTS`);

export const flushToastsAction = createAction(`${nameSpace}/FLUSH_TOASTS`);
