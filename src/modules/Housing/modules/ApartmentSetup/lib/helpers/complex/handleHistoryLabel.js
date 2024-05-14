import { camelCase } from 'lodash-es';
import { apartmentSetupConstants } from '@/modules/Housing/lib';

const {
  COMPLEX_LABEL,
  DEALER_LABEL,
  COMPLEX_TYPE_LABEL,
  EMAIL_LABEL,
  STATE_LABEL,
  ZIP_LABEL,
  CITY_LABEL,
  PHONE_LABEL,
  STREET_ADDRESS_LABEL,
  CONTACT_PERSON_LABEL,
  TEAMS_LABEL,
} = apartmentSetupConstants;

const fieldLabels = {
  email: EMAIL_LABEL,
  name: COMPLEX_LABEL,
  team_ids: TEAMS_LABEL,
  phone_number: PHONE_LABEL,
  contact: CONTACT_PERSON_LABEL,
  ['address.state']: STATE_LABEL,
  ['address.city']: CITY_LABEL,
  ['address.street']: STREET_ADDRESS_LABEL,
  ['address.zip']: ZIP_LABEL,
  dealer_id: DEALER_LABEL,
  type: COMPLEX_TYPE_LABEL,
};

const handleHistoryLabel = (key) => fieldLabels[key] ?? camelCase(key);

export default handleHistoryLabel;
