import * as Api from '../api';

const api = process.env.REACT_APP_ONB_API;

export const getSoStats = Api.get({ path: '/api/v1/reps/stats', api });

export const getSoReps = Api.get({ path: '/api/v1/reps/sales', api });

export const getSoTeams = Api.get({ path: '/api/v1/reps/teams', api });

export const exportSoReps = Api.get({ path: '/api/v1/reps/export', api });

export const getSoSeasons = Api.get({ path: '/api/v1/reps/seasons', api });

export const updateRepsStatus = Api.post({ path: '/api/v1/reps/update-status', api });
