import { useMemo } from 'react';
import moment from 'moment/moment';
import { useFormContext } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defaultSelectOption } from '@/lib/configs';
import { CustomFormElement, SsnNumber, DriverLicenseNumber } from '@/components/common';
import { addFsExcludeClass } from '@/lib/utils';
import { onboardingConstants } from '@/lib';
import { selectCountries, selectStates } from '@/redux/addresses';

const {
  SOCIAL_SECURITY_NUMBER,
  SSN_LABEL,
  DRIVER_LICENSE_NUMBER,
  DRIVER_LICENSE_NUMBER_LABEL,
  DRIVER_LICENSE_STATE_ISSUED,
  DRIVER_LICENSE_STATE_LABEL,
  DRIVER_LICENSE_COUNTRY_ISSUED,
  DRIVER_LICENSE_COUNTRY_LABEL,
  DRIVER_LICENSE_EXPIRATION_DATE,
  DRIVER_LICENSE_EXPIRATION_DATE_LABEL,
} = onboardingConstants;

const IdInformation = ({
  canEditField,
  onChangeHandler,
  isSSNDirty,
  countries,
  states,
}) => {
  const minDate = new Date();
  const maxDate = moment().add(65, 'years').month(11).date(31).toDate();

  const { register, getValues, formState: { errors } } = useFormContext();

  const { driverLicenseCountryIssued } = getValues();

  const countriesOptions = useMemo(() => ([
    ...defaultSelectOption,
    ...countries,
  ]), [countries]);

  const driverLicenseIssuedStates = useMemo(() => {
    const countryStates = states?.[driverLicenseCountryIssued] ?? [];

    return [...defaultSelectOption, ...countryStates];
  }, [driverLicenseCountryIssued, states]);

  return (
    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
      <SsnNumber
        colSpan={6}
        id={SOCIAL_SECURITY_NUMBER}
        name={SOCIAL_SECURITY_NUMBER}
        label={SSN_LABEL}
        onChange={onChangeHandler}
        register={register}
        error={errors?.ssnNumber}
        isDirty={isSSNDirty}
        required
        disabled={!canEditField(SOCIAL_SECURITY_NUMBER)}
        className={addFsExcludeClass()}
      />
      <DriverLicenseNumber
        colSpan={3}
        id={DRIVER_LICENSE_NUMBER}
        name={DRIVER_LICENSE_NUMBER}
        label={DRIVER_LICENSE_NUMBER_LABEL}
        onChange={onChangeHandler}
        register={register}
        error={errors?.driverLicenseNumber}
        required
        disabled={!canEditField(DRIVER_LICENSE_NUMBER)}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id={DRIVER_LICENSE_COUNTRY_ISSUED}
        name={DRIVER_LICENSE_COUNTRY_ISSUED}
        label={DRIVER_LICENSE_COUNTRY_LABEL}
        type="select"
        selectOptions={countriesOptions}
        onChange={onChangeHandler}
        register={register}
        error={errors?.driverLicenseCountryIssued}
        required
        disabled={!canEditField(DRIVER_LICENSE_COUNTRY_ISSUED)}
      />
      <CustomFormElement
        colSpan={3}
        id={DRIVER_LICENSE_EXPIRATION_DATE}
        name={DRIVER_LICENSE_EXPIRATION_DATE}
        label={DRIVER_LICENSE_EXPIRATION_DATE_LABEL}
        minDate={minDate}
        maxDate={maxDate}
        type="date"
        showYearDropdown
        onChange={onChangeHandler}
        register={register}
        error={errors?.driverLicenseExpirationDate}
        required
        disabled={!canEditField(DRIVER_LICENSE_EXPIRATION_DATE)}
      />
      <CustomFormElement
        colSpan={3}
        id={DRIVER_LICENSE_STATE_ISSUED}
        name={DRIVER_LICENSE_STATE_ISSUED}
        label={DRIVER_LICENSE_STATE_LABEL}
        type="select"
        selectOptions={driverLicenseIssuedStates}
        onChange={onChangeHandler}
        register={register}
        error={errors?.driverLicenseStateIssued}
        required
        disabled={!canEditField(DRIVER_LICENSE_STATE_ISSUED)}
      />
    </div>
  );
};

IdInformation.propTypes = {
  countries: PropTypes.array,
  states: PropTypes.object,
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  isSSNDirty: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  countries: selectCountries(state),
  states: selectStates(state),
});

export default connect(mapStateToProps, null)(IdInformation);
