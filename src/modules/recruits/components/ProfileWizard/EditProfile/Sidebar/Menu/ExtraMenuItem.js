import { mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';
import { memo } from 'react';

const ExtraMenuItem = ({
  label,
  onClick,
  selected,
}) => (
  <li
    onClick={onClick}
    className="border-t cursor-pointer"
    role="button"
  >
    <div
      className={mergeClassName(
        'border-l-4 border-l-transparent py-3 pr-6 pl-5 text-sm text-aptiveblue',
        { 'border-l-aptiveblue': selected },
      )}
    >
      {label}
    </div>
  </li>
);

ExtraMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default memo(ExtraMenuItem);
