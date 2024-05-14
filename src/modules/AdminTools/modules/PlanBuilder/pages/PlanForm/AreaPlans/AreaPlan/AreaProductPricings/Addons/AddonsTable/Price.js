import PropTypes from 'prop-types';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components';
import { useAreaPlan } from '../../../AreaContext';
import {
  pricingConstants,
  productManagerConstants,
} from '@/modules/AdminTools/lib/constants';

const { RECURRING } = pricingConstants;

const Price = ({ field, index, required }) => {
  const areaPlan = useAreaPlan();

  const formName = (field) => `${areaPlan}.addons[${index}].${field}`;

  const name = formName(field);

  const { register } = useFormContext();
  const isRecurring = useWatch({
    name: formName(productManagerConstants.IS_RECURRING),
  });

  const needsRecurring = RECURRING.includes(field);

  const show = !needsRecurring || (needsRecurring && isRecurring);

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);

  const priceErrors = planErrors?.[`${areaPlan}.addons.${index}.${field}`];

  if (!show) {
    return null;
  }

  return (
    <div className="w-24">
      <CustomFormElement
        type="number"
        id={name}
        {...{ name, register }}
        required={required}
        error={priceErrors}
        min={0}
      />
    </div>
  );
};

Price.propTypes = {
  field: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  required: PropTypes.bool,
};

export default Price;
