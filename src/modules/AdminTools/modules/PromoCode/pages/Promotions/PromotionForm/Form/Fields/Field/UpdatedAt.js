import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const UpdatedAt = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={'updated_at'}
      label={'Updated At'}
      required
    />
  );
};

export default UpdatedAt;
