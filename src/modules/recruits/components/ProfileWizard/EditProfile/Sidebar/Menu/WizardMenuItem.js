import { Icon } from '@/components';
import { mergeClassName } from '@/lib/utils';
import { CheckCircleIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { memo } from 'react';

const WizardMenuItem = ({
  label,
  onClick,
  selected,
  completed,
}) => (
  <li
    onClick={onClick}
    className="cursor-pointer group"
    role="button"
  >
    <div className="flex items-center py-3 px-4 ">
      <div
        className={mergeClassName(
          'relative self-stretch flex items-center',
          {
            'after:block group-last:after:hidden after:absolute after:top-1/2 after:left-1/2 after:mt-4 after:-translate-x-1/2 after:w-0.5 after:h-full after:bg-gray-300': true,
            'after:bg-aptiveblue': completed,
          },
        )}
      >
        <div className="flex items-center justify-center relative z-10 w-10 h-10">
          {completed ? (
            <CheckCircleIcon
              className="w-full h-full text-aptiveblue"
              aria-hidden="true"
            />
          ) : (
            selected ? (
              <Icon icon="dotCircleBlue" />
            ) : (
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full bg-white" />
            )
          )}
        </div>
      </div>
      <div
        className={mergeClassName(
          'ml-2 text-sm font-bold text-gray-500',
          { 'text-gray-900': completed },
          { 'text-aptiveblue': selected },
        )}
      >
        {label}
        <div className="font-medium text-gray-500">
          {completed ? 'Complete' : 'Incompleted'}
        </div>
      </div>
    </div>
  </li>
);

WizardMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default memo(WizardMenuItem);
