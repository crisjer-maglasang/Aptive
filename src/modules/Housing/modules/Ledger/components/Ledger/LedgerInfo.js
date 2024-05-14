import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { addFsExcludeClass } from '@/lib/utils';
import { CustomFormElement } from '@/components';
import { defaultSelectOption, ledgerConstants } from '@/modules/Housing/lib';

const {
  DEALER_NAME,
  DEALER_LABEL,
  BRANCH_NAME,
  BRANCH_LABEL,
  TEAM_NAME,
  TEAM_LABEL,
  PARTNERSHIP_NAME,
  PARTNERSHIP_LABEL,
  APARTMENT_IDS_NAME,
  APARTMENT_ID_LABEL,
  APARTMENT_ID_NAME,
  VENDOR_NAME,
  VENDOR_LABEL,
  PAYEE_NAME,
  PAYEE_LABEL,
  PAYMENT_TYPE_NAME,
  PAYMENT_TYPE_LABEL,
  PAYMENT_METHOD_NAME,
  PAYMENT_METHOD_LABEL,
  AMOUNT_TO_PAY_NAME,
  AMOUNT_TO_PAY_LABEL,
  FURNITURE_DAMAGED_NAME,
  FURNITURE_DAMAGED_LABEL,
  REP_UTILITIES_NAME,
  REP_UTILITIES_LABEL,
  APARTMENT_CHARGES_NAME,
  APARTMENT_CHARGES_LABEL,
  AMOUNT_PAID_NAME,
  AMOUNT_PAID_LABEL,
  DATE_PAID_NAME,
  DATE_PAID_LABEL,
  DATE_DUE_NAME,
  DATE_DUE_LABEL,
} = ledgerConstants;

