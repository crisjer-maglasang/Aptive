import React, { memo, useMemo } from 'react';
import classNames from 'classnames';

import { ProfileButton } from '@/components/recruits';

import { dataKeys } from '@/lib/adapters';
import { dashboardConstants } from '@/lib/constants';
import { addFsExcludeClass } from '@/lib/utils';

const {
  TEAM_LEADER,
  RECRUIT,
  REGIONAL
} = dataKeys;

const {
  RECRUIT_LABEL,
} = dashboardConstants;

const ProgressTableMenuCell = (
  {
    childType,
    cellText,
    formattedCellText,
    onMenuClick,
    childrenCount,
    cellTextClasses,
  }) => {
  const textClasses = useMemo(() => classNames(
    'pt-3 mr-8 text-sm',
    cellTextClasses
  ), [cellTextClasses]);

  const dataClasses = useMemo(() => classNames(
    'flex justify-between col-span-2 px-6 py-4 font-medium text-sm text-gray-900 whitespace-wrap max-w-[17rem] text-base pl-8',
    {
      'pl-7': childType === REGIONAL,
      'pl-9': childType === TEAM_LEADER,
      'pl-11': childType === RECRUIT,
    }
  ), [childType]);

  return (
    <td className={addFsExcludeClass(dataClasses)}>
      <div className={textClasses} title={cellText}>
        {formattedCellText}
        {childrenCount ? (
          <div className="w-full text-sm text-gray-400">
            {`${childrenCount} ${RECRUIT_LABEL}`}
          </div>
        ) : null}
      </div>
      <ProfileButton onClick={onMenuClick} />
    </td>
  );
};

export default memo(ProgressTableMenuCell);
