import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api from '@/api';
import {
  updateRepAsync,
  submitRepProfileAsync,
  requestRepEditHistoryAsync,
  setSelectedAction,
  setOnboardingDataUpdated,
  setOnboardingFormCompleted,
  validateOnboardingFormsCompletion,
  requestAdminViewAsync,
} from './actions';
import { addToastsAction } from '@/redux/toasts';
import { normalizeIncomingData } from '@/lib/normalize';
import { mapErrorToastsData } from '@/lib/api';
import {
  housingAndVehicleCompletionSelector,
  hrCompletionSelector,
  licensingCompletionSelector,
  personalInfoCompletionSelector,
  uniformCompletionSelector,
} from './selectors';
import { onboardingConstants } from '@/lib';

const {
  PERSONAL_INFO_FORM_NAME,
  HOUSING_AND_VEHICLES_FORM_NAME,
  UNIFORM_AND_SWAG_FORM_NAME,
  LICENSING_FORM_NAME,
  HR_INFO_FORM_NAME,
} = onboardingConstants;

function* updateRepSaga({ payload }) {
  try {
    const { data, successCallback, cancelToken } = payload;

    yield put(setOnboardingDataUpdated(false));
    const result = yield call(
      Api.updateRep,
      { ...data },
      {
        withCredentials: false,
        ...(cancelToken && { cancelToken }),
      },
    );

    const modified = normalizeIncomingData(result.data?.attributes);

    yield put(setSelectedAction(modified));
    yield put(setOnboardingDataUpdated(true));

    successCallback();
  } catch(error) {
    yield put(addToastsAction(mapErrorToastsData(error)));
    throw error;
  }
}

function* submitRepProfileSaga() {
  try {
    const response = yield call(
      Api.submitRepProfile(),
      Api.submitRepProfile.requestPayload(),
      { withCredentials: false },
    );

    yield put(submitRepProfileAsync.success(
      Api.submitRepProfile.successPayload(response),
    ));
  } catch (error) {
    if (error.response) {
      yield all({
        toasts: put(addToastsAction(mapErrorToastsData(error))),
        failure: put(submitRepProfileAsync.failure(
          Api.submitRepProfile.failurePayload(error.response),
        )),
      });
    }

    throw error;
  }
}

function* requestRepEditHistorySaga({ payload }) {
  const { userId, ...rest } = payload;

  try {
    const response = yield call(
      Api.getRepEditHistory(userId),
      Api.getRepEditHistory.requestPayload(rest),
      { withCredentials: false },
    );

    yield put(requestRepEditHistoryAsync.success(
      Api.getRepEditHistory.successPayload(response),
    ));
  } catch (error) {
    if (error.response) {
      yield all({
        toasts: put(addToastsAction(mapErrorToastsData(error))),
        failure: put(requestRepEditHistoryAsync.failure(
          Api.getRepEditHistory.failurePayload(error.response),
        )),
      });
    }

    throw error;
  }
}

function* requestAdminViewSaga({ payload }) {
  try {
    const { userId } = payload;

    const response = yield call(
      Api.getAdminView(userId),
      {},
      { withCredentials: false },
    );

    yield put(requestAdminViewAsync.success(response));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));
    throw error;
  }
}

function* validateProfileCompletion() {
  const isPersonalCompleted = yield select(personalInfoCompletionSelector);
  yield put(setOnboardingFormCompleted({
    formId: PERSONAL_INFO_FORM_NAME,
    isCompleted: isPersonalCompleted,
  }));

  const isHousingCompleted = yield select(housingAndVehicleCompletionSelector);
  yield put(setOnboardingFormCompleted({
    formId: HOUSING_AND_VEHICLES_FORM_NAME,
    isCompleted: isHousingCompleted,
  }));

  const isUniformCompleted = yield select(uniformCompletionSelector);
  yield put(setOnboardingFormCompleted({
    formId: UNIFORM_AND_SWAG_FORM_NAME,
    isCompleted: isUniformCompleted,
  }));

  const isLicensingCompleted = yield select(licensingCompletionSelector);
  yield put(setOnboardingFormCompleted({
    formId: LICENSING_FORM_NAME,
    isCompleted: isLicensingCompleted,
  }));

  const isHrCompleted = yield select(hrCompletionSelector);
  yield put(setOnboardingFormCompleted({
    formId: HR_INFO_FORM_NAME,
    isCompleted: isHrCompleted,
  }));
}

export function* onboardingActionWatcher() {
  yield takeLatest(
    updateRepAsync.request,
    createRequestSaga(updateRepSaga, {
      keyNew: 'reps',
      errKey: 'reps',
    }),
  );

  yield takeLatest(
    submitRepProfileAsync.request,
    createRequestSaga(submitRepProfileSaga, {
      keyNew: 'submitRepProfile',
      errKey: 'submitRepProfile',
    }),
  );

  yield takeLatest(
    requestRepEditHistoryAsync.request,
    createRequestSaga(requestRepEditHistorySaga, {
      keyNew: 'repEditHistory',
      errKey: 'repEditHistory',
    }),
  );

  yield takeLatest(
    validateOnboardingFormsCompletion,
    createRequestSaga(validateProfileCompletion, {
      keyNew: 'validateCompletion',
      errKey: 'validateCompletion',
    }),
  );

  yield takeLatest(
    requestAdminViewAsync.request,
    createRequestSaga(requestAdminViewSaga, {
      keyNew: 'adminView',
      errKey: 'adminView',
    }),
  );
}
