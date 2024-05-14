import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const UpdatedBy = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={'updated_by'}
      label={'Updated By'}
      required
    />
  );
};

export default UpdatedBy;
