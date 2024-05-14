import { CustomFormElement } from '@/components/common';
import { lastIndustrySelectOptions } from '@/modules/recruits/lib';
import { onboardingConstants, onboardingDataValues } from '@/lib/constants';

const { LAST_INDUSTRY_OTHER_VALUE } = onboardingDataValues;

const {
  LAST_INDUSTRY_NAME,
  LAST_INDUSTRY_LABEL,
  COMPANY_NAME_LABEL,
  COMPANY_ACCOUNT_NUMBERS_LABEL,
  COMPANY_NAME,
  COMPANY_ACCOUNT_NUMBERS,
  COMPANY_YEARS_SOLD,
  COMPANY_YEARS_SOLD_LABEL,
  LAST_INDUSTRY_OTHER_NAME,
  LAST_INDUSTRY_OTHER_LABEL,
  ADD_ADDITIONAL_EXPERIENCE,
  REP_EXPERIENCES_DATA_NAME,
} = onboardingConstants;

export const getLeadExperienceFields = () => ({
  fields: [
    {
      component: CustomFormElement,
      name: LAST_INDUSTRY_NAME,
      props: {
        label: LAST_INDUSTRY_LABEL,
        type: 'select',
        required: true,
        selectOptions: lastIndustrySelectOptions,
        colSpan: 12,
      },
      revalidate: [],
    },
    {
      component: CustomFormElement,
      name: LAST_INDUSTRY_OTHER_NAME,
      props: {
        label: LAST_INDUSTRY_OTHER_LABEL,
        type: 'text',
        required: true,
        colSpan: 6,
      },
      dependsOn: {
        name: LAST_INDUSTRY_NAME,
        value: LAST_INDUSTRY_OTHER_VALUE,
      },
      revalidate: [],
    },
    {
      component: CustomFormElement,
      name: COMPANY_NAME,
      props: {
        label: COMPANY_NAME_LABEL,
        type: 'text',
        required: true,
        colSpan: 6,
      },
      revalidate: [],
    },
    {
      component: CustomFormElement,
      name: COMPANY_ACCOUNT_NUMBERS,
      props: {
        label: COMPANY_ACCOUNT_NUMBERS_LABEL,
        type: 'text',
        required: true,
        colSpan: 6,
      },
      revalidate: [],
    },
    {
      component: CustomFormElement,
      name: COMPANY_YEARS_SOLD,
      props: {
        label: COMPANY_YEARS_SOLD_LABEL,
        type: 'text',
        required: true,
        colSpan: 6,
      },
      revalidate: [],
    },
  ],
  buttonText: ADD_ADDITIONAL_EXPERIENCE,
  parentName: REP_EXPERIENCES_DATA_NAME,
});
