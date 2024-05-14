import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const ReferralValue = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'referral_value'}
      label={'Referral $'}
      required
      type="number"
      min={0}
      step="0.01"
      {...props}
    />
  );
};

export default ReferralValue;
