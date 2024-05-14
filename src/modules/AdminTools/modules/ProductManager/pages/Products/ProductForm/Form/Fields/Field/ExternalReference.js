import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';

const {
  EXT_REF,
  EXT_REF_LABEL,
} = productManagerConstants;

const ExternalReference = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={EXT_REF}
      label={EXT_REF_LABEL}
    />
  );
};

export default ExternalReference;
