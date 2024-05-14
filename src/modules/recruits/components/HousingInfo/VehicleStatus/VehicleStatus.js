import { defaultSelectOption, segwayStatusRadioConfig, vehicleColorSelectOptions, vehicleStatusRadioConfig } from '@/lib/configs';
import { CustomFormElement } from '@/components/common';
import { addFsExcludeClass, generateYearsOptions } from '@/lib/utils';
import { CustomErrorMessage } from '@/components/common/Form';
import { onboardingConstants } from '@/lib';
import { useFormContext } from 'react-hook-form';
import { connect } from 'react-redux';
import { selectCountries, selectStates } from '@/redux/addresses';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const {
  VEHICLE_STATUS_LABEL,
  HAS_VEHICLE,
  VEHICLE_MODEL,
  VEHICLE_MODEL_LABEL,
  VEHICLE_COLOR,
  VEHICLE_COLOR_LABEL,
  VEHICLE_YEAR,
  VEHICLE_YEAR_LABEL,
  VEHICLE_PLATE_NUMBER,
  VEHICLE_PLATE_NUMBER_LABEL,
  VEHICLE_REGISTRATION_STATE,
  VEHICLE_REGISTRATION_STATE_LABEL,
  VEHICLE_REGISTRATION_COUNTRY,
  VEHICLE_REGISTRATION_COUNTRY_LABEL,
  SEGWAY_STATUS_LABEL,
  HAS_SEGWAY,
} = onboardingConstants;
const vehicleYearOptions = generateYearsOptions(1970);

const VehicleStatus = ({
  canEditField,
  onChangeHandler,
  onBlurTrimSpace,
  states,
  countries,
}) => {
  const { register, getValues, formState: { errors } } = useFormContext();

  const { hasVehicle, vehicleRegistrationCountry } = getValues();

  const countriesOptions = useMemo(() => ([
    ...defaultSelectOption,
    ...countries,
  ]), [countries]);

  const vehicleRegistrationStates = useMemo(() => {
    const countryStates = states?.[vehicleRegistrationCountry] ?? [];

    return [...defaultSelectOption, ...countryStates];
  }, [vehicleRegistrationCountry, states]);

  return (
    <>
      <CustomFormElement
        label={VEHICLE_STATUS_LABEL}
        type="radio"
        id={HAS_VEHICLE}
        name={HAS_VEHICLE}
        register={register}
        radioOptions={vehicleStatusRadioConfig}
        onChange={onChangeHandler}
        orientation="horizontal"
        required
        disabled={!canEditField(HAS_VEHICLE)}
        isOpen={hasVehicle === vehicleStatusRadioConfig[0].value}
      />
      {hasVehicle === vehicleStatusRadioConfig[0].value
        ? (
          <div
            className="flex items-start p-5 bg-gray-50 border-t-0 border-l border-r border-b  shadow-sm rounded-b-lg"
          >
            <div className="grid grid-cols-1 px-5 py-5 bg-gray-50 gap-y-6 gap-x-4 sm:grid-cols-6">
              <CustomFormElement
                colSpan={2}
                id={VEHICLE_MODEL}
                name={VEHICLE_MODEL}
                label={VEHICLE_MODEL_LABEL}
                type="text"
                onChange={onChangeHandler}
                onBlur={(event) => onBlurTrimSpace(event, VEHICLE_MODEL)}
                register={register}
                error={errors?.vehicleModel}
                required
                disabled={!canEditField(VEHICLE_MODEL)}
              />
              <CustomFormElement
                colSpan={2}
                id={VEHICLE_COLOR}
                name={VEHICLE_COLOR}
                label={VEHICLE_COLOR_LABEL}
                type="select"
                selectOptions={vehicleColorSelectOptions}
                onChange={onChangeHandler}
                register={register}
                error={errors?.vehicleColor}
                required
                disabled={!canEditField(VEHICLE_COLOR)}
              />
              <CustomFormElement
                colSpan={2}
                id={VEHICLE_REGISTRATION_COUNTRY}
                name={VEHICLE_REGISTRATION_COUNTRY}
                label={VEHICLE_REGISTRATION_COUNTRY_LABEL}
                type="select"
                selectOptions={countriesOptions}
                onChange={onChangeHandler}
                register={register}
                error={errors?.vehicleRegistrationCountry}
                required
                disabled={!canEditField(VEHICLE_REGISTRATION_COUNTRY)}
              />
              <CustomFormElement
                colSpan={2}
                id={VEHICLE_PLATE_NUMBER}
                name={VEHICLE_PLATE_NUMBER}
                label={VEHICLE_PLATE_NUMBER_LABEL}
                type="text"
                onChange={onChangeHandler}
                onBlur={(event) => onBlurTrimSpace(event, VEHICLE_PLATE_NUMBER)}
                register={register}
                error={errors?.vehiclePlateNumber}
                required
                disabled={!canEditField(VEHICLE_PLATE_NUMBER)}
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={2}
                id={VEHICLE_YEAR}
                name={VEHICLE_YEAR}
                label={VEHICLE_YEAR_LABEL}
                type="select"
                onChange={onChangeHandler}
                register={register}
                error={errors?.vehicleYear}
                selectOptions={vehicleYearOptions}
                required
                disabled={!canEditField(VEHICLE_YEAR)}
              />
              <CustomFormElement
                colSpan={2}
                id={VEHICLE_REGISTRATION_STATE}
                name={VEHICLE_REGISTRATION_STATE}
                label={VEHICLE_REGISTRATION_STATE_LABEL}
                type="select"
                selectOptions={vehicleRegistrationStates}
                onChange={onChangeHandler}
                register={register}
                error={errors?.vehicleRegistrationState}
                required
                disabled={!canEditField(VEHICLE_REGISTRATION_STATE)}
              />
            </div>
          </div>
        ) : null
      }
      {errors?.hasVehicle?.message && (
        <CustomErrorMessage text={errors?.hasVehicle?.message} />
      )}
      <div className="mt-4">
        <CustomFormElement
          label={SEGWAY_STATUS_LABEL}
          type="radio"
          id={HAS_SEGWAY}
          name={HAS_SEGWAY}
          register={register}
          radioOptions={segwayStatusRadioConfig}
          onChange={onChangeHandler}
          orientation="horizontal"
          required
          disabled={!canEditField(HAS_SEGWAY)}
        />
        {errors?.hasSegway?.message && (
          <CustomErrorMessage text={errors?.hasSegway?.message} />
        )}
      </div>
    </>
  );
};

VehicleStatus.propTypes = {
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

export default connect(mapStateToProps, null)(VehicleStatus);
