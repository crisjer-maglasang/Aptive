import { useFormContext } from 'react-hook-form';
import { CustomFormElement } from '@/components';
import PropTypes from 'prop-types';
import { onboardingConstants } from '@/lib/constants';
import { useCallback, useState } from 'react';

const {
  DIRECT_DEPOSIT_BANK_NAME,
  DIRECT_DEPOSIT_ACCOUNT_NAME,
  DIRECT_DEPOSIT_ACCOUNT_TYPE,
  DIRECT_DEPOSIT_ROUTING_NUMBER,
  DIRECT_DEPOSIT_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_BANK_NAME_LABEL,
  DIRECT_DEPOSIT_ACCOUNT_NAME_LABEL,
  DIRECT_DEPOSIT_ACCOUNT_TYPE_LABEL,
  DIRECT_DEPOSIT_ROUTING_NUMBER_LABEL,
  DIRECT_DEPOSIT_ACCOUNT_NUMBER_LABEL,
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER_LABEL,
} = onboardingConstants;

const radioOptions = [
  {
    label: 'Checking',
    value: 'Checking',
    id: 'directDepositChecking',
  },
  {
    label: 'Savings',
    value: 'Savings',
    id: 'directDepositSavings',
  },
];

const DirectDepositFields = ({ canEditField, onChangeHandler }) => {
  const {
    register,
    formState: { errors, defaultValues },
  } = useFormContext();
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');

  const accountNumberHandler = useCallback(
    (setField) => (event) => {
      setField(event.target.value);
      onChangeHandler(event);
    },
    [onChangeHandler]
  );

  return (
    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
      <CustomFormElement
        colSpan={3}
        id={DIRECT_DEPOSIT_BANK_NAME}
        name={DIRECT_DEPOSIT_BANK_NAME}
        label={DIRECT_DEPOSIT_BANK_NAME_LABEL}
        type="text"
        onChange={onChangeHandler}
        register={register}
        error={errors?.[DIRECT_DEPOSIT_BANK_NAME]}
        disabled={!canEditField(DIRECT_DEPOSIT_BANK_NAME)}
        required
      />
      <CustomFormElement
        colSpan={3}
        id={DIRECT_DEPOSIT_ACCOUNT_NAME}
        name={DIRECT_DEPOSIT_ACCOUNT_NAME}
        label={DIRECT_DEPOSIT_ACCOUNT_NAME_LABEL}
        type="text"
        onChange={onChangeHandler}
        register={register}
        error={errors?.[DIRECT_DEPOSIT_ACCOUNT_NAME]}
        disabled={!canEditField(DIRECT_DEPOSIT_ACCOUNT_NAME)}
        required
      />
      <CustomFormElement
        colSpan={3}
        id={DIRECT_DEPOSIT_ACCOUNT_TYPE}
        name={DIRECT_DEPOSIT_ACCOUNT_TYPE}
        label={DIRECT_DEPOSIT_ACCOUNT_TYPE_LABEL}
        type="radio"
        onChange={onChangeHandler}
        register={register}
        error={errors?.[DIRECT_DEPOSIT_ACCOUNT_TYPE]}
        disabled={!canEditField(DIRECT_DEPOSIT_ACCOUNT_TYPE)}
        radioOptions={radioOptions}
        // checked={}
        orientation="horizontal"
        required
      />
      <CustomFormElement
        colSpan={3}
        id={DIRECT_DEPOSIT_ROUTING_NUMBER}
        name={DIRECT_DEPOSIT_ROUTING_NUMBER}
        label={DIRECT_DEPOSIT_ROUTING_NUMBER_LABEL}
        type="text"
        onChange={onChangeHandler}
        register={register}
        error={errors?.[DIRECT_DEPOSIT_ROUTING_NUMBER]}
        disabled={!canEditField(DIRECT_DEPOSIT_ROUTING_NUMBER)}
        required
      />
      <CustomFormElement
        colSpan={3}
        placeholder={defaultValues[DIRECT_DEPOSIT_ACCOUNT_NUMBER]}
        id={DIRECT_DEPOSIT_ACCOUNT_NUMBER}
        name={DIRECT_DEPOSIT_ACCOUNT_NUMBER}
        label={DIRECT_DEPOSIT_ACCOUNT_NUMBER_LABEL}
        type="text"
        formValue={accountNumber}
        onChange={accountNumberHandler(setAccountNumber)}
        register={register}
        error={errors?.[DIRECT_DEPOSIT_ACCOUNT_NUMBER]}
        disabled={!canEditField(DIRECT_DEPOSIT_ACCOUNT_NUMBER)}
        required
      />
      <CustomFormElement
        colSpan={3}
        placeholder={defaultValues[DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER]}
        id={DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER}
        name={DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER}
        label={DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER_LABEL}
        type="text"
        formValue={confirmAccountNumber}
        onChange={accountNumberHandler(setConfirmAccountNumber)}
        register={register}
        error={errors?.[DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER]}
        disabled={!canEditField(DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER)}
        required
      />
    </div>
  );
};

DirectDepositFields.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
};

export default DirectDepositFields;
