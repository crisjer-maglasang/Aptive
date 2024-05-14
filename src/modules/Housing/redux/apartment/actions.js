import { createAction, createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const apartmentNameSpace = `${nameSpace}/apartment`;

export const createApartmentComplexAsync = createAsyncAction(`${nameSpace}/CREATE_APARTMENT_COMPLEX`);

export const createApartmentAsync = createAsyncAction(`${nameSpace}/CREATE_APARTMENT`);

export const updateApartmentAsync = createAsyncAction(`${nameSpace}/UPDATE_APARTMENT`);

export const requestComplexesAsync = createAsyncAction(`${nameSpace}/GET_COMPLEXES`);

export const requestComplexAsync = createAsyncAction(`${nameSpace}/GET_COMPLEX`);

export const requestComplexHistoryAsync = createAsyncAction(`${nameSpace}/GET_COMPLEX_HISTORY`);

export const updateComplexAsync = createAsyncAction(`${nameSpace}/UPDATE_COMPLEX`);

export const archiveComplexAsync = createAsyncAction(`${nameSpace}/ARCHIVE_COMPLEX`);

export const resetSelectedComplexAction = createAction(`${nameSpace}/RESET_SELECTED_COMPLEX`);

export const setSelectedApartmentAction = createAction(`${nameSpace}/SET_SELECTED_APARTMENT`);

export const resetSelectedApartmentAction = createAction(`${nameSpace}/RESET_SELECTED_APARTMENT`);

export const requestApartmentSummariesAsync = createAsyncAction(`${nameSpace}/GET_APARTMENT_SUMMAIRES`);

export const requestPaymentMethodsAsync = createAsyncAction(`${nameSpace}/GET_PAYMENT_METHODS`);

export const requestPaymentTypesAsync = createAsyncAction(`${nameSpace}/GET_PAYMENT_TYPES`);

export const requestComplexSummariesAsync = createAsyncAction(`${nameSpace}/GET_COMPLEX_SUMMARIES`);

export const requestTeamsStatisticsAsync = createAsyncAction(`${nameSpace}/GET_TEAMS_STATISTICS`);

export const requestComplexesStatisticsAsync = createAsyncAction(`${nameSpace}/GET_COMPLEXES_STATISTICS`);

export const setIsHideMenuAction = createAction(`${nameSpace}/SET_IS_HIDE_MENU`);

export const requestApartmentAsync = createAsyncAction(`${nameSpace}/GET_APARTMENT_INFO`);

export const archiveApartmentAsync = createAsyncAction(`${nameSpace}/ARCHIVE_APARTMENT`);

export const requestApartmentsWithBedsAsync = createAsyncAction(`${nameSpace}/GET_APARTMENTS_WITH_BEDS`);

export const requestComplexesWithAddressAsync = createAsyncAction(`${nameSpace}/GET_COMPLEXES_WITH_ADDRESS`);

export const uploadDocumentAsync = createAsyncAction(`${nameSpace}/UPLOAD_DOCUMENT`);

export const deleteDocumentAsync = createAsyncAction(`${nameSpace}/DELETE_DOCUMENT`);

export const requestApartmentHistoryAsync = createAsyncAction(`${nameSpace}/GET_APARTMENT_HISTORY`);
