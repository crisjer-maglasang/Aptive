import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFsExcludeClass } from '@/lib/utils';
import { addressesRadioConfig, defaultSelectOption } from '@/lib/configs';
import { ChildRadioGroupWrapper } from '../../common';
import { CustomFormElement, PostalCode } from '@/components/common';
import { CustomErrorMessage } from '@/components/common/Form';
import { onboardingConstants } from '@/lib';
import { selectCountries, selectStates } from '@/redux/addresses';

const {
  ADDRESS_ONE,
  STREET_ADDRESS_LABEL,
  ADDRESS_CITY,
  CITY_LABEL,
  ADDRESS_STATE,
  STATE_PROVINCE_LABEL,
  ADDRESS_ZIP,
  ZIP_POSTAL_LABEL,
  SHOW_CURRENT_ADDRESS_LABEL,
  IS_CURRENT_ADDRESS_DIFFER,
  CURRENT_ADDRESS_ONE,
  CURRENT_STREET_ADDRESS_LABEL,
  CURRENT_ADDRESS_CITY,
  CURRENT_ADDRESS_STATE,
  CURRENT_ADDRESS_ZIP,
  ADDRESS_COUNTRY,
  CURRENT_ADDRESS_COUNTRY,
  COUNTRY_LABEL,
} = onboardingConstants;