const LedgerInfo = ({
  ledgerId,
  branches,
  apartments,
  teams,
  dealers,
  partnerships,
  paymentMethods,
  paymentTypes,
  onTeamChange,
  onBranchChange,
  onDealerChange,
  onChangeHandler,
  canEditField,
}) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();
  const {
    apartment_id,
    apartment_ids,
    amount_paid,
    amount_to_pay,
    furniture_damaged,
    rep_utilities,
    apartment_charges,
  } = getValues();

  return (
    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
      <CustomFormElement
        colSpan={3}
        id={DEALER_NAME}
        name={DEALER_NAME}
        label={DEALER_LABEL}
        type="select"
        selectOptions={[...defaultSelectOption, ...dealers]}
        onChange={onDealerChange}
        register={register}
        error={errors?.[DEALER_NAME]}
        disabled={!canEditField(DEALER_NAME)}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={BRANCH_NAME}
        name={BRANCH_NAME}
        label={BRANCH_LABEL}
        type="select"
        selectOptions={[...defaultSelectOption, ...branches]}
        onChange={onBranchChange}
        register={register}
        error={errors?.branch_id}
        disabled={!canEditField(BRANCH_NAME)}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={TEAM_NAME}
        name={TEAM_NAME}
        label={TEAM_LABEL}
        type="select"
        selectOptions={[...defaultSelectOption, ...teams]}
        onChange={onTeamChange}
        register={register}
        error={errors?.team_id}
        disabled={!canEditField(TEAM_NAME)}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={PARTNERSHIP_NAME}
        name={PARTNERSHIP_NAME}
        label={PARTNERSHIP_LABEL}
        type="select"
        selectOptions={[...defaultSelectOption, ...partnerships]}
        onChange={onChangeHandler}
        register={register}
        error={errors?.partnership_id}
        disabled={!canEditField(PARTNERSHIP_NAME)}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={ledgerId ? APARTMENT_ID_NAME : APARTMENT_IDS_NAME}
        name={ledgerId ? APARTMENT_ID_NAME : APARTMENT_IDS_NAME}
        label={APARTMENT_ID_LABEL}
        type="multiSelect"
        isMulti={!ledgerId}
        options={apartments}
        onChange={onChangeHandler}
        value={ledgerId ? apartment_id : apartment_ids}
        register={register}
        error={errors?.[ledgerId ? APARTMENT_ID_NAME : APARTMENT_IDS_NAME]}
        disabled={
          !canEditField(ledgerId ? APARTMENT_ID_NAME : APARTMENT_IDS_NAME)
        }
        required
        className={addFsExcludeClass()}
        styles={{
          singleValue: (provided) => ({ ...provided, color: 'black' }),
        }}
        formElementWrapperClassName="text-black"
      />
      <CustomFormElement
        colSpan={3}
        id={VENDOR_NAME}
        name={VENDOR_NAME}
        label={VENDOR_LABEL}
        type="text"
        onChange={onChangeHandler}
        register={register}
        disabled={!canEditField(VENDOR_NAME)}
        error={errors?.vendor_number}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={PAYMENT_TYPE_NAME}
        name={PAYMENT_TYPE_NAME}
        label={PAYMENT_TYPE_LABEL}
        type="select"
        selectOptions={paymentTypes}
        onChange={onChangeHandler}
        register={register}
        disabled={!canEditField(PAYMENT_TYPE_NAME)}
        error={errors?.payment_type_id}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={PAYMENT_METHOD_NAME}
        name={PAYMENT_METHOD_NAME}
        label={PAYMENT_METHOD_LABEL}
        type="select"
        selectOptions={paymentMethods}
        onChange={onChangeHandler}
        register={register}
        disabled={!canEditField(PAYMENT_METHOD_NAME)}
        error={errors?.payment_method_id}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        label={PAYEE_LABEL}
        id={PAYEE_NAME}
        name={PAYEE_NAME}
        type="text"
        register={register}
        disabled={!canEditField(PAYEE_NAME)}
        error={errors?.[PAYEE_NAME]}
        onChange={onChangeHandler}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={AMOUNT_TO_PAY_NAME}
        name={AMOUNT_TO_PAY_NAME}
        label={AMOUNT_TO_PAY_LABEL}
        type="currency"
        value={amount_to_pay?.toString()}
        mask={{
          allowNegative: true,
          allowDecimal: true,
          decimalSymbol: '.',
          decimalLimit: 2,
        }}
        onChange={onChangeHandler}
        register={register}
        disabled={!canEditField(AMOUNT_TO_PAY_NAME)}
        error={errors?.amount_to_pay}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={FURNITURE_DAMAGED_NAME}
        name={FURNITURE_DAMAGED_NAME}
        label={FURNITURE_DAMAGED_LABEL}
        type="currency"
        value={furniture_damaged?.toString()}
        mask={{
          allowNegative: true,
          allowDecimal: true,
          decimalSymbol: '.',
          decimalLimit: 2,
        }}
        onChange={onChangeHandler}
        register={register}
        disabled={!canEditField(FURNITURE_DAMAGED_NAME)}
        error={errors?.furniture_damaged}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={REP_UTILITIES_NAME}
        name={REP_UTILITIES_NAME}
        label={REP_UTILITIES_LABEL}
        type="currency"
        value={rep_utilities?.toString()}
        mask={{
          allowNegative: true,
          allowDecimal: true,
          decimalSymbol: '.',
          decimalLimit: 2,
        }}
        onChange={onChangeHandler}
        register={register}
        disabled={!canEditField(REP_UTILITIES_NAME)}
        error={errors?.rep_utilities}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={APARTMENT_CHARGES_NAME}
        name={APARTMENT_CHARGES_NAME}
        label={APARTMENT_CHARGES_LABEL}
        type="currency"
        value={apartment_charges?.toString()}
        mask={{
          allowDecimal: true,
          decimalSymbol: '.',
          decimalLimit: 2,
          allowNegative: true,
        }}
        onChange={onChangeHandler}
        register={register}
        disabled={!canEditField(APARTMENT_CHARGES_NAME)}
        error={errors?.apartment_charges}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={AMOUNT_PAID_NAME}
        name={AMOUNT_PAID_NAME}
        label={AMOUNT_PAID_LABEL}
        type="currency"
        value={amount_paid?.toString()}
        mask={{
          allowNegative: true,
          allowDecimal: true,
          decimalSymbol: '.',
          decimalLimit: 2,
        }}
        onChange={onChangeHandler}
        register={register}
        disabled={!canEditField(AMOUNT_PAID_NAME)}
        error={errors?.amount_paid}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={DATE_PAID_NAME}
        name={DATE_PAID_NAME}
        label={DATE_PAID_LABEL}
        type="date"
        onChange={onChangeHandler}
        showYearDropdown
        register={register}
        disabled={!canEditField(DATE_PAID_NAME)}
        error={errors?.date_paid}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={DATE_DUE_NAME}
        name={DATE_DUE_NAME}
        label={DATE_DUE_LABEL}
        type="date"
        onChange={onChangeHandler}
        showYearDropdown
        register={register}
        disabled={!canEditField(DATE_DUE_NAME)}
        error={errors?.date_due}
        className={addFsExcludeClass()}
      />
    </div>
  );
};

LedgerInfo.propTypes = {
  canEditField: PropTypes.func,
  dealers: PropTypes.array,
  teams: PropTypes.array,
  branches: PropTypes.array,
  apartments: PropTypes.array,
  paymentMethods: PropTypes.array,
  paymentTypes: PropTypes.array,
  partnerships: PropTypes.array,
  onDealerChange: PropTypes.func,
  onTeamChange: PropTypes.func,
  onBranchChange: PropTypes.func,
  onChangeHandler: PropTypes.func,
  ledgerId: PropTypes.number,
};

export default LedgerInfo;
