import * as Api from '@/api/api';

const api = process.env.REACT_APP_HOUSING_API;

export const getUnBeddedSummaries = Api.get({
  path: '/api/v1/housing/bed-management/un-bedded',
  api,
});

export const getBedManagement = Api.get({
  path: '/api/v1/housing/apartment/complexes/beds',
  api,
});

export const unassignRep = (complexId, apartmentId) => Api.post({
  path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}/unassign-resident`,
  api,
});

export const assignRep = (complexId, apartmentId) =>   Api.post({
  path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}/assign-resident`,
  api,
});