const AddressInformation = ({
  canEditField,
  onChangeHandler,
  onBlurTrimSpace,
  countries,
  states,
}) => {
  const { register, getValues, formState: { errors } } = useFormContext();

  const {
    addressCountry,
    isDifferentAddress,
    currentAddressCountry,
  } = getValues();

  const countriesOptions = useMemo(() => ([
    ...defaultSelectOption,
    ...countries,
  ]), [countries]);

  const addressStates = useMemo(() => {
    const countryStates = states?.[addressCountry] ?? [];

    return [...defaultSelectOption, ...countryStates];
  }, [addressCountry, states]);

  const currentAddressStates = useMemo(() => {
    const countryStates = states?.[currentAddressCountry] ?? [];

    return [...defaultSelectOption, ...countryStates];
  }, [currentAddressCountry, states]);

  return (
    <>
      <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
        <CustomFormElement
          colSpan={6}
          id={ADDRESS_ONE}
          name={ADDRESS_ONE}
          label={STREET_ADDRESS_LABEL}
          type="text"
          onChange={onChangeHandler}
          onBlur={(event) => onBlurTrimSpace(event, ADDRESS_ONE)}
          register={register}
          error={errors?.addressOne}
          required
          className={addFsExcludeClass()}
          disabled={!canEditField(ADDRESS_ONE)}
        />
        <CustomFormElement
          colSpan={3}
          id={ADDRESS_CITY}
          name={ADDRESS_CITY}
          label={CITY_LABEL}
          type="text"
          onChange={onChangeHandler}
          onBlur={(event) => onBlurTrimSpace(event, ADDRESS_CITY)}
          register={register}
          error={errors?.addressCity}
          required
          disabled={!canEditField(ADDRESS_CITY)}
        />
        <CustomFormElement
          colSpan={3}
          id={ADDRESS_COUNTRY}
          name={ADDRESS_COUNTRY}
          label={COUNTRY_LABEL}
          type="select"
          selectOptions={countriesOptions}
          onChange={onChangeHandler}
          register={register}
          error={errors?.addressCountry}
          required
          disabled={!canEditField(ADDRESS_COUNTRY)}
        />
        <PostalCode
          colSpan={3}
          id={ADDRESS_ZIP}
          name={ADDRESS_ZIP}
          label={ZIP_POSTAL_LABEL}
          onChange={onChangeHandler}
          register={register}
          error={errors?.addressZip}
          required
          className={addFsExcludeClass()}
          disabled={!canEditField(ADDRESS_ZIP)}
        />
        <CustomFormElement
          colSpan={3}
          id={ADDRESS_STATE}
          name={ADDRESS_STATE}
          label={STATE_PROVINCE_LABEL}
          type="select"
          selectOptions={addressStates}
          onChange={onChangeHandler}
          register={register}
          error={errors?.addressState}
          required
          disabled={!canEditField(ADDRESS_STATE)}
        />
      </div>
      <div className="mt-8">
        <CustomFormElement
          label={SHOW_CURRENT_ADDRESS_LABEL}
          type="radio"
          id={IS_CURRENT_ADDRESS_DIFFER}
          name={IS_CURRENT_ADDRESS_DIFFER}
          register={register}
          radioOptions={addressesRadioConfig}
          onChange={onChangeHandler}
          orientation="horizontal"
          required
          isOpen={isDifferentAddress === addressesRadioConfig[0].value}
          disabled={!canEditField(IS_CURRENT_ADDRESS_DIFFER)}
        />
        {isDifferentAddress === addressesRadioConfig[0].value && (
          <ChildRadioGroupWrapper>
            <div className="w-full grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
              <CustomFormElement
                colSpan={6} id={CURRENT_ADDRESS_ONE}
                name={CURRENT_ADDRESS_ONE}
                label={CURRENT_STREET_ADDRESS_LABEL}
                type="text"
                onChange={onChangeHandler}
                onBlur={(event) => onBlurTrimSpace(event, CURRENT_ADDRESS_ONE)}
                register={register}
                error={errors?.currentAddressOne}
                required
                className={addFsExcludeClass()}
                disabled={!canEditField(CURRENT_ADDRESS_ONE)}
              />
              <CustomFormElement
                colSpan={3}
                id={CURRENT_ADDRESS_CITY}
                name={CURRENT_ADDRESS_CITY}
                label={CITY_LABEL}
                type="text"
                onChange={onChangeHandler}
                onBlur={(event) => onBlurTrimSpace(event, CURRENT_ADDRESS_CITY)}
                register={register}
                error={errors?.currentAddressCity}
                required
                disabled={!canEditField(CURRENT_ADDRESS_CITY)}
              />
              <CustomFormElement
                colSpan={3}
                id={CURRENT_ADDRESS_COUNTRY}
                name={CURRENT_ADDRESS_COUNTRY}
                label={COUNTRY_LABEL}
                type="select"
                selectOptions={countriesOptions}
                onChange={onChangeHandler}
                register={register}
                error={errors?.currentAddressCountry}
                required
                disabled={!canEditField(CURRENT_ADDRESS_COUNTRY)}
              />
              <PostalCode
                colSpan={3}
                id={CURRENT_ADDRESS_ZIP}
                name={CURRENT_ADDRESS_ZIP}
                label={ZIP_POSTAL_LABEL}
                onChange={onChangeHandler}
                register={register}
                error={errors?.currentAddressZip}
                required
                className={addFsExcludeClass()}
                disabled={!canEditField(CURRENT_ADDRESS_ZIP)}
              />
              <CustomFormElement
                colSpan={3}
                id={CURRENT_ADDRESS_STATE}
                name={CURRENT_ADDRESS_STATE}
                label={STATE_PROVINCE_LABEL}
                type="select"
                selectOptions={currentAddressStates}
                onChange={onChangeHandler}
                register={register}
                error={errors?.currentAddressState}
                required
                disabled={!canEditField(CURRENT_ADDRESS_STATE)}
              />
            </div>
          </ChildRadioGroupWrapper>
        )}
        {errors?.isDifferentAddress?.message && (
          <CustomErrorMessage text={errors?.isDifferentAddress?.message} />
        )}
      </div>
    </>
  );
};

AddressInformation.propTypes = {
  countries: PropTypes.array,
  states: PropTypes.object,
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  onBlurTrimSpace: PropTypes.func,
};

const mapStateToProps = (state) => ({
  countries: selectCountries(state),
  states: selectStates(state),
});

export default connect(mapStateToProps, null)(AddressInformation);
