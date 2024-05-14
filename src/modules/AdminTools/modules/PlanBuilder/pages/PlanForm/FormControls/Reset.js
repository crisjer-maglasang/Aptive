import { useFormContext } from 'react-hook-form';

import { CustomButton } from '@/components/common';

const Reset = () => {
  const { reset, formState } = useFormContext();
  const { isDirty } = formState;

  return (
    <CustomButton
      disabled={!isDirty}
      color={'white'}
      onClick={() => reset()}
    >
      Reset
    </CustomButton>
  );
};

export default Reset;
