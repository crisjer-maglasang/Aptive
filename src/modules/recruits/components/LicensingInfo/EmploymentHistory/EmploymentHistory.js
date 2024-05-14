import { CustomFormElement } from '@/components/common';
import { onboardingConstants } from '@/lib/constants';
import PropTypes from 'prop-types';
import { EditableFormGroupList } from '../';
import { validationSchema } from './newEmployerValidationSchema';

const {
  EMPLOYER_NAME,
  EMPLOYER_LABEL,
  START_DATE_LABEL,
  EMPLOYER_START_DATE,
  EMPLOYER_END_DATE,
  END_DATE_LABEL,
  ADD_EMPLOYER,
  EMPLOYMENT_DATA,
} = onboardingConstants;

const minDate = new Date(`${(new Date().getFullYear() - 10)}-01-01T00:00:00`);
const maxDate = new Date();

const EmploymentHistory = ({
  isAdmin,
  isPersonalWizard,
  canEditField,
}) => {
  const constants = {
    fields: [
      {
        component: CustomFormElement,
        name: EMPLOYER_NAME,
        props: {
          label: EMPLOYER_LABEL,
          type: 'text',
          required: true,
        },
        revalidate: [],
      },
      {
        component: CustomFormElement,
        name: EMPLOYER_START_DATE,
        props: {
          label: START_DATE_LABEL,
          type: 'date',
          required: true,
          minDate: minDate,
          maxDate: maxDate,
          showYearDropdown: true,
        },
        revalidate: [EMPLOYER_END_DATE],
      },
      {
        component: CustomFormElement,
        name: EMPLOYER_END_DATE,
        props: {
          label: END_DATE_LABEL,
          type: 'date',
          required: true,
          minDate: minDate,
          maxDate: maxDate,
          showYearDropdown: true,
        },
        revalidate: [],
      },
    ],
    buttonText: ADD_EMPLOYER,
    parentName: EMPLOYMENT_DATA,
  };

  return (
    <EditableFormGroupList
      isAdmin={isAdmin}
      isPersonalWizard={isPersonalWizard}
      canEditField={canEditField}
      constants={constants}
      validationSchema={validationSchema}
    />
  );
};

EmploymentHistory.propTypes = {
  isAdmin: PropTypes.bool,
  isPersonalWizard: PropTypes.bool,
  canEditField: PropTypes.func,
};

export default EmploymentHistory;
