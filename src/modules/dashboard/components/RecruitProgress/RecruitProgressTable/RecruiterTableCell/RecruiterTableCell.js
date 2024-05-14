import React, { useMemo, memo } from 'react';
import classNames from 'classnames';
import { dataKeys } from '@/lib/adapters';
import { formatNumber } from '@/lib'
import { ProgressTableMenuCell, ProgressTableDefaultCell, ProgressTableIconCell } from './TableCells';

const {
  RECRUIT_NAME_KEY
} = dataKeys;

const RecruiterTableCell = (
  {
    value,
    name,
    childrenCount,
    onMenuClick,
    cellType,
    childType,
    onIconClick,
    cellClass,
    textClass,
    clickable,
  }) => {
  const cellClassName = useMemo(() => classNames(
    'px-6 py-4 whitespace-nowrap text-center font-medium text-sm border-l-2 border-r border-gray-200',
    cellClass,
  ), [cellClass]);

  const cellText = useMemo(() => {
    if (name === RECRUIT_NAME_KEY) {
      return value.trim();
    }

    return value;
  }, [value, name]);

  const formattedCellText = useMemo(() => {
    if (name === RECRUIT_NAME_KEY) {
      const maxWordLength = 12;

      let words = value?.split(' ');

      words = words?.map((word) => word.trim().length > maxWordLength
        ? word.trim().substring(0, maxWordLength) + '...'
        : word.trim()
      )

      return words.join(' ');
    }

    return value;
  }, [value, name]);

  const cellsMap = {
    withMenu: (
      <ProgressTableMenuCell
        childType={childType}
        cellText={cellText}
        formattedCellText={formattedCellText}
        cellTextClasses={textClass}
        onMenuClick={onMenuClick}
        childrenCount={childrenCount}
      />
    ),
    default: (
      <ProgressTableDefaultCell
        cellText={formatNumber(cellText)}
        cellClassName={cellClassName}
      />
    ),
    icon: (
      <ProgressTableIconCell
        cellText={cellText}
        clickable={clickable}
        cellClassName={cellClassName}
        onIconClick={onIconClick}
      />
    ),
  };

  return (
    <>
      {cellsMap[cellType]}
    </>
  );
};

export default memo(RecruiterTableCell);
