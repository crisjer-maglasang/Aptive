import React, { memo } from 'react';

const ProgressTableDefaultCell = ({ cellText, cellClassName }) => {
  return (
    <td colSpan={1} className={cellClassName}>
      {cellText}
      <span className="text-base">
        {cellText ? '%' : ''}
      </span>
    </td>
  );
};

export default memo(ProgressTableDefaultCell);
