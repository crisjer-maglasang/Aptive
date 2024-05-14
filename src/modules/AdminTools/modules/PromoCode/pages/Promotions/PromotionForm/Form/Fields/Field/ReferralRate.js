import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const ReferralRate = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'referral_rate'}
      label={'Referral %'}
      required
      type="number"
      min={0}
      step="1"
      {...props}
    />
  );
};

export default ReferralRate;
