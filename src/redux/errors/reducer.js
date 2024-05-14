import { createReducer } from '@/redux/root';

import {
  nameSpace,
  addErrorAction,
  removeAllErrorsAction,
} from './actions';

const initialState = {
  errors: {
    login: null,
    auth: null,
    states: null,
    upload: null,
    contracts: null,
    reps: null,
    addRep: null,
    recruiters: null,
    profilePic: null,
    passportPic: null,
    driverLicensePic: null,
    ssCardPic: null,
    signaturePic: null,
    contractsLink: null,
    saveContract: null,
    forgotPassword: null,
    resetPassword: null,
    polygonPreview: null,
    teamClusters: null,
    polygonDispositions: null,
  },
};

export const errorsReducer = createReducer(nameSpace, initialState, {
  [addErrorAction]: ({ state, action }) => {
    const { errKey, error } = action.payload;

    state.errors[errKey] = error;
  },

  [removeAllErrorsAction]: ({ state }) => {
    state.errors = initialState.errors;
  },
});
