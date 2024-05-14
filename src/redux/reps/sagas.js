import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import { isEmpty, omit } from 'lodash-es';
import Api from '../../api';
import {
  hrCompletionSelector,
  selectUserIdSelected,
  setOnboardingDataUpdated,
  setOnboardingFormCompleted,
  setSelectedAction,
  setSelectedPropAction,
  hrDataSelector,
} from '@/redux/onboarding';
import {
  addRepAsync,
  requestDownlineAsync,
  requestRecruitProgressAsync,
  requestRepAsync,
  requestRepAsContactAsync,
  requestMyTreeUserContactAsync,
  updateManagerInterviewAsync,
  adminUpdateRepAsync,
  requestRecruitingSeasonAsync,
  updateRepByIdAsync,
  requestExperienceOptionsAsync,
  requestRepsWorkdayTasksAsync,
  updateRepsWorkdayTaskAsync,
  requestAttachmentsAsync,
  requestUserAsContactAsync,
  updateWorkdayIdAsync,
  requestRepStatusesAsync,
  requestApartmentStatusesAsync,
  requestSalesProgramsAsync,
} from './actions';
import { normalizeIncomingData } from '@/lib/normalize';
import { mapErrorToastsData } from '@/lib/api';
import { addToastsAction } from '@/redux/toasts';
import { requestPersonalContractsAsync } from '@/redux/contracts';
import { onboardingConstants } from '@/lib/constants';

function* requestUserAsContactSaga({ payload }) {
  const { cancelToken } = payload;
  yield put(setOnboardingDataUpdated(false));
  const response = yield call(
    Api.getUserAsContact,
    {},
    {
      withCredentials: false,
      ...(cancelToken && { cancelToken }),
    },
  );

  const modified = normalizeIncomingData(response?.data?.attributes);
  yield put(setSelectedAction(modified));
  yield put(setOnboardingDataUpdated(true));

  const userId = yield select(selectUserIdSelected);
  yield put(requestPersonalContractsAsync.request({ userId }));
}

function* requestRepAsContactSaga({ payload }) {
  const { userId, contactId, recruitingSeasonId, cancelToken } = payload;
  const url = contactId ? Api.getRepByContactId(contactId) : Api.getRepByUserId(userId);

  yield put(setOnboardingDataUpdated(false));
  const response = yield call(
    url,
    { recruitingSeasonId },
    {
      withCredentials: false,
      ...(cancelToken && { cancelToken }),
    },
  );

  const { onboarded } = response.data.attributes;

  // TODO: The id attribute was added to backward compatibility only. See TODO comment in src/lib/normalize/normalizeIncomingData.js
  const modified = normalizeIncomingData({ id: Number(response.data.id), ...response.data.attributes }, onboarded);
  yield put(setSelectedAction(modified));
  yield put(setOnboardingDataUpdated(true));
}

function* requestMyTreeUserContactSaga({ payload }) {
  const { userId, contactId, recruitingSeasonId } = payload;
  const url = contactId ? Api.getRepByContactId(contactId) : Api.getRepByUserId(userId);

  const response = yield call(
    url,
    { recruitingSeasonId },
    { withCredentials: false },
  );

  yield put(requestMyTreeUserContactAsync.success(response.data.attributes));
}

function* requestRepSaga({ payload }) {
  const { data } = yield call(
    Api.getRep(payload.id),
    {},
    { withCredentials: false },
  );

  yield put(requestRepAsync.success({
    recruit: {
      ...data?.attributes,
      id: data?.attributes?.recruit_id,
    },
  }));
}

