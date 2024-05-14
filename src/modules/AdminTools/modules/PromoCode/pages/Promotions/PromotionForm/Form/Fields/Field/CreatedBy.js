import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const CreatedBy = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={'created_by'}
      label={'Created By'}
      required
    />
  );
};

export default CreatedBy;
