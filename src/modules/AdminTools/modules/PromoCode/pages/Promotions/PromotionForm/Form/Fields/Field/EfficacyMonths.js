import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const EfficacyMonths = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'efficacy_months'}
      label={'Efficacy Months'}
      required
      type="number"
      min={0}
      step="1"
      {...props}
    />
  );
};

export default EfficacyMonths;
