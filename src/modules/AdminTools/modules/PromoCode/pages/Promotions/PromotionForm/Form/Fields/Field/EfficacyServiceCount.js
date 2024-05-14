import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const EfficacyServiceCount = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'efficacy_service_count'}
      label={'Efficacy Service Count'}
      required
      type="number"
      min={0}
      step="1"
      {...props}
    />
  );
};

export default EfficacyServiceCount;
