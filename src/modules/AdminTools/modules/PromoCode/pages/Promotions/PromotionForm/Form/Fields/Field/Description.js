import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const Description = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="textArea"
      name={'description'}
      label={'Notes'}
      {...props}
    />
  );
};

export default Description;
