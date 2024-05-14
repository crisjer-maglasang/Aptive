import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const DisabledBy = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={'disabled_by'}
      label={'Disabled By'}
      required
    />
  );
};

export default DisabledBy;
