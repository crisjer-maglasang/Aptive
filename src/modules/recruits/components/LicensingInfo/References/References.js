import { CustomFormElement, PhoneNumber } from '@/components/common';
import { onboardingConstants } from '@/lib/constants';
import PropTypes from 'prop-types';
import { EditableFormGroupList } from '../';
import { validationSchema } from './newReferenceValidationSchema';

const {
  REFERENCE_NAME,
  REFERENCES_NAME_LABEL,
  REFERENCE_RELATION,
  RELATION_LABEL,
  REFERENCE_PHONE_NUMBER,
  PHONE_NUMBER_LABEL,
  ADD_REFERENCE,
  REFERENCE_DATA,
} = onboardingConstants;

const References = ({
  isAdmin,
  isPersonalWizard,
  canEditField,
}) => {
  const constants = {
    fields: [
      {
        component: CustomFormElement,
        name: REFERENCE_NAME,
        props: {
          label: REFERENCES_NAME_LABEL,
          type: 'text',
          required: true,
        },
        revalidate: [],
      },
      {
        component: CustomFormElement,
        name: REFERENCE_RELATION,
        props: {
          label: RELATION_LABEL,
          type: 'text',
          required: true,
        },
        revalidate: [],
      },
      {
        component: PhoneNumber,
        name: REFERENCE_PHONE_NUMBER,
        label: PHONE_NUMBER_LABEL,
        props: {
          label: PHONE_NUMBER_LABEL,
          required: true,
        },
        revalidate: [],
      },
    ],
    buttonText: ADD_REFERENCE,
    parentName: REFERENCE_DATA,
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

References.propTypes = {
  isAdmin: PropTypes.bool,
  isPersonalWizard: PropTypes.bool,
  canEditField: PropTypes.func,
};

export default References;
