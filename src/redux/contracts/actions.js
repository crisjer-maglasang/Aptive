import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/contracts';

export const requestContractLinkAsync = createAsyncAction(`${nameSpace}/FETCH_CONTRACT_LINK`);

export const requestRepContractsAsync = createAsyncAction(`${nameSpace}/FETCH_REPS_CONTRACTS`);

export const requestPersonalContractsAsync = createAsyncAction(`${nameSpace}/FETCH_PERSONAL_CONTRACTS_CONTRACTS`);

export const requestAvailableContractsAsync = createAsyncAction(`${nameSpace}/FETCH_AVAILABLE_CONTRACTS`);

export const saveAndSendContractAsync = createAsyncAction(`${nameSpace}/SAVE_AND_SEND_CONTRACT`);

export const requestContractStatsAsync = createAsyncAction(`${nameSpace}/FETCH_CONTRACTS_STATS`);

export const requestRecruitProgressStatsAsync = createAsyncAction(`${nameSpace}/FETCH_RECRUIT_PROGRESS_STATS`);

export const deleteContractAsync = createAsyncAction(`${nameSpace}/DELETE_CONTRACT`);

export const hideContractAsync = createAsyncAction(`${nameSpace}/HIDE_CONTRACT`);

export const revealContractAsync = createAsyncAction(`${nameSpace}/REVEAL_CONTRACT`);

export const setHiddenRevealedAction = createAction(`${nameSpace}/SET_HIDDEN_REVEALED`);

export const requestDocumentSignLinkAsync = createAsyncAction(`${nameSpace}/REQUEST_DOCUMENT_SIGN_LINK`);

export const requestDocumentViewLinkAsync = createAsyncAction(`${nameSpace}/REQUEST_DOCUMENT_VIEW_LINK`);

export const requestDocumentAsync = createAsyncAction(`${nameSpace}/REQUEST_DOCUMENT`);
