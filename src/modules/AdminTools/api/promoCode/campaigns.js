import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/promo-code/campaigns';

export const getCampaigns = Api.get({ path, api });

export const getCampaign = (id) => Api.get({ path: `${path}/${id}`, api });

export const getCampaignChannels = Api.get({ path: `${path}/channels`, api });

export const updateCampaign = (id) => Api.patch({ path: `${path}/${id}`, api });

export const removeCampaign = (id) =>
  Api.remove({ path: `${path}/${id}`, api });

export const createCampaign = Api.post({ path, api });
