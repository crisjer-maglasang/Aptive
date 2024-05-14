import { createReducer } from '@/redux/root';
import {
  apartmentNameSpace,
  requestComplexesAsync,
  setSelectedApartmentAction,
  resetSelectedApartmentAction,
  requestApartmentSummariesAsync,
  requestPaymentMethodsAsync,
  requestPaymentTypesAsync,
  requestComplexSummariesAsync,
  requestTeamsStatisticsAsync,
  requestComplexesStatisticsAsync,
  setIsHideMenuAction,
  requestApartmentAsync,
  updateApartmentAsync,
  requestComplexAsync,
  resetSelectedComplexAction,
  requestComplexesWithAddressAsync,
  requestApartmentsWithBedsAsync,
  uploadDocumentAsync,
  deleteDocumentAsync,
  requestApartmentHistoryAsync,
  requestComplexHistoryAsync,
} from './actions';

const initialState = {
  complexes: [],
  complexesTotal: 0,
  selected: {},
  complex: {
    selected: {},
    apartmentsWithBeds: [],
    history: {},
  },
  apartmentSummaries: [],
  complexSummaries: [],
  paymentMethods: [],
  paymentTypes: [],
  teamsStatistics: [],
  teamsStatisticsTotal: 0,
  complexesStatistics: [],
  complexesStatisticsTotal: 0,
  complexesWithAddressSummaries: [],
  isHideMenu: false,
  documentsList: [],
  apartmentHistory: {
    items: [],
    total: 0,
  },
};

export const apartmentReducer = createReducer(apartmentNameSpace, initialState, {
  [requestComplexesAsync.success]: ({ state, action }) => {
    const { items, total } = action.payload;

    state.complexes = items;
    state.complexesTotal = total;
  },

  [setSelectedApartmentAction]: ({ state, action }) => {
    state.selected = {
      ...state.selected,
      ...action.payload,
    };
  },

  [requestApartmentSummariesAsync.success]: ({ state, action }) => {
    state.apartmentSummaries = action.payload ?? [];
  },

  [requestPaymentMethodsAsync.success]: ({ state, action }) => {
    state.paymentMethods = action.payload ?? [];
  },

  [requestPaymentTypesAsync.success]: ({ state, action }) => {
    state.paymentTypes = action.payload ?? [];
  },

  [resetSelectedApartmentAction]: ({ state }) => {
    state.selected = {};
  },

  [requestComplexSummariesAsync.success]: ({ state, action }) => {
    state.complexSummaries = action.payload ?? [];
  },

  [requestTeamsStatisticsAsync.success]: ({ state, action }) => {
    const { items, total } = action.payload;
    state.teamsStatistics = items;
    state.teamsStatisticsTotal = total;
  },

  [requestComplexesStatisticsAsync.success]: ({ state, action }) => {
    const { items, total } = action.payload;
    state.complexesStatistics = items;
    state.complexesStatisticsTotal = total;
  },

  [requestComplexAsync.success]: ({ state, action }) => {
    state.complex.selected = action.payload;
  },

  [requestComplexHistoryAsync.success]: ({ state, action: { payload } }) => {
    state.complex.history.items = payload.data.map(({ attributes }) => ({
      itemChanged: attributes.field_name,
      changedFrom: attributes.changed_from,
      changedFromAddition: attributes.changed_from_addition,
      changedTo: attributes.changed_to,
      changedToAddition: attributes.changed_to_addition,
      changedBy: attributes.changed_by_name,
      changedAt: attributes.changed_at,
    }));
    state.complex.history.total = payload.meta.total;
  },

  [setIsHideMenuAction]: ({ state, action }) => {
    state.isHideMenu = action.payload;
  },

  [requestApartmentAsync.success]: ({ state, action }) => {
    state.selected = action.payload;
  },

  [requestApartmentsWithBedsAsync.success]: ({ state, action }) => {
    const { items } = action.payload;
    state.complex.apartmentsWithBeds = items;
  },

  [updateApartmentAsync.success]: ({ state, action }) => {
    state.selected = action.payload;
  },

  [resetSelectedComplexAction]: ({ state }) => {
    state.complex = initialState.complex;
  },

  [requestComplexesWithAddressAsync.success]: ({ state, action }) => {
    const { items } = action.payload;
    state.complexesWithAddressSummaries = items;
  },

  [uploadDocumentAsync.success]: ({ state, action }) => {
    state.documentsList = action.payload;
  },

  [deleteDocumentAsync.success]: ({ state, action }) => {
    state.documentsList = action.payload;
  },

  [requestApartmentHistoryAsync.success]: ({ state, action: { payload } }) => {
    state.apartmentHistory.items = payload.data.map(({ attributes }) => ({
      itemChanged: attributes.field_name,
      changedFrom: attributes.changed_from,
      changedTo: attributes.changed_to,
      changedBy: attributes.changed_by_name,
      changedAt: attributes.changed_at,
    }));
    state.apartmentHistory.total = payload.meta.total;
  },
});
