import dashboardConstants from './dashboard';
import { dataKeys } from '../adapters';

const {
  NAME,
  COMPLETION,
  MANAGER_INTERVIEW,
  PERSONAL_INFO,
  HOUSING_VEHICLE,
  UNIFORM_SWAG,
  LICENSING,
  HR_INFO,
} = dashboardConstants;

const {
  PERCENT_ITEMS_COMPLETED_KEY,
  RECRUIT_NAME_KEY,
  COMPLETION_KEY,
  MANAGER_INTERVIEW_KEY,
  PERSONAL_INFO_KEY,
  HOUSING_VEHICLE_KEY,
  UNIFORM_SWAG_KEY,
  LICENSING_KEY,
  HR_INFO_KEY,
} = dataKeys;

const cellTypes = {
  WITH_MENU: 'withMenu',
  DEFAULT: 'default',
  ICON: 'icon',
  EMPTY: 'empty'
};

export const progressCells = [
  {
    name: RECRUIT_NAME_KEY,
    cellType: cellTypes.WITH_MENU,
  },
  {
    name: COMPLETION_KEY,
    cellType: cellTypes.DEFAULT,
  },
  {
    name: MANAGER_INTERVIEW_KEY,
    cellType: cellTypes.DEFAULT,
  },
  {
    name: PERSONAL_INFO_KEY,
    cellType: cellTypes.DEFAULT,
  },
  {
    name: HOUSING_VEHICLE_KEY,
    cellType: cellTypes.DEFAULT,
  },
  {
    name: UNIFORM_SWAG_KEY,
    cellType: cellTypes.DEFAULT,
  },
  {
    name: LICENSING_KEY,
    cellType: cellTypes.DEFAULT,
  },
  {
    name: HR_INFO_KEY,
    cellType: cellTypes.DEFAULT,
  },
];

export const recruitCells = [
  {
    name: RECRUIT_NAME_KEY,
    cellType: cellTypes.WITH_MENU,
  },
  {
    name: PERCENT_ITEMS_COMPLETED_KEY,
    cellType: cellTypes.DEFAULT,
  },
  {
    name: MANAGER_INTERVIEW_KEY,
    cellType: cellTypes.ICON,
    clickable: true,
  },
  {
    name: PERSONAL_INFO_KEY,
    cellType: cellTypes.ICON,
  },
  {
    name: HOUSING_VEHICLE_KEY,
    cellType: cellTypes.ICON,
  },
  {
    name: UNIFORM_SWAG_KEY,
    cellType: cellTypes.ICON,
  },
  {
    name: LICENSING_KEY,
    cellType: cellTypes.ICON,
  },
  {
    name: HR_INFO_KEY,
    cellType: cellTypes.ICON,
  },
];

export const progressTableConstants = {
  headerCells: [
    {
      id: NAME,
      text: NAME,
      widthFraction: 2,
      textLeft: true,
    },
    {
      id: COMPLETION,
      text: COMPLETION,
      widthFraction: 1,
      textLeft: false,
    },
    {
      id: MANAGER_INTERVIEW,
      text: MANAGER_INTERVIEW,
      widthFraction: 1,
      textLeft: false,
    },
    {
      id: PERSONAL_INFO,
      text: PERSONAL_INFO,
      widthFraction: 1,
      textLeft: false,
    },
    {
      id: HOUSING_VEHICLE,
      text: HOUSING_VEHICLE,
      widthFraction: 1,
      textLeft: false,
    },
    {
      id: UNIFORM_SWAG,
      text: UNIFORM_SWAG,
      widthFraction: 1,
      textLeft: false,
    },
    {
      id: LICENSING,
      text: LICENSING,
      widthFraction: 1,
      textLeft: false,
    },
    {
      id: HR_INFO,
      text: HR_INFO,
      widthFraction: 1,
      textLeft: false,
    },
  ]
};
