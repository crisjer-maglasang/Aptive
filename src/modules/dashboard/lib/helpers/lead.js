import { leadKeyMap } from '../configs';
import { dashboardConstants, onboardingConstants, onboardingDataValues } from '@/lib/constants';

const {
  PHONE_NAME,
} = dashboardConstants;

const { LAST_INDUSTRY_OTHER_VALUE } = onboardingDataValues;

const {
  REP_EXPERIENCES_DATA_NAME,
  COMPANY_ACCOUNT_NUMBERS,
  COMPANY_NAME,
  LAST_INDUSTRY_NAME,
  COMPANY_YEARS_SOLD,
  LAST_INDUSTRY_OTHER_NAME,
} = onboardingConstants;

export const combineLeadData = (data) => {
  const newData = {};

  const phoneFields = [
    PHONE_NAME,
  ];

  if (data[REP_EXPERIENCES_DATA_NAME]) {
    newData['experiences'] = data[REP_EXPERIENCES_DATA_NAME].map(({
      setId,
      id,
      [COMPANY_ACCOUNT_NUMBERS]: numberOfAccounts,
      [COMPANY_YEARS_SOLD]: companyYearsSold,
      [COMPANY_NAME]: companyName,
      [LAST_INDUSTRY_NAME]: lastIndustry,
      [LAST_INDUSTRY_OTHER_NAME]: lastIndustryOther,
    }) => {
      return {
        setId,
        id,
        [leadKeyMap[COMPANY_ACCOUNT_NUMBERS]]: numberOfAccounts,
        [leadKeyMap[COMPANY_YEARS_SOLD]]: companyYearsSold,
        [leadKeyMap[COMPANY_NAME]]: companyName,
        [leadKeyMap[LAST_INDUSTRY_NAME]]: lastIndustry,
        ...(
          (lastIndustry === LAST_INDUSTRY_OTHER_VALUE ? lastIndustryOther : null) &&
          { [leadKeyMap[LAST_INDUSTRY_OTHER_NAME]]: lastIndustryOther }
        ),
      };
    });
  }

  Object.entries(data).forEach(([key, value]) => {
    const newKey = leadKeyMap[key];

    switch (true) {
      case value?.length === 0 || value === null || value === undefined:
        break;
      case phoneFields.includes(key):
        newData[newKey] = value.replace(/[^0-9]/g, '');
        break;
      case typeof newKey === 'undefined':
        break;
      default:
        newData[newKey] = value;
    }
  });

  return newData;
};
