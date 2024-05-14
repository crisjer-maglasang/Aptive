import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import {
  createApartmentComplexAsync,
  requestApartmentSummariesAsync,
  requestPaymentMethodsAsync,
  requestPaymentTypesAsync,
  requestComplexSummariesAsync,
  updateComplexAsync,
  requestComplexesWithAddressAsync,
  requestApartmentsWithBedsAsync,
  archiveApartmentAsync,
  archiveComplexAsync,
  requestApartmentHistoryAsync,
  requestComplexHistoryAsync,
} from './actions';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData } from '@/lib/api';
import {
  createApartmentAsync,
  updateApartmentAsync,
  requestComplexesAsync,
  requestTeamsStatisticsAsync,
  requestComplexesStatisticsAsync,
  requestApartmentAsync,
  requestComplexAsync,
  uploadDocumentAsync,
  deleteDocumentAsync,
} from '@/modules/Housing/redux/apartment';
import { normalizeApartmentData, prepareDocumentsForDisplay, normalizeComplexData } from '@/modules/Housing/modules/ApartmentSetup/lib';
import { toastType } from '@/components/common';

function* createApartmentComplexSaga({ payload }) {
  try {
    const { data, successCallback } = payload;
    yield call(
      Api.createApartmentComplex,
      Mapper.prepareDataForCreateComplex(data),
      { withCredentials: false },
    );

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* createApartmentSags({ payload }) {
  try {
    const { data, complexId, successCallback } = payload;
    const response = yield call(
      Api.createApartment(complexId),
      Mapper.prepareDataForApartment(data),
      { withCredentials: false },
    );

    const createdApartment = response.data.attributes.apartments.pop();

    if (successCallback) {
      yield call(successCallback(data, complexId, createdApartment.apartment_id));
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* updateApartmentSaga({ payload }) {
  try {
    const { data, complexId, apartmentId, successCallback } = payload;
    const response = yield call(
      Api.updateApartment(complexId, apartmentId),
      Mapper.prepareDataForApartment(data),
      { withCredentials: false },
    );

    const normalizedApartmentData = normalizeApartmentData(response.data.attributes);

    yield put(updateApartmentAsync.success(normalizedApartmentData));

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* uploadDocumentSaga({ payload }) {
  try {
    const { data, complexId, apartmentId, successCallback } = payload;

    if (data?.document_upload?.upload_files) {
      const response = yield call(
        Api.uploadDocument(complexId, apartmentId),
        Mapper.prepareDataForDocumentUpload(data.document_upload.upload_files),
        { withCredentials: false },
      );
      const documentsList = response.data.map((item) => item.attributes);
      yield put(uploadDocumentAsync.success(prepareDocumentsForDisplay(documentsList)));
    }

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* deleteDocumentSaga({ payload }) {
  try {
    const { data, complexId, apartmentId, successCallback } = payload;
    const response = yield call(
      Api.deleteDocument(complexId, apartmentId, data),
      {},
      { withCredentials: false },
    );

    const documentsList = response.data.map((item) => item.attributes);
    yield put(deleteDocumentAsync.success(prepareDocumentsForDisplay(documentsList)));

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* requestComplexApartmentsWithBeds({ payload }) {
  const { complexId } = payload;
  const response = yield call(
    Api.getApartmentsWithBeds(complexId),
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestApartmentsWithBedsAsync.success(Mapper.getApartmentsWithBeds(response)));
}

function* requestComplexes({ payload }) {
  const response = yield call(
    Api.getComplexes,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestComplexesAsync.success(Mapper.getComplexes(response)));
}

function* requestComplexesWithAddress({ payload }) {
  const response = yield call(
    Api.getComplexesWithAddress,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestComplexesWithAddressAsync.success(Mapper.getComplexesWithAddress(response)));
}

function* requestComplex({ payload }) {
  const { complexId } = payload;
  const response = yield call(
    Api.getComplex(complexId),
    {},
    { withCredentials: false },
  );

  yield put(requestComplexAsync.success(normalizeComplexData(response.data.attributes)));
}

function* requestComplexHistory({ payload }) {
  const { complexId, ...data } = payload;
  const response = yield call(
    Api.getComplexHistory(complexId),
    { ...data },
    { withCredentials: false },
  );

  yield put(requestComplexHistoryAsync.success(response));
}

function* updateComplexSaga({ payload }) {
  try {
    const { data, complexId, successCallback } = payload;
    yield call(
      Api.updateComplex(complexId),
      Mapper.prepareDataForCreateComplex(data),
      { withCredentials: false },
    );

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* archiveComplexSaga({ payload }) {
  try {
    const { complexId, successCallback } = payload;
    yield call(
      Api.archiveComplex(complexId),
      {},
      { withCredentials: false },
    );

    yield put(addToastsAction([{
      type: toastType.SUCCESS,
      message: 'Archived Complex! Your Complex has been archived.',
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

function* requestComplexSummaries({ payload }) {
  const response = yield call(
    Api.getComplexSummaries,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestComplexSummariesAsync.success(Mapper.getComplexSummaries(response)));
}

function* requestApartmentSummariesSaga({ payload }) {
  const response = yield call(
    Api.getApartmentSummaries,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestApartmentSummariesAsync.success(Mapper.getApartmentSummaries(response)));
}

function* requestPaymentMethodsSaga({ payload }) {
  const response = yield call(
    Api.getPaymentMethods,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestPaymentMethodsAsync.success(Mapper.getPaymentMethods(response)));
}

function* requestPaymentTypesSaga({ payload }) {
  const response = yield call(
    Api.getPaymentTypes,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestPaymentTypesAsync.success(Mapper.getPaymentTypes(response)));
}

function* requestApartmentHistorySaga({ payload }) {
  const { complexId, apartmentId, page, section } = payload;
  const response = yield call(
    Api.getApartmentHistory(complexId, apartmentId),
    { page, section },
    { withCredentials: false },
  );

  yield put(requestApartmentHistoryAsync.success(response));
}

function* requestTeamsStatisticsSaga({ payload }) {
  const response = yield call(
    Api.getTeamsStatistics,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestTeamsStatisticsAsync.success(Mapper.getTeamsStatistics(response)));
}

function* requestComplexesStatisticsSaga({ payload }) {
  const response = yield call(
    Api.getComplexesStatistics,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestComplexesStatisticsAsync.success(Mapper.getComplexesStatistics(response)));
}

function* requestApartmentSaga({ payload }) {
  const { complexId, apartmentId } = payload;
  const response = yield call(
    Api.getApartment(complexId, apartmentId),
    {},
    { withCredentials: false },
  );

  const newData = normalizeApartmentData(response.data.attributes);
  yield put(requestApartmentAsync.success(newData));
  yield put(uploadDocumentAsync.success(prepareDocumentsForDisplay(response.data.attributes.documents)));
}

function* archiveApartmentSaga({ payload }) {
  try {
    const { complexId, apartmentId, successCallback } = payload;
    yield call(
      Api.archiveApartment(complexId, apartmentId),
      {},
      { withCredentials: false },
    );

    yield put(addToastsAction([{
      type: toastType.SUCCESS,
      message: 'Archived Apartment! Your Apartment has been archived.',
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

export function* apartmentWatcher() {
  yield takeLatest(
    createApartmentComplexAsync.request.type,
    createRequestSaga(createApartmentComplexSaga, {
      keyNew: 'createComplex',
      errKey: 'createComplex',
      write: true,
    }),
  );
  yield takeLatest(
    updateComplexAsync.request.type,
    createRequestSaga(updateComplexSaga, {
      keyNew: 'updateComplex',
      errKey: 'updateComplex',
      write: true,
    }),
  );
  yield takeLatest(
    createApartmentAsync.request.type,
    createRequestSaga(createApartmentSags, {
      keyNew: 'apartment',
      errKey: 'apartment',
      write: true,
    }),
  );
  yield takeLatest(
    updateApartmentAsync.request.type,
    createRequestSaga(updateApartmentSaga, {
      keyNew: 'apartment',
      errKey: 'apartment',
      write: true,
    }),
  );
  yield takeLatest(
    requestApartmentsWithBedsAsync.request.type,
    createRequestSaga(requestComplexApartmentsWithBeds, {
      keyNew: 'apartmentsWithBeds',
      errKey: 'apartmentsWithBeds',
      write: true,
    }),
  );
  yield takeLatest(
    requestComplexesAsync.request.type,
    createRequestSaga(requestComplexes, {
      keyNew: 'complexes',
      errKey: 'complexes',
      write: true,
    }),
  );
  yield takeLatest(
    requestComplexesWithAddressAsync.request.type,
    createRequestSaga(requestComplexesWithAddress, {
      keyNew: 'complexesWithAddress',
      errKey: 'complexesWithAddress',
      write: true,
    }),
  );
  yield takeLatest(
    requestComplexAsync.request.type,
    createRequestSaga(requestComplex, {
      keyNew: 'getComplex',
      errKey: 'getComplex',
      write: true,
    }),
  );
  yield takeLatest(
    archiveComplexAsync.request.type,
    createRequestSaga(archiveComplexSaga, {
      keyNew: 'archiveComplex',
      errKey: 'archiveComplex',
      write: true,
    }),
  );
  yield takeLatest(
    requestComplexHistoryAsync.request.type,
    createRequestSaga(requestComplexHistory, {
      keyNew: 'getComplexHistory',
      errKey: 'getComplexHistory',
      write: true,
    }),
  );
  yield takeLatest(
    requestComplexSummariesAsync.request.type,
    createRequestSaga(requestComplexSummaries, {
      keyNew: 'complexSummaries',
      errKey: 'complexSummaries',
      write: true,
    }),
  );
  yield takeLatest(
    requestApartmentSummariesAsync.request.type,
    createRequestSaga(requestApartmentSummariesSaga, {
      keyNew: 'apartmentSummaries',
      errKey: 'apartmentSummaries',
      write: true,
    }),
  );
  yield takeLatest(
    requestPaymentMethodsAsync.request.type,
    createRequestSaga(requestPaymentMethodsSaga, {
      keyNew: 'paymentMethods',
      errKey: 'paymentMethods',
      write: true,
    }),
  );
  yield takeLatest(
    requestPaymentTypesAsync.request.type,
    createRequestSaga(requestPaymentTypesSaga, {
      keyNew: 'paymentTypes',
      errKey: 'paymentTypes',
      write: true,
    }),
  );
  yield takeLatest(
    requestTeamsStatisticsAsync.request.type,
    createRequestSaga(requestTeamsStatisticsSaga, {
      keyNew: 'teamsStatistics',
      errKey: 'teamsStatistics',
      write: true,
    }),
  );
  yield takeLatest(
    requestComplexesStatisticsAsync.request.type,
    createRequestSaga(requestComplexesStatisticsSaga, {
      keyNew: 'complexesStatistics',
      errKey: 'complexesStatistics',
      write: true,
    }),
  );
  yield takeLatest(
    requestApartmentAsync.request.type,
    createRequestSaga(requestApartmentSaga, {
      keyNew: 'apartment',
      errKey: 'apartment',
      write: true,
    }),
  );
  yield takeLatest(
    uploadDocumentAsync.request.type,
    createRequestSaga(uploadDocumentSaga, {
      keyNew: 'apartment',
      errKey: 'apartment',
      write: true,
    }),
  );
  yield takeLatest(
    archiveApartmentAsync.request.type,
    createRequestSaga(archiveApartmentSaga, {
      keyNew: 'archiveApartment',
      errKey: 'archiveApartment',
      write: true,
    }),
  );
  yield takeLatest(
    requestApartmentHistoryAsync.request.type,
    createRequestSaga(requestApartmentHistorySaga, {
      keyNew: 'apartmentHistory',
      errKey: 'apartmentHistory',
      write: true,
    }),
  );
  yield takeLatest(
    deleteDocumentAsync.request.type,
    createRequestSaga(deleteDocumentSaga, {
      keyNew: 'deleteDocument',
      errKey: 'deleteDocument',
      write: true,
    }),
  );
}
