import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { ErrorBox, Loader } from '@/components/common';
import { workdayTasksIsLoadingSelector } from '@/redux/loading';
import classNames from 'classnames';
import { clearWorkdayTasksErrorsAction, repsWorkdayTasksSelector, updateRepsWorkdayTaskAsync } from '@/redux/reps';
import { repsWorkdayTasksUpdateErrorSelector, requestRepsWorkdayTasksAsync } from '@/redux/reps';
import WorkdayTasksListItem from './WorkdayTasksListItem';

const WorkdayTasksList = ({
  isEditable,
  userId,
  recruitingSeasonId,
  error,
  loading,
  onboarding,
  updateRepsWorkdayTask,
  requestRepsWorkdayTasks,
  workdayTasks,
  clearWorkdayTasksErrors,
}) => {
  useEffect(() => {
    if (userId) {
      clearWorkdayTasksErrors({ userId });
      requestRepsWorkdayTasks({
        userId: userId,
        recruitingSeasonId: recruitingSeasonId
      });
    }
  }, [requestRepsWorkdayTasks, userId, recruitingSeasonId, clearWorkdayTasksErrors]);

  const rows = [];

  const handleChangeTask = useCallback((event) => {
    userId
      ? updateRepsWorkdayTask({
        userId: userId,
        recruitingSeasonId: recruitingSeasonId,
        tasks: [
          {
            taskCompleted: event.target.checked,
            taskName: event.target.name,
          }
        ]
      })
      : updateRepsWorkdayTask({
        tasks: [
          {
            taskCompleted: event.target.checked,
            taskName: event.target.name,
          }
        ]
      })
  }, [
    updateRepsWorkdayTask,
    userId,
    recruitingSeasonId,
  ]);

  if (workdayTasks) {
    workdayTasks.forEach((workdayTask, key) => {
      rows.push(
        <WorkdayTasksListItem
          taskName={workdayTask.taskName}
          taskCompleted={workdayTask.taskCompleted}
          taskLabel={workdayTask.taskLabel}
          key={`workdayTask_${key}`}
          handleChangeTask={handleChangeTask}
          disabled={!isEditable || workdayTask.disabled}
        />
      );
    });
  }

  return (
    <div className={classNames(
      onboarding ? 'px-6 py-5 border-gray-200 sm:px-6' : ''
    )}>
      {loading
        ? <Loader/>
        : (
          <>
            {error && (
              <div className="mb-2">
                <ErrorBox message={error}/>
              </div>
            )}
            {rows}
          </>
        )}
    </div>
  );
};

const mapStateToProps = (state, { userId }) => {
  return {
    loading: workdayTasksIsLoadingSelector(state),
    error: repsWorkdayTasksUpdateErrorSelector(state, userId),
    workdayTasks: repsWorkdayTasksSelector(state, userId),
  };
};

const mapDispatchToProps = {
  updateRepsWorkdayTask: updateRepsWorkdayTaskAsync.request,
  requestRepsWorkdayTasks: requestRepsWorkdayTasksAsync.request,
  clearWorkdayTasksErrors: clearWorkdayTasksErrorsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkdayTasksList);
