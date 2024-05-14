import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/auth-new';

export const authenticateWithTokenActionAsync = createAsyncAction(`${nameSpace}/AUTHENTICATE_WITH_TOKEN`);

export const loginAsync = createAsyncAction(`${nameSpace}/LOGIN`);

export const logoutAsync = createAsyncAction(`${nameSpace}/LOGOUT_ASYNC`);

export const logoutAction = createAction(`${nameSpace}/LOGOUT`);

export const forgotPasswordAsync = createAsyncAction(`${nameSpace}/FORGOT_PASSWORD`);

export const resetPasswordAsync = createAsyncAction(`${nameSpace}/RESET_PASSWORD`);

export const requestAuthUserAsync = createAsyncAction(`${nameSpace}/GET_AUTH_USER`);

export const logUserSessionAsync = createAsyncAction(`${nameSpace}/LOG_USER_SESSION`);
