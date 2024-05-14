import { createReducer } from '@/redux/root';

import { nameSpace, setLoadingAction } from './actions';

// TODO: do we actually need this?
const initialState = {
  login: {
    isLoading: false,
  },
  authUser: {
    isLoading: false,
  },
  reps: {
    isLoading: false,
  },
  submitRepProfile: {
    isLoading: false,
  },
  recruitProgress: {
    isLoading: false,
  },
  downline: {
    isLoading: false,
  },
  states: {
    isLoading: false,
  },
  auth: {
    isLoading: false,
  },
  profilePic: {
    isLoading: false,
  },
  passportPic: {
    isLoading: false,
  },
  driverLicensePic: {
    isLoading: false,
  },
  ssCardPic: {
    isLoading: false,
  },
  signaturePic: {
    isLoading: false,
  },
  contractsLink: {
    isLoading: false,
  },
  recruitProgressStats: {
    isLoading: false,
  },
  repsContracts: {
    isLoading: false,
  },
  availableContracts: {
    isLoading: false,
  },
  contracts: {
    isLoading: false,
  },
  contractStats: {
    isLoading: false,
  },
  saveContract: {
    isLoading: false,
  },
  forgotPassword: {
    isLoading: false,
  },
  resetPassword: {
    isLoading: false,
  },
  userContracts: {
    isLoading: false,
  },
  userContact: {
    isLoading: false,
  },
  repsWorkdayTasks: {
    isLoading: false,
  },
  soReps: {
    isLoading: false,
  },
  soStats: {
    isLoading: false,
  },
  soTeams: {
    isLoading: false,
  },
  soExport: {
    isLoading: false,
  },
  soSeasons: {
    isLoading: false,
  },
  deleteContract: {
    isLoading: false,
  },
  user: {
    isLoading: false,
  },
  oneTimeToken: {
    isLoading: false,
  },
  repEditHistory: {
    isLoading: false,
  },
  approval: {
    isLoading: false,
  },
  approvalItems: {
    isLoading: false,
  },
  recruiters: {
    isLoading: false,
  },
  recruiterManagers: {
    isLoading: false,
  },
  regionals: {
    isLoading: false,
  },
  notifications: {
    isLoading: false,
  },
  teamCells: {
    isLoading: false,
  },
  teamPins: {
    isLoading: false,
  },
  updateStatus: {
    isLoading: false,
  },
  plan: {
    isLoading: false,
  },
  updatePlan: {
    isLoading: false,
  },
  workdayId: {
    isLoading: false,
  },
  documentSignLink: {
    isLoading: false,
  },
};

export const loadingReducer = createReducer(nameSpace, initialState, {
  [setLoadingAction]: ({ state, action }) => {
    const { keyNew, value } = action.payload;

    state[keyNew] = {
      ...state[keyNew],
      isLoading: value,
    };
  },
});
