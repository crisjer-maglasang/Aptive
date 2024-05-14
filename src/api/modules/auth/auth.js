import * as Api from '../../api';

const apiSPT = process.env.REACT_APP_SPT_API;
const apiONB = process.env.REACT_APP_ONB_API;

export const authenticateWithToken = Api.post({ path: '/api/v1/auth/authenticate-with-token', api: apiSPT });

export const login = Api.post({ path: '/api/v1/auth/login', api: apiONB });

export const refreshToken = Api.post({ path: '/api/v1/auth/refresh-token', api: apiONB });

export const resetPassword = Api.post({ path: '/api/v1/auth/reset-password', api: apiONB });

export const forgotPassword = Api.post({ path: '/api/v1/auth/forgot-password', api: apiONB });

export const getAuthUser = Api.get({ path: '/api/v1/users/me', api: apiONB });

export const logUserSession = Api.post({ path: '/api/v1/reps/log-user-session', api: apiONB });
