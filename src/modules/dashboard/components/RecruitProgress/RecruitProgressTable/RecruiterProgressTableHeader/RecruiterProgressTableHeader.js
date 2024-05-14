import { memo } from 'react';
import classNames from 'classnames';

import { progressTableConstants } from '@/lib/constants';

const { headerCells } = progressTableConstants;

const RecruiterProgressTableHeader = () => {
  const headerClasses = 'px-6 py-3 text-base text-gray-800 border-gray-400';

  return (
    <thead className="bg-aptivegreen-lighter">
    <tr>
      {headerCells.map((item, index, arr) => (
        <th
          key={item.id}
          scope="col"
          className={classNames(
            headerClasses,
            `w-${item.widthFraction}/12 border-b-2`,
            {
              'text-left': item.textLeft,
              'border-r-2': index !== arr?.length - 1
            }
          )}
        >
          {item.text}
        </th>
      ))}
    </tr>
    </thead>
  );
};

export default memo(RecruiterProgressTableHeader);
