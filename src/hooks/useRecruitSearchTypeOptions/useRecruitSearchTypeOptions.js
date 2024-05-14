import { dashboardConstants } from '@/lib/constants';
import { useMemo } from 'react';

const useRecruitSearchTypeOptions = (role) => useMemo(() => {
  const allOptions = [
    { value: 'recruit', label: 'Recruit' },
    { value: 'team_leader', label: 'Recruiter' },
    { value: 'senior_team_leader', label: 'Senior Team Leader' },
    { value: 'division_manager', label: 'Division Manager' },
    { value: 'regional_manager', label: 'Regional Manager' },
    { value: 'partnership', label: 'Partnership' },
  ];

  switch (role) {
    case dashboardConstants.SUPER_ADMIN_ROLE:
    case dashboardConstants.DEALER_ADMIN_ROLE:
      return allOptions;

    case dashboardConstants.PARTNERSHIP:
      return allOptions.slice(0, 5);

    case dashboardConstants.VP_OF_SALES_ROLE:
    case dashboardConstants.SENIOR_REGIONAL_ROLE:
    case dashboardConstants.REGIONAL_MANAGER_ROLE:
      return allOptions.slice(0, 5);

    case dashboardConstants.DIVISION_MANAGER_ROLE:
      return allOptions.slice(0, 4);

    case dashboardConstants.SENIOR_TEAM_LEADER_ROLE:
      return allOptions.slice(0, 3);

    case dashboardConstants.TEAM_LEADER:
      return allOptions.slice(0, 2);

    default:
      return [];
  }
}, [role]);

export default useRecruitSearchTypeOptions;
