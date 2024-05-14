import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';

import Api from '../../api';

import {
  uploadProfilePicAsync,
  uploadPassportAsync,
  uploadDriverLicenseAsync,
  uploadSsCardAsync,
  uploadSignatureAsync,
} from './actions';

import { setSelectedPropAction } from '@/redux/onboarding';
import { prepareFileForRequest, prepareSignatureImageForRequest } from '@/lib/utils/files';

function* uploadProfilePictureSaga({ payload }) {
  const { user_id, file } = payload;
  const formData = prepareFileForRequest(file, 'profile_picture');
  const api = Api.uploadProfilePicture(user_id);

  const { data } = yield call(api, formData, {
    withCredentials: false,
  });

  yield put(uploadProfilePicAsync.success(data.attributes.name));
  yield put(setSelectedPropAction({ name: 'profilePicture', value: data.attributes.name }));
  yield put(setSelectedPropAction({ name: 'profilePictureLocalFile', value: data.attributes.url }));

  if (!payload?.user_id) {
    yield put(setSelectedPropAction({ name: 'approved', value: false }));
    yield put(setSelectedPropAction({ name: 'submitted', value: false }));
  }
}

function* uploadPassportSaga({ payload }) {
  const { user_id, file } = payload;
  const formData = prepareFileForRequest(file, 'passport_picture');
  const api = Api.uploadPassport(user_id);

  const { data } = yield call(api, formData, {
    withCredentials: false,
  });

  yield put(uploadPassportAsync.success(data.attributes.name));
  yield put(setSelectedPropAction({ name: 'passportPicture', value: data.attributes.name }));
  yield put(setSelectedPropAction({ name: 'passportPictureLocalFile', value: data.attributes.url }));

  if (!user_id) {
    yield put(setSelectedPropAction({ name: 'approved', value: false }));
    yield put(setSelectedPropAction({ name: 'submitted', value: false }));
  }
}

function* uploadDriverLicenseSaga({ payload }) {
  const { user_id, file } = payload;
  const formData = prepareFileForRequest(file, 'driver_licence_picture');
  const api = Api.uploadDriverLicense(user_id);

  const { data } = yield call(api, formData, {
    withCredentials: false,
  });

  yield put(uploadDriverLicenseAsync.success(data.attributes.name));
  yield put(setSelectedPropAction({ name: 'driverLicense', value: data.attributes.name }));
  yield put(setSelectedPropAction({ name: 'driverLicenseLocalFile', value: data.attributes.url }));

  if (!user_id) {
    yield put(setSelectedPropAction({ name: 'approved', value: false }));
    yield put(setSelectedPropAction({ name: 'submitted', value: false }));
  }
}

function* uploadSsCardSaga({ payload }) {
  const { user_id, file } = payload;
  const formData = prepareFileForRequest(file, 'social_security_card_picture');
  const api = Api.uploadSocialSecurity(user_id);

  const { data } = yield call(api, formData, {
    withCredentials: false,
  });

  yield put(uploadSsCardAsync.success(data.attributes.name));
  yield put(setSelectedPropAction({ name: 'socialSecurityCard', value: data.attributes.name }));
  yield put(setSelectedPropAction({ name: 'socialSecurityPictureLocalFile', value: data.attributes.url }));

  if (!user_id) {
    yield put(setSelectedPropAction({ name: 'approved', value: false }));
    yield put(setSelectedPropAction({ name: 'submitted', value: false }));
  }
}

function* uploadSignatureSaga({ payload }) {
  const { user_id, file, successCallback } = payload;
  const formData = prepareSignatureImageForRequest(file);
  const api = Api.uploadSignature(user_id);

  const { data } = yield call(api, formData, {
    withCredentials: false,
  });

  yield put(uploadSignatureAsync.success(data.attributes.name));
  yield put(setSelectedPropAction({ name: 'signature', value: data.attributes.name }));
  yield put(setSelectedPropAction({ name: 'signatureLocalFile', value: data.attributes.url }));

  if (successCallback) {
    yield call(successCallback);
  }
}

export function* filesActionWatcher() {
  yield takeLatest(
    uploadProfilePicAsync.request.type,
    createRequestSaga(uploadProfilePictureSaga, {
      keyNew: 'profilePic',
      errKey: 'profilePic',
      write: true,
    })
  );

  yield takeLatest(
    uploadPassportAsync.request.type,
    createRequestSaga(uploadPassportSaga, {
      keyNew: 'passportPic',
      errKey: 'passportPic',
      write: true,
    })
  );

  yield takeLatest(
    uploadDriverLicenseAsync.request.type,
    createRequestSaga(uploadDriverLicenseSaga, {
      keyNew: 'driverLicensePic',
      errKey: 'driverLicensePic',
      write: true,
    })
  );

  yield takeLatest(
    uploadSsCardAsync.request.type,
    createRequestSaga(uploadSsCardSaga, {
      keyNew: 'ssCardPic',
      errKey: 'ssCardPic',
      write: true,
    })
  );

  yield takeLatest(
    uploadSignatureAsync.request.type,
    createRequestSaga(uploadSignatureSaga, {
      keyNew: 'signaturePic',
      errKey: 'signaturePic',
      write: true,
    })
  );
}
