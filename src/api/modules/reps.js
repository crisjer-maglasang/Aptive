import { removeTrailingSlashes } from '@/lib/utils';
import * as Api from '../api';
import {
  GetRepEditHistoryEndpoint,
  SubmitRepProfileEndpoint,
} from '../endpoints';

const api = process.env.REACT_APP_ONB_API;

export const getUserAsContact = Api.get({ path: '/api/v1/reps/rep-contact', api });

export const addRep = Api.post({ path: '/api/v1/reps/create', api });

export const getDownline = Api.get({ path: '/api/v1/reps/downline', api });

export const getRep = (id) => Api.get({ path: `/api/v1/reps/rep/${id}`, api });

export const getRepByUserId = (id) => Api.get({ path: `/api/v1/reps/rep-contact-by-user-id/${id}`, api });

export const getRepByContactId = (id) => Api.get({ path: `/api/v1/reps/rep-contact/${id}`, api });

export const updateRep = Api.patch({ path: '/api/v1/reps/updateUser', api });

export const updateRepById = Api.patch({ path: '/api/v1/reps/updateUserById', api });

export const submitRepProfile = Api.createEndpoint(SubmitRepProfileEndpoint);

export const getRecruitProgress = Api.get({ path: '/api/v1/reps/recruits', api });

export const updateManagerInterview = Api.patch({ path: '/api/v1/reps/interview', api });

export const adminUpdateRep = (id) => Api.patch({ path: `/api/v1/reps/update/${id}`, api });

export const getRecruitingSeason = Api.get({ path: '/api/v1/reps/recruiting-season', api });

export const getExperienceOptions = Api.get({ path: '/api/v1/reps/experience-options', api });

export const getSalesPrograms = Api.get({ path: '/api/v1/reps/sales-programs', api });

export const getApartmentStatuses = Api.get({ path: '/api/v1/reps/apartment-statuses', api });

export const getAttachments = (rep) => Api.get({ path: removeTrailingSlashes(`/api/v1/files/attachments/${rep?.userId ?? ''}`), api });

export const getWorkdayTasks = (rep) => Api.get({ path: removeTrailingSlashes(`/api/v1/reps/workday-tasks/${rep?.userId ?? ''}`), api });

export const updateWorkdayTasks = (rep) => Api.patch({ path: removeTrailingSlashes(`/api/v1/reps/workday-tasks/${rep?.userId ?? ''}`), api });

export const getRepEditHistory = Api.createEndpoint(GetRepEditHistoryEndpoint);

export const getRepsForApproval = Api.get({ path: '/api/v1/reps/approval', api });

export const getRegionals = Api.get({ path: '/api/v1/reps/regionals', api });

export const getRepStatuses = Api.get({ path: '/api/v1/reps/rep-statuses', api });

export const getApprovalItems = (userId) => Api.get({ path: `/api/v1/reps/approval-items/${userId}`, api });

export const updateApprovalItems = (userId) => Api.patch({ path: `/api/v1/reps/approval-items/${userId}`, api });

export const updateWorkdayId = (userId) => Api.post({ path: `/api/v1/reps/workday-id/${userId}`, api });

export const getAdminView = (userId) => Api.get({ path: `/api/v1/reps/admin-view/${userId}`, api });
