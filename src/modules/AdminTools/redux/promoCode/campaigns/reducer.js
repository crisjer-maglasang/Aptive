import { createReducer } from '@/redux/root';
import {
  campaignNameSpace,
  requestCampaignsAsync,
  updateCampaignAsync,
  createCampaignAsync,
  removeCampaignAsync,
  requestCampaignChannelsAsync,
} from './';
import { NAME } from './selectors';
import { formatDate } from '@/lib/utils';

const toOptions = (arr) =>
  arr.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

const Campaigns = (newCampaigns) => {
  const campaignsMap = new Map();
  const campaigns = newCampaigns.map((campaign) => {
    const newCampaign = {
      ...campaign,
      start_on: formatDate(campaign.start_on) ?? null,
      end_on: formatDate(campaign.end_on) ?? null,
    };

    campaignsMap.set(newCampaign.id, newCampaign);

    return newCampaign;
  });

  return {
    get: (id) => campaignsMap.get(+id),
    campaigns,
    options: toOptions(campaigns),
    create: (campaign) => Campaigns([...campaigns, campaign]),
    remove: (campaignId) =>
      Campaigns(campaigns.filter(({ id }) => id !== campaignId)),
    update: (campaign) =>
      Campaigns(campaigns.map((cc) => (cc.id == campaign.id ? campaign : cc))),
  };
};

const campaignsInitialState = {
  campaigns: Campaigns([]),
  channels: [],
};

export const campaignsReducer = {
  [NAME]: createReducer(campaignNameSpace, campaignsInitialState, {
    [requestCampaignsAsync.success]: ({ state, action: { payload } }) => {
      state.campaigns = Campaigns(payload);
    },

    [requestCampaignChannelsAsync.success]: ({
      state,
      action: { payload },
    }) => {
      state.channels = payload;
    },

    [updateCampaignAsync.success]: ({ state, action: { payload } }) => {
      state.campaigns = state.campaigns.update(payload);
    },

    [createCampaignAsync.success]: ({ state, action: { payload } }) => {
      state.campaigns = state.campaigns.create(payload);
    },

    [removeCampaignAsync.success]: ({ state, action: { payload } }) => {
      state.campaigns = state.campaigns.remove(payload);
    },
  }),
};
