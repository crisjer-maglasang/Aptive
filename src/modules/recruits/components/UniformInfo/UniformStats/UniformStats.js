import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CustomFormElement, Icon } from '@/components/common';
import {
  onboardingConstants,
  hatSizeSelectOptions,
  jacketSizeSelectOptions,
  shirtSizeSelectOptions,
  shoeSizeSelectOptions,
  waistSizeSelectOptions,
} from '@/lib';

const {
  SHIRT_SIZE_LABEL,
  WAIST_SIZE_LABEL,
  JACKET_SIZE_LABEL,
  HAT_SIZE_LABEL,
  SHOE_SIZE_LABEL,
  SHIRT_SIZE,
  JACKET_SIZE,
  WAIST_SIZE,
  HAT_SIZE,
  SHOE_SIZE,
} = onboardingConstants;

const UniformStats = ({
  canEditField,
  onChangeHandler,
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="w-1/4">
      <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
        <Icon icon="shirt" />
        <div className="w-60">
          <CustomFormElement
            colSpan={2}
            id={SHIRT_SIZE}
            name={SHIRT_SIZE}
            label={SHIRT_SIZE_LABEL}
            type="select"
            selectOptions={shirtSizeSelectOptions}
            onChange={onChangeHandler}
            register={register}
            error={errors?.shirtSize}
            required
            disabled={!canEditField(SHIRT_SIZE)}
          />
        </div>

        <Icon icon="hoodie" />
        <div className="w-60">
          <CustomFormElement
            colSpan={2}
            id={JACKET_SIZE}
            name={JACKET_SIZE}
            label={JACKET_SIZE_LABEL}
            type="select"
            selectOptions={jacketSizeSelectOptions}
            onChange={onChangeHandler}
            register={register}
            error={errors?.jacketSize}
            required
            disabled={!canEditField(JACKET_SIZE)}
          />
        </div>

        <Icon icon="pants" />
        <div className="w-60">
          <CustomFormElement
            colSpan={2}
            id={WAIST_SIZE}
            name={WAIST_SIZE}
            label={WAIST_SIZE_LABEL}
            type="select"
            selectOptions={waistSizeSelectOptions}
            onChange={onChangeHandler}
            register={register}
            error={errors?.waistSize}
            required
            disabled={!canEditField(WAIST_SIZE)}
          />
        </div>

        <Icon icon="hat" />
        <div className="w-60">
          <CustomFormElement
            colSpan={2}
            id={HAT_SIZE}
            name={HAT_SIZE}
            label={HAT_SIZE_LABEL}
            type="select"
            selectOptions={hatSizeSelectOptions}
            onChange={onChangeHandler}
            register={register}
            error={errors?.hatSize}
            required
            disabled={!canEditField(HAT_SIZE)}
          />
        </div>

        <Icon icon="shoe" />
        <div className="w-60">
          <CustomFormElement
            colSpan={2}
            id={SHOE_SIZE}
            name={SHOE_SIZE}
            label={SHOE_SIZE_LABEL}
            type="select"
            selectOptions={shoeSizeSelectOptions}
            onChange={onChangeHandler}
            register={register}
            error={errors?.shoeSize}
            required
            disabled={!canEditField(SHOE_SIZE)}
          />
        </div>
      </div>
    </div>
  );
};

UniformStats.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
};

export default UniformStats;
