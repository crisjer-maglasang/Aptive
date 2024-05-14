import { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@headlessui/react';

const ToggleControl = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={
        `${checked ? 'bg-[#007BFF]' : 'bg-neutral-200'} overflow-hidden relative inline-flex h-6 w-11 border border-neutral-600 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`
      }
    >
      <div
        aria-hidden="true"
        className={
          `${checked ? 'translate-x-5' : 'translate-x-0'} absolute -top-px -left-px pointer-events-none flex items-center justify-center h-6 w-6 transform rounded-full border border-neutral-600 bg-white shadow-lg ring-0 transition duration-200 ease-in-out`
        }
      />
      <span className="sr-only">{label}</span>
    </Switch>
  );
};

ToggleControl.defaultProps = {
  checkedColor: '#1C64F2',
};

ToggleControl.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  checkedColor: PropTypes.string,
};

export default memo(ToggleControl);
