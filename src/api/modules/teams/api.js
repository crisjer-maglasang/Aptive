import * as Api from '../../api';

const api = process.env.REACT_APP_SPT_API;

export const getRepsList = (teamId) => Api.get({ path: `/api/v1/teams/${teamId}/reps`, api });

export const getTeam = (team) => Api.get({ path: `/api/v2/teams${team ? `/${team}` : ''}`, api });

export const getTeams = Api.get({ path: '/api/v2/teams', api });

export const getTeamCells = (team) => Api.get({ path: `/api/v1/teams/${team}/cells`, api });

export const getTeamPins = (team) => Api.post({ path: `/api/v1/teams/${team}/pins`, api });

export const getTeamsList = Api.get({ path: '/api/v1/teams/list', api });

export const getTeamsStatistics = (team) => Api.get({ path: `/api/v1/teams/${team}/statistics`, api });

export const assignTeamZips = (team) => Api.patch({ path: `/api/v1/teams/${team}/assign-zips`, api });

export const unassignTeamZips = (team) => Api.patch({ path: `/api/v1/teams/${team}/unassign-zips`, api });
