import { CloseIconButton } from '@/components/common';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { mergeClassName } from '@/lib/utils';

const FilterBadge = memo(({ text, onDelete, className }) => {
  return (
    <div
      className={mergeClassName(
        'py-0.5 px-2.5 flex items-center justify-between gap-x-1 rounded-md bg-gray-100 text-xs' +
        ' text-gray-700 font-medium',
        className,
      )}
    >
      <span>{text}</span>
      <CloseIconButton onClose={onDelete} classes="w-5 h-5 hover:text-gray-900" />
    </div>
  );
});

FilterBadge.propTypes = {
  text: PropTypes.string,
  onDelete: PropTypes.func,
  className: PropTypes.string,
};

export default FilterBadge;
