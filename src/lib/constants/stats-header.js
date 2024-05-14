import { dataKeys } from '../adapters';
import dashboardConstants from './dashboard';

const {
  TOTAL_SIGNED_REPS,
  TRUE_SIGNED_REPS,
  PENDING_CONTRACTS,
  NEEDS_INTERVIEW,
  ONBOARDING_COMPLETE,
  TOTAL_LEADS,
  AGREEMENTS_SENT,
  PENDING_ADMIN,
  PENDING_REGIONAL,
  RECRUITS_SIGNED,
} = dashboardConstants;

const {
  SIGNED_KEY,
  TRUE_SIGNED_KEY,
  PENDING_KEY,
  NEED_INTERVIEW_KEY,
  MANAGER_INTERVIEW_KEY,
  PENDING_CONTRACTS_KEY,
  ONBOARDING_COMPLETE_KEY,
  DOWNLINE_COUNT_KEY,
  AGREEMENTS_SENT_KEY,
  AGREEMENTS_SIGNED_KEY,
  PENDING_SIGNATURE_KEY,
  USERS_GROUP_ICON,
  USER_ADD_ICON,
  PENCIL_ICON,
  USER_ICON,
  CHECK_CIRCLE_ICON,
  USERS_ICON,
  LINK_ICON,
  BADGE_ICON,
} = dataKeys;

export const progressStatsConstants = [
  {
    name: SIGNED_KEY,
    title: TOTAL_SIGNED_REPS,
    iconName: USERS_GROUP_ICON,
    filterOptions: {
      filter: {},
    },
  },
  {
    name: TRUE_SIGNED_KEY,
    title: TRUE_SIGNED_REPS,
    iconName: USER_ADD_ICON,
    filterOptions: {
      filter: {
        [TRUE_SIGNED_KEY]: 1,
      },
    },
  },
  {
    name: PENDING_KEY,
    title: PENDING_CONTRACTS,
    iconName: PENCIL_ICON,
    filterOptions: {
      filter: {
        [PENDING_CONTRACTS_KEY]: 1,
      },
    },
  },
  {
    name: NEED_INTERVIEW_KEY,
    title: NEEDS_INTERVIEW,
    iconName: USER_ICON,
    filterOptions: {
      filter: {
        [MANAGER_INTERVIEW_KEY]: 0,
      },
    },
  },
  {
    name: ONBOARDING_COMPLETE_KEY,
    title: ONBOARDING_COMPLETE,
    iconName: CHECK_CIRCLE_ICON,
    filterOptions: {
      filter: {
        [ONBOARDING_COMPLETE_KEY]: 1,
      },
    },
  },
];

export const getAllLeadsStatsConstants = (isAdmin) => [
  {
    name: DOWNLINE_COUNT_KEY,
    title: TOTAL_LEADS,
    iconName: USERS_ICON,
    filterOptions: {
      filter: {},
    },
  },
  {
    name: AGREEMENTS_SENT_KEY,
    title: AGREEMENTS_SENT,
    iconName: LINK_ICON,
    filterOptions: {
      filter: {
        statuses: [
          'completed',
          'manager',
          'regional',
          'sent',
          'converted to user',
          'admin',
        ],
      },
    },
  },
  {
    name: PENDING_SIGNATURE_KEY,
    title: isAdmin ? PENDING_ADMIN : PENDING_REGIONAL,
    iconName: PENCIL_ICON,
    filterOptions: {
      filter: isAdmin ? { statuses: ['admin'] } : { statuses: ['regional'] },
    },
  },
  {
    name: AGREEMENTS_SIGNED_KEY,
    title: RECRUITS_SIGNED,
    iconName: BADGE_ICON,
    filterOptions: {
      filter: { is_signed: 1 },
    },
  },
];