function* requestDownlineSaga({ payload = {} }) {
  try {
    const response = yield call(
      Api.getDownline,
      { ...payload },
      { withCredentials: false },
    );

    yield put(requestDownlineAsync.success({
      // Everything besides `page` and `sort` keys is filters.
      hasFilters: isEmpty(omit(payload, ['page', 'sort'])) || payload?.search,
      count: response.meta.total,
      items: response.data,
    }));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* requestRecruitProgressSaga({ payload = {} }) {
  try {
    const response = yield call(
      Api.getRecruitProgress,
      { ...payload },
      { withCredentials: false },
    );

    yield put(requestRecruitProgressAsync.success({
      count: response.meta.total,
      items: response.data,
    }));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* updateManagerInterview({ payload }) {
  yield call(Api.updateManagerInterview, { ...payload }, { withCredentials: false });
}

function* addRepSaga({ payload }) {
  const { newLead, successCallback } = payload;
  const { data } = yield call(
    Api.addRep,
    { ...newLead },
    { withCredentials: false },
  );

  yield put(addRepAsync.success({ rep: data?.attributes }));
  yield call(successCallback, { rep: data?.attributes });
}

function* adminUpdateRepSaga({ payload }) {
  const { id } = payload;
  const { data } = yield call(
    Api.adminUpdateRep(id),
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestRepAsync.success({
    recruit: {
      ...data?.attributes,
      id: data?.attributes?.recruit_id,
    },
  }));
}

const createOnErrorHandler = (action) => (
  function* onError(errors, { action: { payload } = {} }) {
    yield put(action({ payload, response: { ...errors } }));
  }
);

function* requestRecruitingSeasonSaga() {
  const response = yield call(
    Api.getRecruitingSeason,
    {},
    { withCredentials: false },
  );

  yield put(requestRecruitingSeasonAsync.success(response.data.attributes));
}

function* updateRepByIdSaga({ payload }) {
  try {
    const { data, successCallback, cancelToken } = payload;
    yield put(setOnboardingDataUpdated(false));
    const result = yield call(
      Api.updateRepById,
      { ...data },
      {
        withCredentials: false,
        ...(cancelToken && { cancelToken }),
      },
    );

    const modified = normalizeIncomingData(result?.data?.attributes);

    yield put(setSelectedAction(modified));
    yield put(setOnboardingDataUpdated(true));
    successCallback();
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));
    throw error;
  }
}

function* requestRepsWorkdayTasksSaga({ payload }) {
  const { userId, recruitingSeasonId } = payload;

  const workdayTasks = yield call(
    userId
      ? Api.getWorkdayTasks({ userId })
      : Api.getWorkdayTasks(),
    {
      recruitingSeasonId
    },
    { withCredentials: false },
  );

  yield put(requestRepsWorkdayTasksAsync.success({
    userId: workdayTasks.data.attributes.user_id,
    receivedWorkdayTasks: workdayTasks,
  }));
}

function* updateRepsWorkdayTaskSaga({ payload }) {
  const { userId, tasks, recruitingSeasonId } = payload;

  const requestBody = {
    recruitingSeasonId: recruitingSeasonId
  };
  tasks.forEach((workdayTask) => {
    requestBody[workdayTask.taskName] = workdayTask.taskCompleted;
  });

  const workdayTasks = yield call(
    userId
      ? Api.updateWorkdayTasks({ userId })
      : Api.updateWorkdayTasks(),
    requestBody,
    { withCredentials: false },
  );

  const workdayTasksData = workdayTasks.data.attributes;
  yield put(setSelectedAction({
    workdayComplete:
      Boolean(
        workdayTasksData.is_profile_img_lock &&
        workdayTasksData.dd_completed &&
        workdayTasksData.bc_completed &&
        workdayTasksData.w9 &&
        workdayTasksData.i9_form
      ),
    w9Completed: Boolean(workdayTasksData.w9),
    i9Completed: Boolean(workdayTasksData.i9_form),
  }));

  const isHrCompleted = yield select(hrCompletionSelector);
  const hrData = yield select(hrDataSelector);
  yield put(setOnboardingFormCompleted({
    formId: onboardingConstants.HR_INFO_FORM_NAME,
    isCompleted: isHrCompleted,
  }));

  yield put(updateRepsWorkdayTaskAsync.success({
    userId: workdayTasks.data.attributes.user_id,
    receivedWorkdayTasks: workdayTasks,
    hrData,
  }));
}

function* requestExperienceOptionsSaga() {
  const response = yield call(
    Api.getExperienceOptions,
    {},
    { withCredentials: false },
  );

  yield put(requestExperienceOptionsAsync.success({
    items: response.data,
  }));
}
function* requestSalesProgramsSaga() {
  const response = yield call(
    Api.getSalesPrograms,
    {},
    { withCredentials: false },
  );

  yield put(requestSalesProgramsAsync.success({
    items: response.data,
  }));
}
function* requestApartmentStatusesSaga() {
  const response = yield call(
    Api.getApartmentStatuses,
    {},
    { withCredentials: false },
  );

  yield put(requestApartmentStatusesAsync.success({
    items: response.data,
  }));
}

function* requestAttachmentsSaga({ payload }) {
  const { userId, isPersonalWizard } = payload;
  const result = yield call(
    Api.getAttachments(isPersonalWizard || !userId ? null : { userId: userId }),
    {},
    { withCredentials: false },
  );

  yield put(requestAttachmentsAsync.success({ userId: userId, receivedAttachments: result.data }));
}

function* updateWorkdayId({ payload }) {
  try {
    const { userId, workdayId } = payload;

    yield call(
      Api.updateWorkdayId(userId),
      { workday_id: workdayId },
      { withCredentials: false },
    );
    yield put(setSelectedPropAction({ name: 'workdayId', value: workdayId }));
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));
    throw error;
  }
}
function* requestRepStatuses() {
  const response = yield call(
    Api.getRepStatuses,
    {},
    { withCredentials: false },
  );

  yield put(requestRepStatusesAsync.success({
    items: response.data,
  }));
}

