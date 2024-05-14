import PropTypes from 'prop-types';

import Switch from '@/modules/AdminTools/components/Switch';

const DisableButton = ({ data, onDisableClick }) => {
  const enabled = !data.disabled_at;

  return (
    <Switch
      onClick={() => onDisableClick(data)}
      enabled={enabled}
      onChange={() => {}}
    />
  );
};

DisableButton.propTypes = {
  onDisableClick: PropTypes.func,
  data: PropTypes.shape({
    disabled_at: PropTypes.string,
  }),
};

export default DisableButton;
