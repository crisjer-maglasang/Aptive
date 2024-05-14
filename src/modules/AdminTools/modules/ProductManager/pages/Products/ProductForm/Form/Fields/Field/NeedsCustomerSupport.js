import { useFormContext, useWatch } from 'react-hook-form';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { CustomFormElement } from '@/components';
import { useMemo } from 'react';

const { NEEDS_CUSTOMER_SUPPORT, NEEDS_CUSTOMER_SUPPORT_LABEL } =
  productManagerConstants;

const radioOptions = [
  {
    label: 'Yes',
    value: 'true',
    id: 'needsCustomerSupportTrue',
  },
  {
    label: 'No',
    value: 'false',
    id: 'needsCustomerSupportFalse',
  },
];

const NeedsCustomerSupport = () => {
  const { register, setValue } = useFormContext();
  const needsCustomerSupport = useWatch({ name: NEEDS_CUSTOMER_SUPPORT });

  const needsCustomerSupportCast = useMemo(() => {
    if (typeof needsCustomerSupport !== 'string') {
      return needsCustomerSupport ? 'true' : 'false';
    }

    return needsCustomerSupport;
  }, [needsCustomerSupport]);

  return (
    <CustomFormElement
      label={NEEDS_CUSTOMER_SUPPORT_LABEL}
      type="radio"
      register={register}
      id={NEEDS_CUSTOMER_SUPPORT}
      name={NEEDS_CUSTOMER_SUPPORT}
      radioOptions={radioOptions}
      checked={needsCustomerSupportCast}
      onChange={({ target: { value } }) =>
        setValue(NEEDS_CUSTOMER_SUPPORT, value)
      }
      orientation="horizontal"
      required
    />
  );
};

export default NeedsCustomerSupport;
