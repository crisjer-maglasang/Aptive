import { createAsyncAction, createAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const ledgerNameSpace = `${nameSpace}/ledger`;

export const requestLedgersAsync = createAsyncAction(`${ledgerNameSpace}/GET_LEDGERS`);

export const archiveLedgerAsync = createAsyncAction(`${ledgerNameSpace}/ARCHIVE_LEDGER`);

export const unArchiveLedgerAsync = createAsyncAction(`${ledgerNameSpace}/UN_ARCHIVE_LEDGER`);

export const importLedgersAsync = createAsyncAction(`${ledgerNameSpace}/IMPORT_LEDGER`);

export const importLedgersTemplateAsync = createAsyncAction(`${ledgerNameSpace}/IMPORT_LEDGER_TEMPLATE`);

export const exportLedgersAsync = createAsyncAction(`${ledgerNameSpace}/RESET_SELECTED_LEDGER`);

export const createLedgerAsync = createAsyncAction(`${ledgerNameSpace}/CREATE_LEDGER`);

export const editLedgerAsync = createAsyncAction(`${ledgerNameSpace}/UPDATE_LEDGER`);

export const createNoteAsync = createAsyncAction(`${ledgerNameSpace}/CREATE_NOTE`);

export const resetSelectedLedgerAction = createAction(`${ledgerNameSpace}/RESET_SELECTED_LEDGER`);

export const setSelectedLedgerAction = createAction(`${ledgerNameSpace}/SET_SELECTED_LEDGER`);

export const requestLedgerHistoryAsync = createAsyncAction(`${ledgerNameSpace}/GET_LEDGER_HISTORY`);

export const requestLedgerNotesAsync = createAsyncAction(`${ledgerNameSpace}/GET_LEDGER_NOTES`);
