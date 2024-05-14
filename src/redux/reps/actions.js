import { createAction, createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/reps-new';

export const addRepAsync = createAsyncAction(`${nameSpace}/ADD_REP`);

export const requestDownlineAsync = createAsyncAction(`${nameSpace}/REQUEST_DOWNLINE`);

export const requestRepAsync = createAsyncAction(`${nameSpace}/REQUEST_REP`);

export const requestRepAsContactAsync = createAsyncAction(`${nameSpace}/REQUEST_REP_AS_CONTACT`);

export const requestUserAsContactAsync = createAsyncAction(`${nameSpace}/REQUEST_USER_AS_CONTACT`);

export const requestRecruitProgressAsync = createAsyncAction(`${nameSpace}/REQUEST_RECRUIT_PROGRESS`);

export const updateManagerInterviewAsync = createAsyncAction(`${nameSpace}/UPDATE_MANAGER_INTERVIEW`);

export const setManagerInterviewAction = createAction(`${nameSpace}/SET_MANAGER_INTERVIEW_UPDATED`);

export const adminUpdateRepAsync = createAsyncAction(`${nameSpace}/ADMIN_UPDATE_REP`);

export const requestRecruitingSeasonAsync = createAsyncAction(`${nameSpace}/REQUEST_RECRUITING_SEASON`);

export const updateRepByIdAsync = createAsyncAction(`${nameSpace}/UPDATE_REP_BY_ID`);

export const requestExperienceOptionsAsync = createAsyncAction(`${nameSpace}/REQUEST_EXPERIENCE_OPTIONS`);

export const requestSalesProgramsAsync = createAsyncAction(`${nameSpace}/REQUEST_SALES_PROGRAMS`);

export const requestApartmentStatusesAsync = createAsyncAction(`${nameSpace}/REQUEST_APARTMENT_STATUSES`);

export const requestAttachmentsAsync = createAsyncAction(`${nameSpace}/REQUEST_ATTACHMENTS`);

export const requestRepsWorkdayTasksAsync = createAsyncAction(`${nameSpace}/REQUEST_REPS_WORKDAY_TASKS`);

export const updateRepsWorkdayTaskAsync = createAsyncAction(`${nameSpace}/UPDATE_REPS_WORKDAY_TASK`);

export const updateWorkdayIdAsync = createAsyncAction(`${nameSpace}/UPDATE_WORKDAY_ID`);

export const requestRepStatusesAsync = createAsyncAction(`${nameSpace}/REQUEST_REP_STATUSES`);

export const clearWorkdayTasksErrorsAction = createAction(`${nameSpace}/CLEAR_WORKDAY_TASKS_ERRORS`);

export const requestMyTreeUserContactAsync = createAsyncAction(`${nameSpace}/REQUEST_MY_TREE_USER_CONTACT`);
