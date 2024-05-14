import PropTypes from 'prop-types';

import { Switch as BaseSwitch } from '@headlessui/react';
import classNames from 'classnames';

const Switch = ({ enabled, ...props }) => {
  const switchClasses = classNames(
    'relative inline-flex h-6 w-11 items-center rounded-full',
    {
      'bg-primary-300': enabled,
      'bg-gray-200': !enabled,
    }
  );

  const thumbClasses = classNames(
    'inline-block h-4 w-4 transform rounded-full bg-white transition',
    {
      'translate-x-6': enabled,
      'translate-x-1': !enabled,
    }
  );

  return (
    <BaseSwitch checked={enabled} className={switchClasses} {...props}>
      <span className={thumbClasses} />
    </BaseSwitch>
  );
};

Switch.propTypes = {
  enabled: PropTypes.bool.isRequired,
};

export default Switch;
