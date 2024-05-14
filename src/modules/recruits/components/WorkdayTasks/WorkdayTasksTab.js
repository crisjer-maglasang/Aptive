import { WorkdayTasksList } from '@/components';
import { isAdminSelector } from '@/redux/auth';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { default as WorkdayID } from './WorkdayID';
import { nextStepSelector, repEditableSelector } from '@/redux/onboarding';
import { requestRepAsContactAsync } from '@/redux/reps';

const WorkdayTasksTab = ({ userId, recruitingSeasonId, isAdmin, workdayId, isRepEditable, nextStep, requestRepAsContact }) => {
  useEffect(() => {
    if (nextStep) {
      requestRepAsContact({ userId, recruitingSeasonId });
      nextStep.applyTransition();
    }
  }, [nextStep]);

  return (
    <>
      <div className="relative pb-6 bg-white border border-gray-200 rounded-md shadow-sm">
        <div>
          <WorkdayTasksList
            isEditable={isAdmin && isRepEditable}
            userId={userId}
            onboarding={true}
            recruitingSeasonId={recruitingSeasonId}
          />
        </div>
      </div>
      {isAdmin && (
        <div className="relative bg-white border border-gray-200 rounded-md shadow-sm mt-6">
          <WorkdayID
            userId={userId}
            workdayId={workdayId}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAdmin: isAdminSelector(state),
  isRepEditable: repEditableSelector(state),
  nextStep: nextStepSelector(state),
});

const mapDispatchToProps = {
  requestRepAsContact: requestRepAsContactAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkdayTasksTab);
