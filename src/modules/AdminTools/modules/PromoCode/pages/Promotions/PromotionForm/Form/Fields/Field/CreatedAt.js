import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const CreatedAt = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={'created_at'}
      label={'Created At'}
      required
    />
  );
};

export default CreatedAt;
