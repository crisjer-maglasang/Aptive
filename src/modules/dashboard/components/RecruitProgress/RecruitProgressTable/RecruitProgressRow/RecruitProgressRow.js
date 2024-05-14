import React, { useContext, useState, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import RecruiterTableCell from '../RecruiterTableCell/RecruiterTableCell';

import { RecruitProgressContext } from '../../../../pages/RecruitProgress';
import {setManagerInterviewAction, updateManagerInterviewAsync} from '@/redux/reps';
import { recruitCells } from '@/lib/constants';

const RecruitProgressRow = ({ recruit, updateManagerInterview, setManagerInterview }) => {
  const { handleClick } = useContext(RecruitProgressContext);

  const handleMenuClick = useCallback(() => {
    handleClick(recruit);
  }, [handleClick, recruit]);

  const handleManagerInterviewIconCLick = useCallback(() => {
    setManagerInterview({ id: recruit.id });
    updateManagerInterview({ recruit_id: recruit.recruit_id });
  }, [updateManagerInterview, setManagerInterview]);


  return (
    <tr>
      {recruitCells.map(({ name, cellType, clickable }) => {
        return (
          <RecruiterTableCell
            key={`${recruit?.level}-${name}`}
            value={recruit[name]}
            name={name}
            cellType={cellType}
            clickable={clickable}
            cellClass="text-sm"
            textClass="pl-5 text-sm"
            recruiterLevel={recruit?.level}
            onMenuClick={handleMenuClick}
            onIconClick={handleManagerInterviewIconCLick}
          />
        );
      })}
    </tr>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  updateManagerInterview: updateManagerInterviewAsync.request,
  setManagerInterview: setManagerInterviewAction
};

export default connect(mapStateToProps, mapDispatchToProps)(RecruitProgressRow);
