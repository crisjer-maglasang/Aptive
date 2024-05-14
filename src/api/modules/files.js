import { removeTrailingSlashes } from '@/lib/utils';
import * as Api from '../api';

const api = process.env.REACT_APP_ONB_API;

export const uploadProfilePicture = (userId) => Api.post({ path: removeTrailingSlashes(`/api/v1/files/profile-picture/${userId ?? ''}`), api });

export const uploadPassport = (userId) => Api.post({ path: removeTrailingSlashes(`/api/v1/files/passport/${userId ?? ''}`), api });

export const uploadDriverLicense = (userId) => Api.post({ path: removeTrailingSlashes(`/api/v1/files/driver-licence/${userId ?? ''}`), api });

export const uploadSocialSecurity = (userId) => Api.post({ path: removeTrailingSlashes(`/api/v1/files/social-security/${userId ?? ''}`), api });

export const uploadSignature = (userId) => Api.post({ path: removeTrailingSlashes(`/api/v1/files/signature/${userId ?? ''}`), api });

