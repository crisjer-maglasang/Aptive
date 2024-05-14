import { Icon } from '@/components';
import { mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';
import { memo } from 'react';

const MenuItem = ({
  label,
  onClick,
  selected,
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
          },
        )}
      >
        <div className="flex items-center justify-center relative z-10 w-10 h-10">
          {selected ? (
            <Icon icon="dotCircleBlue" />
          ) : (
            <div className="w-8 h-8 border-2 border-gray-300 rounded-full bg-white" />
          )}
        </div>
      </div>
      <div
        className={mergeClassName(
          'ml-2 text-sm font-bold text-gray-500',
          { 'text-aptiveblue': selected },
        )}
      >
        {label}
      </div>
    </div>
  </li>
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default memo(MenuItem);
