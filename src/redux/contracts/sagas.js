import { call, put, takeLatest, select } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import {
  requestContractLinkAsync,
  requestRepContractsAsync,
  requestAvailableContractsAsync,
  saveAndSendContractAsync,
  requestContractStatsAsync,
  requestRecruitProgressStatsAsync,
  deleteContractAsync,
  hideContractAsync,
  revealContractAsync,
  setHiddenRevealedAction,
  requestDocumentSignLinkAsync,
  requestDocumentViewLinkAsync,
  requestDocumentAsync,
  requestPersonalContractsAsync,
} from './actions';
import { userIdSelector } from '@/redux/auth';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData } from '@/lib/api';

function* requestContractLinkSaga({ payload }) {
  const { action, contractId, callback, recruitId } = payload;
  const { data } = yield call(
    Api.getContractLink,
    {
      contract_id: contractId,
      ...(action && { action }),
    },
    { withCredentials: false },
  );

  yield call(callback, { link: data.attributes.link });
}

function* getRepContractsSaga({ payload }) {
  const { recruitId, userId } = payload;

  const response = yield call(
    Api.getRepContracts,
    { recruitId, userId },
    { withCredentials: false },
  );

  yield put(requestRepContractsAsync.success({
    id: recruitId ?? userId,
    items: Mapper.getRepContracts(response),
  }));
}

function* getPersonalContractsSaga({ payload }) {
  const { userId } = payload;

  const response = yield call(
    Api.getPersonalContracts,
    {},
    { withCredentials: false },
  );

  yield put(requestPersonalContractsAsync.success({
    id: userId,
    items: Mapper.getRepContracts(response),
  }));
}

function* getAvailableContractsSaga({ payload }) {
  const { recruitId } = payload;

  const templates = yield call(
    Api.getAvailableContracts,
    { recruitId },
    { withCredentials: false },
  );

  yield put(requestAvailableContractsAsync.success({ recruitId, templates: templates.data }));
}

function* saveAndSendContractSaga({ payload }) {
  try {
    const { recruitId } = payload;

    const contract = yield call(
      Api.saveAndSendContract,
      { ...payload },
      { withCredentials: false },
    );

    yield put(saveAndSendContractAsync.success({
      contract: Mapper.getRepContracts(contract)[0],
      id: recruitId,
    }));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));
    throw error;
  }
}

function* getContractsStatsSaga({ payload = {} }) {
  const response = yield call(
    Api.getContractStats,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestContractStatsAsync.success(response.data.attributes));
}

function* getRecruitProgressStatsSaga() {
  const response = yield call(
    Api.getRecruitProgressStats,
    {},
    { withCredentials: false },
  );

  yield put(requestRecruitProgressStatsAsync.success(response.data.attributes));
}

function* deleteContractSaga({ payload }) {
  const { contractId } = payload;
  const result = yield call(
    Api.deleteContract(contractId),
    {},
    { withCredentials: false },
  );

  yield put(deleteContractAsync.success(result));
  yield call(payload.callback);
}

function* hideContractSaga({ payload }) {
  const { contractId, contractYear, selectedUser } = payload;
  yield call(
    Api.hideContract(contractId),
    {},
    { withCredentials: false },
  );

  const userId = yield select(userIdSelector);
  yield put(setHiddenRevealedAction({ selectedUser, contractYear, contractId, userId }));
}

function* revealContractSaga({ payload }) {
  const { contractId, contractYear, selectedUser } = payload;
  yield call(
    Api.revealContract(contractId),
    {},
    { withCredentials: false },
  );

  yield put(setHiddenRevealedAction({ selectedUser, contractYear, contractId }));
}

function* requestDocumentSignLinkSaga({ payload }) {
  const { documentType, callback } = payload;
  const { data } = yield call(
    Api.getDocumentSignLink,
    {
      type: documentType,
    },
    { withCredentials: false },
  );

  yield call(callback, { link: data.attributes.link });
}

function* requestDocumentViewLinkSaga({ payload }) {
  const { documentType, callback, userId } = payload;
  const { data } = yield call(
    Api.getDocumentViewLink(userId || null),
    {
      type: documentType,
    },
    { withCredentials: false },
  );

  yield call(callback, { link: data.attributes.link });
}

function* requestDocumentSaga({ payload }) {
  const { documentType, callback, userId } = payload;
  const response = yield call(
    Api.getDocument(userId || null),
    {
      type: documentType,
    },
    { withCredentials: false },
  );

  yield call(callback);
  yield put(requestDocumentAsync.success(response));
}

export function* contractsActionWatcher() {
  yield takeLatest(
    requestContractLinkAsync.request.type,
    createRequestSaga(requestContractLinkSaga, {
      keyNew: 'contractsLink',
      errKey: 'contractsLink',
      write: false,
    }),
  );

  yield takeLatest(
    requestRepContractsAsync.request.type,
    createRequestSaga(getRepContractsSaga, {
      keyNew: 'repsContracts',
      errKey: 'repsContracts',
      write: false,
    }),
  );

  yield takeLatest(
    requestPersonalContractsAsync.request.type,
    createRequestSaga(getPersonalContractsSaga, {
      keyNew: 'repsContracts',
      errKey: 'repsContracts',
      write: false,
    }),
  );

  yield takeLatest(
    requestAvailableContractsAsync.request.type,
    createRequestSaga(getAvailableContractsSaga, {
      keyNew: 'availableContracts',
      errKey: 'availableContracts',
      write: false,
    }),
  );

  yield takeLatest(
    saveAndSendContractAsync.request.type,
    createRequestSaga(saveAndSendContractSaga, {
      keyNew: 'saveContract',
      errKey: 'saveContract',
      write: true,
    }),
  );

  yield takeLatest(
    requestContractStatsAsync.request.type,
    createRequestSaga(getContractsStatsSaga, {
      keyNew: 'contractStats',
      errKey: 'contractStats',
      write: false,
    }),
  );

  yield takeLatest(
    requestRecruitProgressStatsAsync.request.type,
    createRequestSaga(getRecruitProgressStatsSaga, {
      keyNew: 'recruitProgressStats',
      errKey: 'recruitProgressStats',
      write: false,
    }),
  );

  yield takeLatest(
    deleteContractAsync.request.type,
    createRequestSaga(deleteContractSaga, {
      keyNew: 'deleteContract',
      errKey: 'deleteContract',
      write: true,
    }),
  );

  yield takeLatest(
    hideContractAsync.request.type,
    createRequestSaga(hideContractSaga, {
      keyNew: 'hideContract',
      errKey: 'hideContract',
      write: true,
    }),
  );

  yield takeLatest(
    revealContractAsync.request.type,
    createRequestSaga(revealContractSaga, {
      keyNew: 'revealContract',
      errKey: 'revealContract',
      write: true,
    }),
  );

  yield takeLatest(
    requestDocumentSignLinkAsync.request.type,
    createRequestSaga(requestDocumentSignLinkSaga, {
      keyNew: 'documentSignLink',
      errKey: 'documentSignLink',
      write: true,
    }),
  );

  yield takeLatest(
    requestDocumentViewLinkAsync.request.type,
    createRequestSaga(requestDocumentViewLinkSaga, {
      keyNew: 'documentViewLink',
      errKey: 'documentViewLink',
      write: true,
    }),
  );

  yield takeLatest(
    requestDocumentAsync.request.type,
    createRequestSaga(requestDocumentSaga, {
      keyNew: 'documentDownload',
      errKey: 'documentDownload',
      write: true,
    }),
  );
}

