import { createReducer } from '@/redux/root';

import { logoutAction } from '../auth';

import {
  nameSpace,
  requestRepContractsAsync,
  requestAvailableContractsAsync,
  saveAndSendContractAsync,
  requestContractStatsAsync,
  requestRecruitProgressStatsAsync,
  setHiddenRevealedAction,
  requestDocumentAsync,
  requestPersonalContractsAsync,
} from './actions';
import { s2ab } from '@/lib/utils';
import { saveAs } from 'file-saver';

const initialState = {
  counts: {
    recruits: null,
    sent: null,
    signed: null,
    admin: null,
    regional: null,
  },
};

const contractsPerYearReducer = ({ state, action }) => {
  const { id, items } = action.payload;

  const contractsPerYears = {};

  items.forEach((contract) => {
    const { year, id } = contract;

    if (!(year in contractsPerYears)) {
      contractsPerYears[year] = [];
    }

    contractsPerYears[year].push(contract);
  });

  state[id] = {
    ...state[id],
    contractsPerYears,
    loaded: true,
  };
}

export const contractsReducer = createReducer(nameSpace, initialState, {
  [requestRepContractsAsync.success]: contractsPerYearReducer,

  [requestPersonalContractsAsync.success]: contractsPerYearReducer,

  [requestAvailableContractsAsync.success]: ({ state, action }) => {
    const { recruitId, templates } = action.payload;

    state[recruitId] = {
      ...state[recruitId],
      available: templates.map((contract) => ({
        ...contract.attributes,
        type: contract.attributes.template_type,
        id: contract.id,
      })),
    };
  },

  [saveAndSendContractAsync.success]: ({ state, action }) => {
    const { contract, id } = action.payload;

    if (!(contract.year in state[id].contractsPerYears)) {
      state[id].contractsPerYears[contract.year] = [];
    }

    state[id].contractsPerYears[contract.year].push(contract);
  },

  [requestContractStatsAsync.success]: ({ state, action }) => {
    state.counts = {
      ...state.counts,
      ...action.payload,
    };
  },

  [requestRecruitProgressStatsAsync.success]: ({ state, action }) => {
    state.counts.recruits = {
      ...action.payload,
    };
  },

  [setHiddenRevealedAction]: ({ state, action }) => {
    const { selectedUser, contractYear, contractId, userId } = action.payload;

    const updatedContracts = state[selectedUser].contractsPerYears[contractYear]
      .map((contract) => (contract.id === contractId
        ? { ...contract, hiddenBy: userId ?? null }
        : { ...contract }));

    state[selectedUser].contractsPerYears[contractYear] = updatedContracts;
  },

  [requestDocumentAsync.success]: ({ action: { payload } }) => {
    const { data } = payload;
    const blob = new Blob([s2ab(atob(data?.attributes?.file))], {type: ''})
    saveAs(blob, data?.attributes?.file_name)
  },

  [logoutAction]: ({ state }) => {
    state.counts = initialState.counts;
  },
});
