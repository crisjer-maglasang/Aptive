import { useStableCallback } from '@/hooks';
import { apartmentSetupConstants } from '@/modules/Housing/lib';

const {
  CITY_NAME,
  STATE_NAME,
  ZIP_NAME,
} = apartmentSetupConstants;

const useApartmentEditable = ({
  isArchived,
}) => {
  return useStableCallback((fieldName) => {
    const isComplexAddressField = [
      CITY_NAME,
      STATE_NAME,
      ZIP_NAME,
    ].includes(fieldName);

    if (isArchived) {
      return false;
    }

    return !isComplexAddressField;
  });
};

export default useApartmentEditable;
