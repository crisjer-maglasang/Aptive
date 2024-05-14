import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

const { EXT_REF, EXT_REF_LABEL } = planBuilderConstants;

const ExternalReference = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      register={register}
      type="text"
      id={EXT_REF}
      name={EXT_REF}
      label={EXT_REF_LABEL}
    />
  );
};

export default ExternalReference;
