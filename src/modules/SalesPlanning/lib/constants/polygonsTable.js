import sptConstants from './spt';

export const polygonsTableColumns = [
  {
    align: 'right',
    text: 'ID',
    sortable: true,
    id: 'polygon_id',
  },
  {
    align: 'left',
    text: sptConstants.TEAM_NAME,
    sortable: true,
    id: 'team_name',
  },
  {
    align: 'right',
    text: 'Not Knocked',
    sortable: false,
    id: 'not_knocked',
  },
  {
    align: 'right',
    text: '1st Knock',
    sortable: false,
    id: 'knocked_once',
  },
  {
    align: 'right',
    text: '2nd Knock',
    sortable: false,
    id: 'knocked_twice',
  },
  {
    align: 'right',
    text: 'Progress',
    sortable: false,
    id: 'completed',
  },
];
