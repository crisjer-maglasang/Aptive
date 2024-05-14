import * as Api from '@/api/api';

const api = process.env.REACT_APP_HOUSING_API;

export const createApartmentComplex = Api.post({ path: '/api/v1/housing/apartment/complexes', api });

export const createApartment = (complexId) => Api.post({ path: `/api/v1/housing/apartment/complexes/${complexId}/apartments`, api });

export const updateApartment = (complexId, apartmentId) => Api.put({ path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}`, api });

export const getApartmentsWithBeds = (complexId) => Api.get({ path: `/api/v1/housing/apartment/complexes/${complexId}/apartments-with-beds-statistics`, api });

export const getComplexes = Api.get({ path: '/api/v1/housing/apartment/complexes', api });

export const getComplexesWithAddress = Api.get({ path: '/api/v1/housing/apartment/complexes-with-addresses-summaries', api });

export const getComplex = (complexId) => Api.get({ path: `/api/v1/housing/apartment/complexes/${complexId}`, api });

export const getComplexHistory = (complexId) => Api.get({ path: `/api/v1/housing/apartment/complexes/${complexId}/history`, api });

export const updateComplex = (complexId) => Api.put({ path: `/api/v1/housing/apartment/complexes/${complexId}`, api });

export const archiveComplex = (complexId) => Api.remove({ path: `/api/v1/housing/apartment/complexes/${complexId}`, api });

export const getApartmentSummaries = Api.get({ path: '/api/v1/housing/apartment/apartments-summaries', api });

export const getPaymentMethods = Api.get({ path: '/api/v1/housing/apartment/payment-methods', api });

export const getPaymentTypes = Api.get({ path: '/api/v1/housing/apartment/payment-types', api });

export const uploadDocument = (complexId, apartmentId) => Api.post({ path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}/documents`, api });

export const deleteDocument = (complexId, apartmentId, documentId) => Api.remove({ path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}/documents/${documentId}`, api });

export const getComplexSummaries = Api.get({ path: '/api/v1/housing/apartment/complexes-summaries', api });

export const getTeamsStatistics = Api.get({ path: '/api/v1/housing/area/teams/statistics', api });

export const getComplexesStatistics = Api.get({ path: '/api/v1/housing/apartment/complexes/statistics', api });

export const getApartment = (complexId, apartmentId) => Api.get({
  path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}`,
  api,
});

export const archiveApartment = (complexId, apartmentId) => Api.remove({
  path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}`,
  api,
});

export const getApartmentHistory = (complexId, apartmentId) => Api.get({
  path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}/history`,
  api,
});
