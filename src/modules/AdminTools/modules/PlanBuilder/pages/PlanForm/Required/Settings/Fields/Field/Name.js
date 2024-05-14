import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

const { NAME, NAME_LABEL } = planBuilderConstants;

const Name = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      register={register}
      type="text"
      id={NAME}
      name={NAME}
      label={NAME_LABEL}
      required
    />
  );
};

export default Name;
