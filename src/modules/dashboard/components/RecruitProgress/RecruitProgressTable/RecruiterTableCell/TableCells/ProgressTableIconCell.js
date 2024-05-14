import React, { memo, useMemo } from 'react';
import classNames from 'classnames';

import { CheckCircleIcon as CheckCircleOutline } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';

const ProgressTableIconCell = ({ cellText, clickable, onIconClick, cellClassName }) => {
  const iconClasses = useMemo(() => classNames(
    'h-5 w-5 mx-auto',
    {
      'fill-current text-aptivegreen': cellText === 1,
      'text-gray-400': cellText === 0,
      'cursor-pointer': clickable && !Boolean(cellText),
    }
  ), [cellText, clickable]);
  return (
    <td colSpan={1} className={cellClassName}>
      {cellText === 1 ? (
        <CheckCircleIcon className={iconClasses} />
      ) : (
        <CheckCircleOutline
          className={iconClasses}
          onClick={clickable && onIconClick}
        />
      )}
    </td>
  );
};

export default memo(ProgressTableIconCell);
