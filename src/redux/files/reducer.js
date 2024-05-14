import { createReducer } from '@/redux/root';

import { logoutAction } from '../auth';

import {
  nameSpace,
  uploadProfilePicAsync,
  uploadPassportAsync,
  uploadDriverLicenseAsync,
  uploadSsCardAsync,
  uploadSignatureAsync,
  resetFilesAction,
} from './actions';

const initialState = {
  files: {
    receivedProfilePic: '',
    receivedPassportPic: '',
    receivedDriverLicensePic: '',
    receivedSsCardPic: '',
    receivedSignaturePic: ''
  },
};

export const filesReducer = createReducer(nameSpace, initialState, {
  [resetFilesAction]: ({ state }) => {
    state.files = initialState.files;
  },

  [uploadProfilePicAsync.success]: ({ state, action }) => {
    state.files.receivedProfilePic = action.payload;
  },

  [uploadPassportAsync.success]: ({ state, action }) => {
    state.files.receivedPassportPic = action.payload;
  },

  [uploadDriverLicenseAsync.success]: ({ state, action }) => {
    state.files.receivedDriverLicensePic = action.payload;
  },

  [uploadSsCardAsync.success]: ({ state, action }) => {
    state.files.receivedSsCardPic = action.payload;
  },

  [uploadSignatureAsync.success]: ({ state, action }) => {
    state.files.receivedSignaturePic = action.payload;
  },

  [logoutAction]: ({ state }) => {
    state.files = initialState.files;
  },
});
