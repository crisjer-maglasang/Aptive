import * as Api from '@/api/api';

const api = process.env.REACT_APP_HOUSING_API;

export const getLedgers = Api.get({ path: '/api/v1/housing/apartment/ledger-records', api });

export const archiveLedger = (ledgerId) => Api.remove({ path: `/api/v1/housing/apartment/ledger-records/${ledgerId}`, api });

export const unArchiveLedger = (ledgerId) => Api.post({ path: `/api/v1/housing/apartment/ledger-records/${ledgerId}/restore`, api });

export const importLedgers = Api.post({ path: '/api/v1/housing/apartment/ledger-records/import', api});

export const getImportLedgersTemplate = Api.get({ path: '/api/v1/housing/apartment/ledger-records/import-template', api});

export const exportLedgers = Api.get({ path: '/api/v1/housing/apartment/ledger-records/export', api});

export const createLedger = Api.post({ path: '/api/v1/housing/apartment/ledger-records', api });

export const updateLedger = (ledgerId) => Api.put({ path: `/api/v1/housing/apartment/ledger-records/${ledgerId}`, api });

export const createNote = (ledgerRecordId) => Api.post({ path: `/api/v1/housing/apartment/ledger-records/${ledgerRecordId}/notes`, api});

export const getLedgerHistory = (ledgerRecordId) => Api.get({ path: `/api/v1/housing/apartment/ledger-records/${ledgerRecordId}/history`, api});

export const getLedgerNotes = (ledgerRecordId) => Api.get({ path: `/api/v1/housing/apartment/ledger-records/${ledgerRecordId}/notes`, api});
