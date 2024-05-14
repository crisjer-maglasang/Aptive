import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CustomFormElement } from '@/components/common';
import { maritalStatusRadioConfig, onboardingConstants } from '@/lib';
import { ChildRadioGroupWrapper } from '../../common';
import { addFsExcludeClass } from '@/lib/utils';
import { CustomErrorMessage } from '@/components/common/Form';

const {
  MARITAL_STATUS_LABEL,
  IS_MARRIED,
  SPOUSE_FIRST_NAME_LABEL,
  SPOUSE_LAST_NAME_LABEL,
  SPOUSE_FIRST_NAME,
  SPOUSE_LAST_NAME,
} = onboardingConstants;

const MarriageInformation = ({
  canEditField,
  onChangeHandler,
  onBlurTrimSpace,
}) => {
  const { register, getValues, formState: { errors } } = useFormContext();

  const { isMarried } = getValues();

  return (
    <div>
      <CustomFormElement
        label={MARITAL_STATUS_LABEL}
        type="radio"
        id={IS_MARRIED}
        name={IS_MARRIED}
        register={register}
        radioOptions={maritalStatusRadioConfig}
        onChange={onChangeHandler}
        orientation="horizontal"
        required
        disabled={!canEditField(IS_MARRIED)}
        isOpen={isMarried === maritalStatusRadioConfig[0].value}
      />
      {isMarried === maritalStatusRadioConfig[0].value ? (
        <ChildRadioGroupWrapper>
          <div className="flex flex-row w-full px-3 py-4 space-x-5 bg-gray-50">
            <div className="flex-1 mt-1">
              <CustomFormElement
                colSpan={6}
                id={SPOUSE_FIRST_NAME}
                name={SPOUSE_FIRST_NAME}
                label={SPOUSE_FIRST_NAME_LABEL}
                type="text"
                onChange={onChangeHandler}
                onBlur={(event) => onBlurTrimSpace(event, SPOUSE_FIRST_NAME)}
                register={register}
                error={errors?.spouseFirstName}
                required
                className={addFsExcludeClass()}
                disabled={!canEditField(SPOUSE_FIRST_NAME)}
              />
            </div>
            <div className="flex-1 mt-1">
              <CustomFormElement
                colSpan={6}
                id={SPOUSE_LAST_NAME}
                name={SPOUSE_LAST_NAME}
                label={SPOUSE_LAST_NAME_LABEL}
                type="text"
                onChange={onChangeHandler}
                onBlur={(event) => onBlurTrimSpace(event, SPOUSE_LAST_NAME)}
                register={register}
                error={errors?.spouseLastName}
                required
                className={addFsExcludeClass()}
                disabled={!canEditField(SPOUSE_LAST_NAME)}
              />
            </div>
          </div>
        </ChildRadioGroupWrapper>
      ) : null}
      {errors?.isMarried?.message && (
        <CustomErrorMessage text={errors?.isMarried?.message} />
      )}
    </div>
  );
};

MarriageInformation.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  onBlurTrimSpace: PropTypes.func,
};

export default MarriageInformation;
