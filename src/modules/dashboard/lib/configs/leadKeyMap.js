import { dashboardConstants, onboardingConstants } from '@/lib/constants';

const {
  EMAIL_NAME,
  SSN_LAST_FOUR_NAME,
  RECRUITER_NAME,
  RECRUITING_OFFICE_NAME,
  PHONE_NAME,
  SALES_PROGRAM_NAME,
  SALES_POSITION_NAME,
} = dashboardConstants;

const {
  COMPANY_NAME,
  COMPANY_YEARS_SOLD,
  LAST_INDUSTRY_NAME,
  LAST_INDUSTRY_OTHER_NAME,
  COMPANY_ACCOUNT_NUMBERS,
  CURRENT_SITUATION_NAME,
  SOURCE_OF_DISCOVERY_NAME,
  HAS_REP_EXPERIENCE,

  FIRST_NAME,
  LAST_NAME,
  DATE_OF_BIRTH,
} = onboardingConstants;

const leadKeyMap = {
  [FIRST_NAME]: 'firstName',
  [LAST_NAME]: 'lastName',
  [EMAIL_NAME]: 'email',
  [PHONE_NAME]: 'phone',
  [SSN_LAST_FOUR_NAME]: 'ssnLastFour',
  [DATE_OF_BIRTH]: 'dob',
  [HAS_REP_EXPERIENCE]: 'is_switchover',
  [COMPANY_NAME]: 'sales_company',
  [COMPANY_ACCOUNT_NUMBERS]: 'number_of_accounts',
  [COMPANY_YEARS_SOLD]: 'years_sold',
  [LAST_INDUSTRY_NAME]: 'last_industry',
  [LAST_INDUSTRY_OTHER_NAME]: 'last_industry_other',
  [SOURCE_OF_DISCOVERY_NAME]: 'source_of_discovery',
  [CURRENT_SITUATION_NAME]: 'current_situation',
  [RECRUITER_NAME]: 'recruiterId',
  [RECRUITING_OFFICE_NAME]: 'recruitingOfficeId',
  [SALES_PROGRAM_NAME]: 'sales_program',
  [SALES_POSITION_NAME]: 'experience',
};

export default leadKeyMap;
