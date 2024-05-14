import * as Api from '../../api';
import { removeTrailingSlashes } from '@/lib/utils';

const api = process.env.REACT_APP_ONB_API;

export const getContractLink = Api.get({ path: '/api/v1/contracts/link', api });

export const getContractStats = Api.get({ path: '/api/v1/contracts/stats', api });

export const getRecruitProgressStats = Api.get({ path: '/api/v1/contracts/recruit-progress-stats', api });

export const getRepContracts = Api.get({ path: '/api/v1/contracts/listrep', api });

export const getPersonalContracts = Api.get({ path: '/api/v1/contracts', api });

export const getAvailableContracts = Api.get({ path: '/api/v1/contracts/available', api });

export const saveAndSendContract = Api.post({ path: '/api/v1/contracts/saveAndSend', api });

export const deleteContract = (contractId) => Api.remove({ path: `/api/v1/contracts/${contractId}`, api });

export const hideContract = (contractId) => Api.post({ path: `/api/v1/contracts/${contractId}/hide`, api });

export const revealContract = (contractId) => Api.post({ path: `/api/v1/contracts/${contractId}/reveal`, api });

export const getDocumentSignLink = Api.get({ path: '/api/v1/contracts/document-sign-link', api });

export const getDocumentViewLink = (userId) => Api.get({ path: removeTrailingSlashes(`/api/v1/contracts/document-view-link/${userId ?? ''}`), api });

export const getDocument = (userId) => Api.get({ path: removeTrailingSlashes(`/api/v1/contracts/document/${userId ?? ''}`), api });
