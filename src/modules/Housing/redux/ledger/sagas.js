import { call, put, takeLatest } from 'redux-saga/effects';
import Api, { Mapper } from '../../api';
import {
  createLedgerAsync,
  createNoteAsync,
  requestLedgersAsync,
  archiveLedgerAsync,
  unArchiveLedgerAsync,
  importLedgersAsync,
  importLedgersTemplateAsync,
  exportLedgersAsync,
  requestLedgerHistoryAsync,
  editLedgerAsync,
  requestLedgerNotesAsync,
} from './actions';
import { createRequestSaga } from '@/redux/helpers';
import { prepareFileForRequest } from '@/lib/utils/files';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData } from '@/lib/api';
import { toastType } from '@/components/common';

function* requestLedgers({ payload }){
  const response = yield call(
    Api.getLedgers,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestLedgersAsync.success(Mapper.getLedgers(response)));
}

function* archiveLedger({ payload }){
  try {
    const { ledgerId, successCallback } = payload;
    yield call(
      Api.archiveLedger(ledgerId),
      { ...payload },
      { withCredentials: false },
    );

    yield put(addToastsAction([{
      type: toastType.SUCCESS,
      message: 'Archived Ledger! Your Ledger has been archived.',
      details: null,
    }]));

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* unArchiveLedger({ payload }){
  try {
    const { ledgerId, successCallback } = payload;
    yield call(
      Api.unArchiveLedger(ledgerId),
      { ...payload },
      { withCredentials: false },
    );

    yield put(addToastsAction([{
      type: toastType.SUCCESS,
      message: 'Unarchived Ledger! Your Ledger has been unarchived.',
      details: null,
    }]));

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* getLedgerHisotry({ payload }){
  const response = yield call(
    Api.getLedgerHistory(payload.ledgerId),
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestLedgerHistoryAsync.success(Mapper.getLedgerHistory(response)));
}

function* importLedgersSaga({ payload }) {
  try {
    const { format, file, successCallback } = payload;
    const formData = prepareFileForRequest(file, 'file');
    formData.append('format', format);
    yield call(
      Api.importLedgers,
      formData,
      { withCredentials: false },
    );

    if (successCallback) {
      yield call(successCallback);
    }

    yield put(addToastsAction([{
      type: toastType.SUCCESS,
      message: 'Ledgers have been successfully imported.',
      details: null,
    }]));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* getImportLedgersTemplateSaga({ payload }) {
  try {
    const { format } = payload;
    const response = yield call(
      Api.getImportLedgersTemplate,
      { format },
      { withCredentials: false },
    );

    yield put(importLedgersTemplateAsync.success(response));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* exportLedgersSaga({ payload }) {
  try {
    const response = yield call(
      Api.exportLedgers,
      { ...payload },
      { withCredentials: false },
    );

    yield put(exportLedgersAsync.success(response));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* createLedgerSaga({ payload }) {
  try {
    const { data, successCallback } = payload;
    const response = yield call(
      Api.createLedger,
      Mapper.prepareDataForCreateLedger(data),
      { withCredentials: false },
    );

    yield put(createLedgerAsync.success(response));

    if (successCallback) {
      yield call(successCallback, response?.data?.[0]?.attributes?.id);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* editLedgerSaga({ payload }) {
  try {
    const { ledgerRecordId, data, successCallback } = payload;
    const response = yield call(
      Api.updateLedger(ledgerRecordId),
      Mapper.prepareDataForEditLedger(data),
      { withCredentials: false },
    );

    yield put(editLedgerAsync.success(response));

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* createNoteSaga({ payload }) {
  try {
    const { data, successCallback } = payload;
    const response = yield call(
      Api.createNote(data.ledgerRecordId),
      { note: data.note },
      { withCredentials: false },
    );

    yield put(createNoteAsync.success(response));

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* getLedgerNotesSaga({ payload }) {
  try {
    const {ledgerId, successCallback} = payload;
    const response = yield call(
      Api.getLedgerNotes(ledgerId),
      { ...payload },
      { withCredentials: false },
    );

    yield put(requestLedgerNotesAsync.success(Mapper.getLedgerNotes(response)));

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
}
  
}

export function* ledgerActionWatcher() {
  yield takeLatest(
    requestLedgersAsync.request.type,
    createRequestSaga(requestLedgers, {
      keyNew: 'ledgerList',
      errKey: 'ledgerList',
      write: true,
    }),
  );

  yield takeLatest(
    archiveLedgerAsync.request.type,
    createRequestSaga(archiveLedger, {
      keyNew: 'archiveLedger',
      errKey: 'archiveLedger',
      write: true,
    }),
  );

  yield takeLatest(
    unArchiveLedgerAsync.request.type,
    createRequestSaga(unArchiveLedger, {
      keyNew: 'archiveLedger',
      errKey: 'archiveLedger',
      write: true,
    }),
  );

  yield takeLatest(
    importLedgersAsync.request.type,
    createRequestSaga(importLedgersSaga, {
      keyNew: 'importLedgers',
      errKey: 'importLedgers',
      write: true,
    }),
  );

  yield takeLatest(
    importLedgersTemplateAsync.request.type,
    createRequestSaga(getImportLedgersTemplateSaga, {
      keyNew: 'importLedgersTemplate',
      errKey: 'importLedgersTemplate',
      write: true,
    }),
  );

  yield takeLatest(
    exportLedgersAsync.request.type,
    createRequestSaga(exportLedgersSaga, {
      keyNew: 'exportLedgers',
      errKey: 'exportLedgers',
      write: true,
    }),
  );

  yield takeLatest(
    createLedgerAsync.request.type,
    createRequestSaga(createLedgerSaga, {
      keyNew: 'createLedger',
      errKey: 'createLedger',
      write: true,
    }),
  );

  yield takeLatest(
    editLedgerAsync.request.type,
    createRequestSaga(editLedgerSaga, {
      keyNew: 'editLedger',
      errKey: 'editLedger',
      write: true,
    }),
  );

  yield takeLatest(
    createNoteAsync.request.type,
    createRequestSaga(createNoteSaga, {
      keyNew: 'createNote',
      errKey: 'createNote',
      write: true,
    }),
  );

  yield takeLatest(
    requestLedgerHistoryAsync.request.type,
    createRequestSaga(getLedgerHisotry, {
      keyNew: 'ledgerHistory',
      errKey: 'ledgerHistory',
      write: true,
    }),
  );

  yield takeLatest(
    requestLedgerNotesAsync.request.type,
    createRequestSaga(getLedgerNotesSaga, {
      keyNew: 'ledgerNotes',
      errKey: 'ledgerNotes',
      write: true,
    }),
  );
}
