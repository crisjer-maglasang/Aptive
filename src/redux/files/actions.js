import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/files-new';

export const resetFilesAction = createAction(`${nameSpace}/RESET_FILES`);
export const uploadProfilePicAsync = createAsyncAction(`${nameSpace}/UPLOAD_PROFILE_PIC`);
export const uploadPassportAsync = createAsyncAction(`${nameSpace}/UPLOAD_PASSPORT`);
export const uploadDriverLicenseAsync = createAsyncAction(`${nameSpace}/UPLOAD_DRIVER_LICENSE`);
export const uploadSsCardAsync = createAsyncAction(`${nameSpace}/UPLOAD_SS_CARD`);
export const uploadSignatureAsync = createAsyncAction(`${nameSpace}/UPLOAD_SIGNATURE`);
