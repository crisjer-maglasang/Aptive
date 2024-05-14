import { createSelector } from 'reselect';

import { campaignChannelsSelector } from '@/modules/AdminTools/redux/promoCode/campaigns';
import Select from '@/modules/AdminTools/components/Form/Select';

const toOptions = (arr) =>
  arr.map((campaignChannel) => ({
    label: campaignChannel,
    value: campaignChannel,
  }));

const campaignChannelsOptionsSelector = createSelector(
  campaignChannelsSelector,
  (state) => toOptions(state)
);

const ChannelsSelect = () => {
  return (
    <Select
      isMulti
      label="Accepted Channels"
      name="accepted_channels"
      selector={campaignChannelsOptionsSelector}
      error="campaignsUpdate"
      required
    />
  );
};

export default ChannelsSelect;
