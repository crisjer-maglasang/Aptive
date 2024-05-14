import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const Code = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={'code'}
      label={'Code'}
      required
      {...props}
    />
  );
};

export default Code;
