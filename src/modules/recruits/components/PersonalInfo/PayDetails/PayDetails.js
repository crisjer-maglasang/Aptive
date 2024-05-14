import { memo } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomFormElement, FormLabel } from '@/components/common';
import { onboardingConstants } from '@/lib';
import { formatCurrencyStringToNumber, formatNumberToCurrencyString } from '@/lib/utils';
import CurrencyInput from '@/components/common/Form/CurrencyInput';

const {
  UPFRONT_PAY_NAME,
  RENT_DEDUCTION_NAME,
  UPFRONT_PAY_LABEL,
  RENT_DEDUCTION_LABEL,
  UNIFORM_DEDUCTION_NAME,
  UNIFORM_DEDUCTION_LABEL,
  RENT_DEDUCTION_REASON_NAME,
  RENT_DEDUCTION_REASON_LABEL,
} = onboardingConstants;

const PayDetails = ({
  canEditField,
  onChangeHandler,
  onBlurTrimSpace,
  showRentNote,
}) => {
  const { control, register, formState: { errors } } = useFormContext();

  const payDetails = [
    {
      label: UPFRONT_PAY_LABEL,
      name: UPFRONT_PAY_NAME,
    },
    {
      label: RENT_DEDUCTION_LABEL,
      name: RENT_DEDUCTION_NAME,
      mask: {
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 2,
        integerLimit: 7,
      },
    },
    {
      label: UNIFORM_DEDUCTION_LABEL,
      name: UNIFORM_DEDUCTION_NAME,
    },
  ];

  return (
    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-4">
      {payDetails.map(({ label, name, mask }) => (
        <div key={name} className="sm:col-span-2">
          <FormLabel label={label} htmlFor={name} />
          <Controller
            name={name}
            control={control}
            render={({ field: { value } }) => (
              <CurrencyInput
                id={name}
                name={name}
                value={value}
                mask={mask}
                onChange={onChangeHandler}
                onBlur={(event) => {
                  onChangeHandler({
                    target: {
                      name,
                      value: formatNumberToCurrencyString(
                        formatCurrencyStringToNumber(event.target.value),
                        mask?.decimalLimit ?? 0,
                      ),
                    },
                    type: event.type,
                  });
                }}
                disabled={!canEditField(name)}
              />
            )}
          />
        </div>
      ))}

      {showRentNote && (
        <div className="sm:col-span-4 row-start-2 row-end-3">
          <CustomFormElement
            id={RENT_DEDUCTION_REASON_NAME}
            name={RENT_DEDUCTION_REASON_NAME}
            label={RENT_DEDUCTION_REASON_LABEL}
            type="textArea"
            rows={3}
            onChange={onChangeHandler}
            onBlur={(event) => onBlurTrimSpace(event, RENT_DEDUCTION_REASON_NAME)}
            register={register}
            error={errors[RENT_DEDUCTION_REASON_NAME]}
            required
            disabled={!canEditField(RENT_DEDUCTION_REASON_NAME)}
          />
        </div>
      )}
    </div>
  );
};

PayDetails.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  onBlurTrimSpace: PropTypes.func,
  showRentNote: PropTypes.bool,
};

export default memo(PayDetails);
