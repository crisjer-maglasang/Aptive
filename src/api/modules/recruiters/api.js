import * as Api from '../../api';

const api = process.env.REACT_APP_ONB_API;

export const getRecruiters = Api.get({ path: '/api/v1/recruiters', api });

export const getRecruiterManagers = (recruiterId) => Api.get({ path: `/api/v1/recruiters/${recruiterId}/managers`, api });

export const getRecruitingOffices = Api.get({ path: '/api/v1/recruiters/offices', api });
