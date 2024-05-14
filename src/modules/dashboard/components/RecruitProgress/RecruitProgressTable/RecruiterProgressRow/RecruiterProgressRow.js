import React, { useContext, useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';

import { RecruitProgressRow } from '../RecruitProgressRow';
import { RecruiterTableCell } from '../RecruiterTableCell';

import { RecruitProgressContext } from '../../../../pages/RecruitProgress';

import { progressCells } from '@/lib/constants';
import { dataKeys } from '@/lib/adapters';

const {
  RECRUIT,
} = dataKeys;

const RecruiterProgressRow = ({ recruiter }) => {
  const [isRowOpen, setIsRowOpen] = useState(false);
  const { handleClick } = useContext(RecruitProgressContext);

  const hasChildren = recruiter?.children !== undefined && Array.isArray(recruiter?.children) && recruiter?.children.length > 0;

  const rowClassNames = useMemo(() => classNames(
    { 'bg-gray-50': isRowOpen },
    hasChildren ? 'cursor-pointer' : '',
    hasChildren ? 'hover:bg-gray-50' : '',
  ), [isRowOpen]);

  const handleExpandRow = useCallback(() => {
    setIsRowOpen(!isRowOpen);
  }, [setIsRowOpen, isRowOpen]);

  const handleMenuClick = useCallback(() => {
    handleClick(recruiter);
  }, [recruiter, handleClick]);

  const totalRows = useMemo(() => {
    const rows = [];

    if (
      recruiter?.child_type !== RECRUIT
    ) {
      recruiter?.children?.forEach((child) => {
        rows.push(
          <RecruiterProgressRow
            key={child?.id}
            recruiter={child}
          />
        );
      })
    } else {
      recruiter?.children?.forEach((rec) => {
        rows.push(
          <RecruitProgressRow
            key={rec?.id}
            recruit={rec}
          />
        );
      })
    }

    return rows;
  }, [recruiter]);

  return (
    <>
      <tr className={rowClassNames} onClick={handleExpandRow}>
        {progressCells.map(({ name, cellType }, i) => {
          return (
            <RecruiterTableCell
              key={`${recruiter?.name}-${recruiter?.id}-${i}`}
              name={name}
              value={recruiter[name]}
              cellType={cellType}
              childType={recruiter?.child_type}
              childrenCount={recruiter?.count}
              isOpen={isRowOpen}
              onMenuClick={handleMenuClick}
            />
          );
        })}
      </tr>
      <>{isRowOpen && <>{totalRows}</>}</>
    </>
  );
};

export default RecruiterProgressRow;
