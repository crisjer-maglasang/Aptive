import { CustomFormElement } from '@/components/common';
import { onboardingConstants, onboardingDataValues } from '@/lib/constants';
import {
  sourceOfDiscoverySelectOptions,
  currentSituationSelectOptions,
  lastIndustrySelectOptions,
} from '../../../lib';
import { useFormContext } from 'react-hook-form';
import ExperienceList from './ExperienceList';
import PropTypes from 'prop-types';

const {
  CURRENT_SITUATION_LABEL,
  CURRENT_SITUATION_NAME,
  SOURCE_OF_DISCOVERY_LABEL,
  SOURCE_OF_DISCOVERY_NAME,

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

const { LAST_INDUSTRY_OTHER_VALUE } = onboardingDataValues;

const RepExperience = ({
  canEditField,
  onChangeHandler,
}) => {
  const constants = {
    fields: [
      {
        component: CustomFormElement,
        name: LAST_INDUSTRY_NAME,
        props: {
          label: LAST_INDUSTRY_LABEL,
          type: 'select',
          required: false,
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
          colSpan: 12,
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
          colSpan: 4,
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
          colSpan: 4,
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
          colSpan: 4,
        },
        revalidate: [],
      },
    ],
    buttonText: ADD_ADDITIONAL_EXPERIENCE,
    parentName: REP_EXPERIENCES_DATA_NAME,
  };
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
        <CustomFormElement
          label={CURRENT_SITUATION_LABEL}
          type="select"
          id={CURRENT_SITUATION_NAME}
          name={CURRENT_SITUATION_NAME}
          register={register}
          selectOptions={currentSituationSelectOptions}
          onChange={onChangeHandler}
          error={errors?.[CURRENT_SITUATION_NAME]}
          disabled={!canEditField(CURRENT_SITUATION_NAME)}
        />
        <CustomFormElement
          label={SOURCE_OF_DISCOVERY_LABEL}
          type="select"
          id={SOURCE_OF_DISCOVERY_NAME}
          name={SOURCE_OF_DISCOVERY_NAME}
          register={register}
          selectOptions={sourceOfDiscoverySelectOptions}
          onChange={onChangeHandler}
          error={errors?.[SOURCE_OF_DISCOVERY_NAME]}
          disabled={!canEditField(SOURCE_OF_DISCOVERY_NAME)}
        />
      </div>
      <ExperienceList
        constants={constants}
        canEditField={canEditField}
        onChangeHandler={onChangeHandler}
        wrapperClassName="mt-6"
      />
    </>
  );
};

RepExperience.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
};

export default RepExperience;
