import { createSelector } from 'reselect';

import {
  campaignChannelsSelector,
  campaignsSelector,
} from '@/modules/AdminTools/redux/promoCode/campaigns';
import Select from '@/modules/AdminTools/components/Form/Select';
import { useSelector } from 'react-redux';
import { promotionsSelector } from '@/modules/AdminTools/redux/promoCode/promotions';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

const toOptions = (arr) =>
  arr.map((campaignChannel) => ({
    label: campaignChannel,
    value: campaignChannel,
  }));

const ChannelsSelect = () => {
  const campaigns = useSelector(campaignsSelector);
  const promotions = useSelector(promotionsSelector);
  const promotionId = useWatch({ name: 'promotion_id' });
  const channel = useWatch({ name: 'channel' });
  const { setValue } = useFormContext();
  const promotion = useMemo(
    () => promotions?.find(({ id }) => id == promotionId),
    [promotionId, promotions]
  );
  const campaignId = useMemo(() => promotion?.campaign_id, [promotion]);
  const campaign = useMemo(
    () => campaigns?.find(({ id }) => id == campaignId),
    [campaignId, campaigns]
  );
  const campaignChannels = useMemo(
    () => campaign?.accepted_channels,
    [campaign]
  );

  const campaignChannelsOptionsSelector = useMemo(
    () =>
      createSelector(campaignChannelsSelector, (state) => {
        return campaignChannels
          ? toOptions(campaignChannels)
          : toOptions(state);
      }),
    [campaignChannels]
  );

  useEffect(() => {
    if (campaignChannels && channel) {
      if (!campaignChannels.includes(channel)) {
        setValue('channel', campaignChannels[0]);
      }
    }
  }, [campaignChannels, channel, setValue]);

  return (
    <Select
      label="Channels"
      name="channel"
      selector={campaignChannelsOptionsSelector}
      error="promotionUsagesUpdate"
      required
    />
  );
};

export default ChannelsSelect;
