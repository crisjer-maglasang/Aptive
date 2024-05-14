import { createReducer } from '@/redux/root';
import {
  createLedgerAsync,
  editLedgerAsync,
  createNoteAsync,
  requestLedgersAsync,
  resetSelectedLedgerAction,
  ledgerNameSpace,
  exportLedgersAsync,
  importLedgersTemplateAsync,
  setSelectedLedgerAction,
  requestLedgerHistoryAsync,
  requestLedgerNotesAsync,
} from './actions';
import { s2ab } from '@/lib/utils';
import { saveAs } from 'file-saver';

const initialState = {
  ledgerList: [],
  ledgerTotal: 0,
  ledger: {
    id: null,
    branch_id: null,
    team_id: null,
    partnership_id: null,
    apartment_ids: [],
    vendor_number: null,
    payment_method_id: null,
    payment_type_id: null,
    amount_to_pay: 0,
    amount_paid: 0,
    date_paid: null,
    date_due: null,
    furniture_damaged: 0,
    rep_utilities: 0,
    apartment_charges: 0,
    notes: [],
  },
  history: [],
  historiesTotal: 0,
};
const downloadLedgersFile = (payload) => {
  const fileData = payload?.data?.attributes;
  const blob = new Blob([s2ab(atob(fileData?.file))], { type: '' });
  saveAs(blob, fileData?.file_name);
};

export const ledgerReducer = createReducer(ledgerNameSpace, initialState, {
  [requestLedgersAsync.success]: ({ state, action }) => {
    const { items, total } = action.payload;
    state.ledgerList = items;
    state.ledgerTotal = total;
  },
  [exportLedgersAsync.success]: ({ action: { payload } }) => {
    downloadLedgersFile(payload);
  },
  [importLedgersTemplateAsync.success]: ({ action: { payload } }) => {
    downloadLedgersFile(payload);
  },
  [createLedgerAsync.success]: ({ state, action }) => {
    state.ledger = initialState.ledger;
  },
  [editLedgerAsync.success]: ({ state, action }) => {
    state.ledger = initialState.ledger;
  },
  [createNoteAsync.success]: ({ state }) => {
    state.ledger = initialState.ledger;
  },
  [resetSelectedLedgerAction]: ({ state }) => {
    state.ledger = initialState.ledger;
  },
  [setSelectedLedgerAction]: ({ state, action }) => {
    state.ledger = action.payload;
  },
  [requestLedgerHistoryAsync.success]: ({ state, action }) => {
    const { items, total } = action.payload;
    state.history = items;
    state.historiesTotal = total;
  },
  [requestLedgerNotesAsync.success]: ({ state, action }) => {
    state.ledger.notes = action.payload;
  },
});
