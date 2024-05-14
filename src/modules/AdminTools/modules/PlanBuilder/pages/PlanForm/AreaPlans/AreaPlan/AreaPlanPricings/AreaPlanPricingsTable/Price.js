import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components';
import { useAreaPlan } from '../../AreaContext';

const Price = ({ field, index, required }) => {
  const areaPlan = useAreaPlan();
  const name = `${areaPlan}.area_plan_pricings[${index}].${field}`;

  const { register } = useFormContext();

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);

  const priceErrors =
    planErrors?.[`${areaPlan}.area_plan_pricings.${index}.${field}`];

  return (
    <div className="w-24">
      <CustomFormElement
        type="number"
        label={''}
        name={name}
        id={name}
        register={register}
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
