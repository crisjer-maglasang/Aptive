import { createAsyncAction } from '@/redux/root';

export const nameSpace = '@@/recruiters';

export const requestRecruitersAsync = createAsyncAction(`${nameSpace}/REQUEST_RECRUITERS`);

export const requestRecruiterManagersAsync = createAsyncAction(`${nameSpace}/REQUEST_RECRUITER_MANAGERS`);

export const requestRecruitingOfficesAsync = createAsyncAction(`${nameSpace}/REQUEST_RECRUITING_OFFICES`);
