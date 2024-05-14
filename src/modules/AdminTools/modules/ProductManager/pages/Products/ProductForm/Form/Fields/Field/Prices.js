import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormContext, useWatch } from 'react-hook-form';

import { CustomFormElement } from '@/components';
import {
  pricingConstants,
  productManagerConstants,
} from '@/modules/AdminTools/lib/constants';
import { useMemo } from 'react';

const { PRICES, RECURRING } = pricingConstants;

const { IS_RECURRING } = productManagerConstants;

const Price = ({ name, label }) => {
  const { register } = useFormContext();

  const productErrors = useSelector(
    (state) => state?.errors?.errors?.productsUpdate
  );

  const error = productErrors?.[name];

  const isRecurring = RECURRING.includes(name);

  const recurringVal = useWatch({ name: IS_RECURRING });

  const shouldShow = useMemo(() => {
    if (!isRecurring) {
      return true;
    }

    if (typeof recurringVal === 'string') {
      return recurringVal === 'true';
    } else {
      return recurringVal;
    }
  }, [recurringVal, isRecurring]);

  if (!shouldShow) {
    return null;
  }

  return (
    <CustomFormElement
      {...{ register, name, label, error }}
      type="number"
      min={0}
      required
    />
  );
};

Price.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const prices = PRICES.map(({ label, id }) => () => (
  <Price label={label} name={id} />
));

export default prices;
