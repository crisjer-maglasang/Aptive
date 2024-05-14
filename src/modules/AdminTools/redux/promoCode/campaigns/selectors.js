import { createSelector } from 'reselect';

export const NAME = 'campaigns';

export const campaignsSelector = createSelector(
  (state) => state[NAME],
  (campaigns) => campaigns.campaigns.campaigns,
);

export const campaignOptionsSelector = createSelector(
  (state) => state[NAME],
  (campaigns) => campaigns.campaigns.options,
);

export const campaignChannelsSelector = createSelector(
  (state) => state[NAME],
  (campaigns) => campaigns.channels,
);
