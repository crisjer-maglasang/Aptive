import PropTypes from 'prop-types';
import { settingsOptionsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import Select from '@/modules/AdminTools/components/Form/Select';

const SettingSelect = ({ isMulti, name, label, optionName }) => {
  return (
    <Select
      {...{ isMulti, name, label }}
      selector={settingsOptionsSelector(optionName)}
      error="updatePlan"
      required
    />
  );
};

SettingSelect.propTypes = {
  isMulti: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  optionName: PropTypes.string.isRequired,
};

export default SettingSelect;