export function* repsActionWatcher() {
  yield takeLatest(
    updateRepByIdAsync.request.type,
    createRequestSaga(updateRepByIdSaga, {
      keyNew: 'reps',
      errKey: 'reps',
      write: false,
    }),
  );
  yield takeLatest(
    requestDownlineAsync.request.type,
    createRequestSaga(requestDownlineSaga, {
      keyNew: 'downline',
      errKey: 'downline',
      write: false,
    }),
  );
  yield takeLatest(
    requestRepAsContactAsync.request.type,
    createRequestSaga(requestRepAsContactSaga, {
      keyNew: 'reps',
      errKey: 'reps',
      write: false,
    }),
  );
  yield takeLatest(
    requestUserAsContactAsync.request.type,
    createRequestSaga(requestUserAsContactSaga, {
      keyNew: 'userContact',
      errKey: 'userContact',
      write: false,
    }),
  );
  yield takeLatest(
    requestRepAsync.request.type,
    createRequestSaga(requestRepSaga, {
      keyNew: 'reps',
      errKey: 'reps',
      write: false,
    }),
  );
  yield takeLatest(
    requestRecruitProgressAsync.request.type,
    createRequestSaga(requestRecruitProgressSaga, {
      keyNew: 'recruitProgress',
      errKey: 'recruitProgress',
      write: false,
    }),
  );
  yield takeLatest(
    updateManagerInterviewAsync.request.type,
    createRequestSaga(updateManagerInterview, {
      keyNew: 'reps',
      errKey: 'reps',
      write: false,
    }),
  );
  yield takeLatest(
    addRepAsync.request.type,
    createRequestSaga(addRepSaga, {
      keyNew: 'reps',
      errKey: 'reps',
      write: true,
    }),
  );
  yield takeLatest(
    adminUpdateRepAsync.request.type,
    createRequestSaga(adminUpdateRepSaga, {
      keyNew: 'reps',
      errKey: 'updateRep',
      write: false,
    }),
  );
  yield takeLatest(
    requestRecruitingSeasonAsync.request.type,
    createRequestSaga(requestRecruitingSeasonSaga, {
      keyNew: 'recruitingSeason',
      errKey: 'recruitingSeason',
      write: false,
    }),
  );
  yield takeLatest(
    requestExperienceOptionsAsync.request.type,
    createRequestSaga(requestExperienceOptionsSaga, {
      keyNew: 'experienceOptions',
      errKey: 'experienceOptions',
      write: false,
    }),
  );
  yield takeLatest(
    requestSalesProgramsAsync.request.type,
    createRequestSaga(requestSalesProgramsSaga, {
      keyNew: 'salesPrograms',
      errKey: 'salesPrograms',
      write: false,
    }),
  );
  yield takeLatest(
    requestApartmentStatusesAsync.request.type,
    createRequestSaga(requestApartmentStatusesSaga, {
      keyNew: 'apartmentStatuses',
      errKey: 'apartmentStatuses',
      write: false,
    }),
  );
  yield takeLatest(
    requestAttachmentsAsync.request.type,
    createRequestSaga(requestAttachmentsSaga, {
      keyNew: 'attachments',
      errKey: 'attachments',
      write: false,
      onError: createOnErrorHandler(requestAttachmentsAsync.failure),
    }),
  );
  yield takeLatest(
    requestRepsWorkdayTasksAsync.request.type,
    createRequestSaga(requestRepsWorkdayTasksSaga, {
      keyNew: 'repsWorkdayTasks',
      errKey: 'repsWorkdayTasks',
      write: false,
    }),
  );
  yield takeLatest(
    updateRepsWorkdayTaskAsync.request.type,
    createRequestSaga(updateRepsWorkdayTaskSaga, {
      keyNew: 'repsWorkdayTasks',
      errKey: 'repsWorkdayTasks',
      write: false,
      onError: createOnErrorHandler(updateRepsWorkdayTaskAsync.failure),
    }),
  );
  yield takeLatest(
    updateWorkdayIdAsync.request.type,
    createRequestSaga(updateWorkdayId, {
      keyNew: 'workdayId',
      errKey: 'workdayId',
      write: false,
    }),
  );
  yield takeLatest(
    requestRepStatusesAsync.request.type,
    createRequestSaga(requestRepStatuses, {
      keyNew: 'repStatuses',
      errKey: 'repStatuses',
      write: false,
    }),
  );
  yield takeLatest(
    requestMyTreeUserContactAsync.request.type,
    createRequestSaga(requestMyTreeUserContactSaga, {
      keyNew: 'myTreeContact',
      errKey: 'myTreeContact',
      write: false,
    }),
  );
}
