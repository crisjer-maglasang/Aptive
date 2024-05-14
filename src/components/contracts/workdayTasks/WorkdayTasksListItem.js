import React, { memo } from 'react';

const WorkdayTasksListItem = ({
  taskName,
  taskCompleted,
  taskLabel,
  handleChangeTask,
  disabled,
}) => {
  return (<div>
    <input
      type="checkbox"
      id={taskName}
      name={taskName}
      checked={taskCompleted}
      disabled={disabled}
      onChange={handleChangeTask}
      className="inline-flex w-4 h-4 text-aptiveblue-600 border-gray-300 rounded focus:ring-aptivegreen"
    />
    <label
      htmlFor={taskName}
      className="inline-flex block ml-2 text-sm text-gray-900"
    >
      {taskLabel}
    </label>
  </div>)
};

export default memo(WorkdayTasksListItem);
