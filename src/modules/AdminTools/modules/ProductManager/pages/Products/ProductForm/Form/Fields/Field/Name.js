import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';

const { NAME, NAME_LABEL } = productManagerConstants;

const Name = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={NAME}
      label={NAME_LABEL}
      required
    />
  );
};

export default Name;
