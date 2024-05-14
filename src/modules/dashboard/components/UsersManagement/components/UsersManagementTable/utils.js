import { dashboardConstants } from '@/lib';
import { Actions } from './Values';
import { addFsExcludeClass } from '@/lib/utils';

export const getHeadRows = () => (
  [
    {
      value: dashboardConstants.COLUMN_TEXT_USER_ID,
      align: 'right',
      className: 'whitespace-nowrap',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_REP_NAME,
      align: 'left',
      className: 'whitespace-nowrap',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_EMAIL,
      align: 'left',
      className: 'whitespace-nowrap',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_EXPERIENCE,
      align: 'left',
      className: 'whitespace-nowrap',
    },
    {
      value: dashboardConstants.COLUMN_TEXT_PHONE_NUMBER,
      align: 'left',
      className: 'whitespace-nowrap',
    },
    {
      value: dashboardConstants.COLUMN_ACTIONS,
      align: 'left',
      className: 'whitespace-nowrap',
    }
  ]
)

export const parseUserRows = (rows, onActionCompleted) => (
  rows.length ? rows.map(row => [
    {
      value: row.id,
      align: 'right',
    },
    {
      value: row.name,
      align: 'left',
      className: addFsExcludeClass('whitespace-nowrap'),
    },
    {
      value: row.email,
      align: 'left',
      className: addFsExcludeClass('whitespace-nowrap'),
    },
    {
      value: row.experience_name,
      align: 'left',
      className: 'whitespace-nowrap',
    },
    {
      value: row.phone_number,
      align: 'left',
      className: addFsExcludeClass('whitespace-nowrap'),
    },
    {
      value: <Actions userId={row.id} onActionCompleted={onActionCompleted} />,
      align: 'left',
      className: 'whitespace-nowrap',
    }
  ]) : [
    {
      value: dashboardConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ]
)
