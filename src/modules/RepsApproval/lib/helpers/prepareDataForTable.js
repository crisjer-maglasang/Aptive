import { Avatar, List } from '@/components/common';
import { v4 as uuidv4 } from 'uuid';
import { COLUMN_ID } from '../constants/constants';
import { addFsExcludeClass } from '@/lib/utils';

export const getHeaderGroups = () => ([
  {
    value: 'USER',
    colSpan: 2,
    align: 'left',
    className: 'min-w-[200px]',
    columnId: COLUMN_ID.userName,
    isSorted: true,
  },
  {
    value: 'Items to review',
    colSpan: 1,
    align: 'left',
    className: '',
    columnId: COLUMN_ID.itemsToReview,
  },
  {
    value: 'Reg. Manager',
    colSpan: 1,
    align: 'left',
    className: '',
    columnId: COLUMN_ID.regionalName,
    isSorted: true,
  },
  {
    value: 'Recruiter',
    colSpan: 1,
    align: 'left',
    className: '',
    columnId: COLUMN_ID.recruiterName,
    isSorted: true,
  },
  {
    value: 'Region',
    colSpan: 1,
    align: 'left',
    className: '',
    columnId: COLUMN_ID.region,
    isSorted: true,
  },
  {
    value: 'Date added',
    colSpan: 1,
    align: 'right',
    className: 'pr-6',
    columnId: COLUMN_ID.date,
    isSorted: true,
  },
]);

export const getBodyRowGroups = (data) => {
  const { avatar, userName, itemsToReview, regionalName, recruiterName, region, submittedDate } = data;

  return [
    {
      id: uuidv4(),
      columnId: COLUMN_ID.userName,
      value: <Avatar image={avatar} userName={userName} square />,
      colSpan: 1,
      align: 'left',
      valign: 'top',
      className: '',
    },
    {
      id: uuidv4(),
      columnId: COLUMN_ID.userName,
      value: userName,
      colSpan: 1,
      align: 'left',
      valign: 'top',
      className: addFsExcludeClass(`pt-7 pl-2 text-primary-500 ${userName ? 'hover:underline' : ''}`),
    },
    {
      id: uuidv4(),
      columnId: COLUMN_ID.itemsToReview,
      value: <List listItems={itemsToReview} />,
      colSpan: 1,
      align: 'left',
      valign: 'top',
      className: 'pt-7',
    },
    {
      id: uuidv4(),
      columnId: COLUMN_ID.regionalName,
      value: regionalName,
      colSpan: 1,
      align: 'left',
      valign: 'top',
      className: addFsExcludeClass(`pt-7 text-primary-300 ${regionalName ? 'hover:underline' : ''}`),
    },
    {
      id: uuidv4(),
      columnId: COLUMN_ID.recruiterName,
      value: recruiterName,
      colSpan: 1,
      align: 'left',
      valign: 'top',
      className: addFsExcludeClass(`pt-7 text-primary-300 ${recruiterName ? 'hover:underline' : ''}`),
    },
    {
      id: uuidv4(),
      columnId: COLUMN_ID.region,
      value: region,
      colSpan: 1,
      align: 'left',
      valign: 'top',
      className: `pt-7 text-primary-300 ${region ? 'hover:underline' : ''}`,
    },
    {
      id: uuidv4(),
      value: submittedDate,
      columnId: COLUMN_ID.date,
      colSpan: 1,
      align: 'right',
      valign: 'top',
      className: 'pt-7 pr-6',
    },
  ];
};
