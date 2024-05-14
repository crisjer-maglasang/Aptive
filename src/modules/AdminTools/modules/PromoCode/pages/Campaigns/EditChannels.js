import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components/common';
import { campaignChannelsSelector } from '@/modules/AdminTools/redux/promoCode/campaigns';

const EditChannels = ({ value, name, onChange, error }) => {
  const channels = useSelector(campaignChannelsSelector);

  const options = useMemo(() => {
    if (!channels) {
      return [];
    }

    return channels.map((channel) => ({
      label: channel,
      value: channel,
    }));
  }, [channels]);

  return (
    <CustomFormElement
      {...{
        onChange,
        value,
        options,
        name,
        error,
      }}
      type="multiSelect"
      isMulti
      closeMenuOnSelect={false}
      required
    />
  );
};

EditChannels.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.any,
};

export default EditChannels;
