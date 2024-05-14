import { formatPhone } from '@/lib/utils';
import { apartmentSetupConstants } from '@/modules/Housing/lib';

const {
  COMPLEX_NAME,
  DEALER_NAME,
  COMPLEX_TYPE_NAME,
  EMAIL_NAME,
  STATE_NAME,
  ZIP_NAME,
  CITY_NAME,
  PHONE_NAME,
  STREET_ADDRESS_NAME,
  CONTACT_PERSON_NAME,
  TEAMS_NAME,
} = apartmentSetupConstants;

export const normalizeComplexData = (data) => {
  return {
    id: data.id,
    is_archived: data.isDeleted,
    [COMPLEX_NAME]: data.name ?? '',
    [DEALER_NAME]: data.dealer_id ?? '',
    [COMPLEX_TYPE_NAME]: data.type ?? '',
    [EMAIL_NAME]: data.email ?? '',
    [STATE_NAME]: data.address?.state ?? '',
    [ZIP_NAME]: data.address?.zip ?? '',
    [CITY_NAME]: data.address?.city ?? '',
    [PHONE_NAME]: data.phone ? formatPhone(data.phone) : '',
    [STREET_ADDRESS_NAME]: data.address?.street ?? '',
    [CONTACT_PERSON_NAME]: data.contact ?? '',
    [TEAMS_NAME]: data.teamIds ? data.teamIds.map(Number) : [],
  };
};
