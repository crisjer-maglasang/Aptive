import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';

const { DESCRIPTION, DESCRIPTION_LABEL } = productManagerConstants;

const Description = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="textArea"
      name={DESCRIPTION}
      label={DESCRIPTION_LABEL}
    />
  );
};

export default Description;
