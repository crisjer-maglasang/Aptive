import * as Api from '@/api/api';

const api = process.env.REACT_APP_ONB_API;

export const getArchivedLeads = Api.get({ path: '/api/v1/users/archived-leads', api });

export const restoreLead = (leadId) => Api.post({ path: `/api/v1/users/restore-lead/${leadId}`, api });
