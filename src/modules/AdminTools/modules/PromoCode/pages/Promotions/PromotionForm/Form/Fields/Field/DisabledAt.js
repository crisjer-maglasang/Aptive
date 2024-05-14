import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const DisabledAt = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={'disabled_at'}
      label={'Disabled At'}
      required
    />
  );
};

export default DisabledAt;
