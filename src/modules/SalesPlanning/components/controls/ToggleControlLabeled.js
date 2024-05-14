import { memo } from 'react';
import PropTypes from 'prop-types';
import ToggleControl from './ToggleControl';

const ToggleControlLabeled = memo(({ label, checked, toggleName, onChange }) => {
  return (
    <div className="px-2 py-1.5 bg-white rounded border-2 border-black/25 flex items-center justify-between gap-x-2">
      <ToggleControl
        checked={checked}
        name={toggleName}
        onChange={onChange}
      />
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
});

ToggleControlLabeled.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  toggleName: PropTypes.string,
  onChange: PropTypes.func,
};

export default ToggleControlLabeled;
