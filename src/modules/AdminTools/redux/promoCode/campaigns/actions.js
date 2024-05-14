import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const campaignNameSpace = `${nameSpace}/campaign`;

export const requestCampaignsAsync = createAsyncAction(
  `${campaignNameSpace}/REQUEST_CAMPAIGNS`
);

export const requestCampaignChannelsAsync = createAsyncAction(
  `${campaignNameSpace}/REQUEST_CAMPAIGN_CHANNELS`
);

export const removeCampaignAsync = createAsyncAction(
  `${campaignNameSpace}/REMOVE_CAMPAIGN`
);

export const updateCampaignAsync = createAsyncAction(
  `${campaignNameSpace}/UPDATE_CAMPAIGN`
);

export const createCampaignAsync = createAsyncAction(
  `${campaignNameSpace}/CREATE_CAMPAIGN`
);
