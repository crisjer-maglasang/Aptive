import { dashboardConstants } from '@/lib';
import { Checkbox, RepName, Status } from './Values';
import StatusHeaderActions from './StatusHeaderActions';
import { addFsExcludeClass } from '@/lib/utils';

export const getHeadRows = (
  onCheckAllReps,
  repsToChangeStatus,
  onChangeStatus,
  isAllSelected,
  isPartlySelected,
  isLoading,
  repStatuses,
) => (
  [
    {
      value: (
        <StatusHeaderActions
          isChecked={isAllSelected}
          isIndeterminate={isPartlySelected}
          isLoading={isLoading}
          onCheckReps={onCheckAllReps}
          repStatuses={repStatuses}
          repsToChangeStatus={repsToChangeStatus}
          onChangeStatus={onChangeStatus}
        />
      ),
      align: 'center',
      className: 'px-4',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_STATUS,
      align: 'left',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_REP_ID,
      align: 'right',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_WORKDAY_ID,
      align: 'right',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_REP_NAME,
      align: 'left',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_EMAIL,
      align: 'left',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_EXPERIENCE,
      align: 'left',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_PHONE_NUMBER,
      align: 'left',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_WORKDAY,
      align: 'center',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_PROFILE,
      align: 'center',
      className: 'whitespace-nowrap px-2',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_PROFILE_AND_WORKDAY_COMPLETE,
      align: 'center',
      className: 'whitespace-nowrap pl-2 pr-2',
    },
  ]
);

export const parseRepRows = (rows, onCheckRep, selectedReps, onRepClick, isLoading, repStatuses) => (
  rows.length ? rows.map((row) => {
    const { id, name, email, experience_name, phone_number, workday_complete,
      profile_complete, profile_and_workday_complete, status } = row ?? {};

    const onChange = () => onCheckRep(id);

    const repStatus = repStatuses.find((repStatus) => repStatus.statusCode === status);

    return [
      {
        value: (
          <Checkbox
            onChange={onChange}
            isChecked={selectedReps?.includes(id)}
            isLoading={isLoading}
          />
        ),
        align: 'left',
        className: 'px-4',
      },
      {
        value: <Status
          text={repStatus?.statusTitle}
          isCompleted={repStatus?.isFinished ? undefined : !repStatus?.isLossOfAccess}
        />,
        align: 'left',
        className: 'px-0',
      },
      {
        value:id,
        align: 'right',
        className: 'px-2',
      },
      {
        value: row.workday_id || '-',
        align: 'center',
        className: 'px-2',
      },
      {
        value: (
          <RepName
            text={name}
            {...(onRepClick && { onClick: onRepClick, userId: id })}
          />
        ),
        align: 'left',
        className: addFsExcludeClass('px-2'),
      },
      {
        value: email,
        align: 'left',
        className: addFsExcludeClass('whitespace-nowrap px-2'),
      },
      {
        value: experience_name,
        align: 'left',
        className: 'whitespace-nowrap px-2',
      },
      {
        value: phone_number,
        align: 'left',
        className: addFsExcludeClass('whitespace-nowrap px-2'),
      },
      {
        value: (
          <Status isCompleted={workday_complete} isIcon />
        ),
        align: 'center',
        className: 'px-2',
      },
      {
        value: (
          <Status isCompleted={profile_complete} isIcon />
        ),
        align: 'center',
        className: 'px-2',
      },
      {
        value: (
          <Status isCompleted={profile_and_workday_complete} isIcon />
        ),
        align: 'center',
        className: 'pl-2 pr-2',
      },
    ];
  }) : [
    {
      value: dashboardConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ]
);
