import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';

const MaxUsagePerCampaign = (props) => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      name={'max_usage_per_campaign'}
      label={'Max Usage Per Campaign'}
      required
      type="number"
      min={0}
      step="1"
      {...props}
    />
  );
};

export default MaxUsagePerCampaign;
