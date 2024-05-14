import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { connect } from 'react-redux';
import {
  citizenStatusRadioConfig,
  convictionStatusRadioConfig,
  defaultSelectOption,
  eyeColorSelectOptions,
  hairColorSelectOptions,
  racialBackgroudSelectOptions,
  repExperienceRadioConfig,
  visibleMarkingsRadioConfig,
} from '@/lib/configs';
import {CustomFormElement, FormSection} from '@/components/common';
import { CustomErrorMessage } from '@/components/common/Form';
import { ChildRadioGroupWrapper } from '../../../components';
import { getFileThresholds } from '@/lib/validations';
import { selectCountries, selectStates } from '@/redux/addresses';
import { driverLicenseLoadingSelector } from '@/redux/loading';
import { uploadDriverLicenseAsync } from '@/redux/files';
import { driverLicenseFileSelector } from '@/redux/onboarding';
import { onboardingConstants, onboardingDataValues } from '@/lib';

const {
  RACE_LABEL,
  FEET_LABEL,
  INCHES_LABEL,
  WEIGHT_LABEL,
  HAIR_COLOR_LABEL,
  EYE_COLOR_LABEL,
  BIRTH_CITY_LABEL,
  BIRTH_STATE_LABEL,
  US_CITIZEN_LABEL,
  VISIBLE_MARKINGS_LABEL,
  CONVICTED_CRIME_LABEL,
  RACE,
  FEET,
  INCHES,
  WEIGHT,
  HAIR_COLOR,
  EYE_COLOR,
  CITY_OF_BIRTH,
  STATE_OF_BIRTH,
  IS_US_CITIZEN,
  HAS_VISIBLE_MARKINGS,
  IS_CONVICTED_OF_CRIME,
  CRIME_DESCRIPTION_NAME,
  CRIME_DESCRIPTION_LABEL,
  MARKINGS_DESCRIPTION_NAME,
  MARKINGS_DESCRIPTION_LABEL,
  OTHER_BIRTH_STATE_LABEL,
  STATE_OF_BIRTH_OTHER,
  COUNTRY_OF_BIRTH,
  BIRTH_COUNTRY_LABEL,
  DRIVER_LICENSE,
  DRIVER_LICENSE_LOCAL_FILE,
  DRIVER_LICENSE_LABEL,
  UPLOADING_UNAVAILABLE_TOOLTIP,
} = onboardingConstants;

const {
  STATE_OTHER_VALUE,
  COUNTRY_OTHER_VALUE,
  COUNTRY_STATE_OTHER_NAME,
} = onboardingDataValues;

const PersonalDetails = ({
  userId,
  canEditField,
  onChangeHandler,
  onBlurTrimSpace,
  states,
  countries,
  driverLicenseFile,
  driverLicenseIsLoading,
  uploadDriverLicense,
}) => {
  const { register, getValues, setValue, trigger, formState: { errors } } = useFormContext();

  const data = getValues();

  const countriesOptions = useMemo(() => ([
    ...defaultSelectOption,
    ...countries,
    { name: COUNTRY_STATE_OTHER_NAME, value: COUNTRY_OTHER_VALUE },
  ]), [countries]);

  const birthStates = useMemo(() => {
    const countryStates = states?.[data?.countryOfBirth] ?? [];

    return data?.countryOfBirth === COUNTRY_OTHER_VALUE
      ? [{ name: COUNTRY_STATE_OTHER_NAME, value: STATE_OTHER_VALUE }]
      : [...defaultSelectOption, ...countryStates];
  }, [data?.countryOfBirth, states]);

  useEffect(async () => {
    if (driverLicenseFile?.file) {
      const options = { shouldValidate: true };

      setValue(DRIVER_LICENSE, driverLicenseFile?.fileName, { ...options });
      setValue(DRIVER_LICENSE_LOCAL_FILE, '', { ...options });

      await trigger(DRIVER_LICENSE);
    }
  }, [driverLicenseFile?.file]);

  const handleUploadClick = async () => {
    const isValid = await trigger(DRIVER_LICENSE_LOCAL_FILE);
    if (isValid) {
      uploadDriverLicense({ user_id: userId, file: data?.driverLicenseLocalFile });
    }
  };

  const handleCancelUploadClick = (name) => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <>
      <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-12">
        <CustomFormElement
          colSpan={4}
          label={RACE_LABEL}
          id={RACE}
          name={RACE}
          type="select"
          register={register}
          error={errors?.race}
          selectOptions={racialBackgroudSelectOptions}
          onChange={onChangeHandler}
          required
          disabled={!canEditField(RACE)}
        />
        <CustomFormElement
          colSpan={4}
          id={FEET}
          name={FEET}
          label={FEET_LABEL}
          type="text"
          onChange={onChangeHandler}
          register={register}
          error={errors?.feet}
          required
          disabled={!canEditField(FEET)}
        />
        <CustomFormElement
          colSpan={4}
          id={INCHES}
          name={INCHES}
          label={INCHES_LABEL}
          type="text"
          onChange={onChangeHandler}
          register={register}
          error={errors?.inches}
          required
          disabled={!canEditField(INCHES)}
        />
        <CustomFormElement
          colSpan={4}
          id={WEIGHT}
          name={WEIGHT}
          label={WEIGHT_LABEL}
          placeholder="Lbs"
          type="text"
          onChange={onChangeHandler}
          register={register}
          error={errors?.weight}
          required
          disabled={!canEditField(WEIGHT)}
        />
        <CustomFormElement
          colSpan={4}
          label={HAIR_COLOR_LABEL}
          id={HAIR_COLOR}
          name={HAIR_COLOR}
          type="select"
          register={register}
          error={errors?.hairColor}
          selectOptions={hairColorSelectOptions}
          onChange={onChangeHandler}
          required
          disabled={!canEditField(HAIR_COLOR)}
        />
        <CustomFormElement
          colSpan={4}
          label={EYE_COLOR_LABEL}
          id={EYE_COLOR}
          name={EYE_COLOR}
          type="select"
          register={register}
          error={errors?.eyeColor}
          selectOptions={eyeColorSelectOptions}
          onChange={onChangeHandler}
          required
          disabled={!canEditField(EYE_COLOR)}
        />
        <CustomFormElement
          colSpan={4}
          id={COUNTRY_OF_BIRTH}
          name={COUNTRY_OF_BIRTH}
          label={BIRTH_COUNTRY_LABEL}
          type="select"
          selectOptions={countriesOptions}
          onChange={onChangeHandler}
          register={register}
          error={errors?.countryOfBirth}
          required
          disabled={!canEditField(COUNTRY_OF_BIRTH)}
        />
        {data?.countryOfBirth !== COUNTRY_OTHER_VALUE ? (
          <CustomFormElement
            colSpan={4}
            label={BIRTH_STATE_LABEL}
            id={STATE_OF_BIRTH}
            name={STATE_OF_BIRTH}
            type="select"
            register={register}
            error={errors?.stateOfBirth}
            selectOptions={birthStates}
            onChange={onChangeHandler}
            required
            disabled={!canEditField(STATE_OF_BIRTH)}
          />
        ) : null}
        {data?.countryOfBirth === COUNTRY_OTHER_VALUE ? (
          <CustomFormElement
            colSpan={4}
            label={OTHER_BIRTH_STATE_LABEL}
            id={STATE_OF_BIRTH_OTHER}
            name={STATE_OF_BIRTH_OTHER}
            type="text"
            register={register}
            error={errors?.[STATE_OF_BIRTH_OTHER]}
            onChange={onChangeHandler}
            onBlur={(event) => onBlurTrimSpace(event, STATE_OF_BIRTH_OTHER)}
            required
            disabled={!canEditField(STATE_OF_BIRTH_OTHER)}
          />
        ) : null}
        <CustomFormElement
          colSpan={4}
          id={CITY_OF_BIRTH}
          name={CITY_OF_BIRTH}
          label={BIRTH_CITY_LABEL}
          type="text"
          onChange={onChangeHandler}
          onBlur={(event) => onBlurTrimSpace(event, CITY_OF_BIRTH)}
          register={register}
          error={errors?.cityOfBirth}
          required
          disabled={!canEditField(CITY_OF_BIRTH)}
        />
      </div>
      <div className="mt-4">
        <CustomFormElement
          label={US_CITIZEN_LABEL}
          type="radio"
          id={IS_US_CITIZEN}
          name={IS_US_CITIZEN}
          colSpan={12}
          register={register}
          radioOptions={citizenStatusRadioConfig}
          onChange={onChangeHandler}
          orientation="horizontal"
          required
          disabled={!canEditField(IS_US_CITIZEN)}
        />
        {errors?.isUsCitizen?.message && (
          <CustomErrorMessage text={errors?.isUsCitizen?.message} />
        )}
      </div>
      <div className="mt-4">
        <CustomFormElement
          label={VISIBLE_MARKINGS_LABEL}
          type="radio"
          id={HAS_VISIBLE_MARKINGS}
          name={HAS_VISIBLE_MARKINGS}
          colSpan={12}
          register={register}
          radioOptions={visibleMarkingsRadioConfig}
          onChange={onChangeHandler}
          orientation="horizontal"
          required
          disabled={!canEditField(HAS_VISIBLE_MARKINGS)}
        />
        {data?.hasVisibleMarkings === visibleMarkingsRadioConfig[0].value ? (
          <ChildRadioGroupWrapper>
            <div className="flex flex-row w-full px-3 py-4 space-x-5 bg-gray-50">
              <div className="flex-1 mt-1">
                <CustomFormElement
                  colSpan={6}
                  id={MARKINGS_DESCRIPTION_NAME}
                  name={MARKINGS_DESCRIPTION_NAME}
                  label={MARKINGS_DESCRIPTION_LABEL}
                  type="textArea"
                  rows={3}
                  onChange={onChangeHandler}
                  onBlur={(event) => onBlurTrimSpace(event, MARKINGS_DESCRIPTION_NAME)}
                  register={register}
                  error={errors?.markingsDescription}
                  required
                  disabled={!canEditField(MARKINGS_DESCRIPTION_NAME)}
                />
              </div>
            </div>
          </ChildRadioGroupWrapper>
        ) : null}
        {errors?.hasVisibleMarkings?.message && (
          <CustomErrorMessage text={errors?.hasVisibleMarkings?.message} />
        )}
      </div>
      <div className="mt-4">
        <CustomFormElement
          label={CONVICTED_CRIME_LABEL}
          type="radio"
          id={IS_CONVICTED_OF_CRIME}
          name={IS_CONVICTED_OF_CRIME}
          colSpan={12}
          register={register}
          radioOptions={convictionStatusRadioConfig}
          onChange={onChangeHandler}
          orientation="horizontal"
          required
          disabled={!canEditField(IS_CONVICTED_OF_CRIME)}
        />
        {data?.isConvictedOfCrime === convictionStatusRadioConfig[0].value ? (
          <ChildRadioGroupWrapper>
            <div className="flex flex-row w-full px-3 py-4 space-x-5 bg-gray-50">
              <div className="flex-1 mt-1">
                <CustomFormElement
                  colSpan={6}
                  id={CRIME_DESCRIPTION_NAME}
                  name={CRIME_DESCRIPTION_NAME}
                  label={CRIME_DESCRIPTION_LABEL}
                  type="textArea"
                  rows={3}
                  onChange={onChangeHandler}
                  onBlur={(event) => onBlurTrimSpace(event, CRIME_DESCRIPTION_NAME)}
                  register={register}
                  error={errors?.crimeDescription}
                  required
                  disabled={!canEditField(CRIME_DESCRIPTION_NAME)}
                />
              </div>
            </div>
          </ChildRadioGroupWrapper>
        ) : null}
        {errors?.isConvictedOfCrime?.message && (
          <CustomErrorMessage text={errors?.isConvictedOfCrime?.message} />
        )}
      </div>
      <div className="mt-4">
        <CustomFormElement
          colSpan={6}
          id={DRIVER_LICENSE}
          name={DRIVER_LICENSE}
          label={DRIVER_LICENSE_LABEL}
          tooltipMessage={!canEditField(DRIVER_LICENSE) ? UPLOADING_UNAVAILABLE_TOOLTIP : null}
          type="file"
          inputFileName={DRIVER_LICENSE_LOCAL_FILE}
          inputFileId={DRIVER_LICENSE_LOCAL_FILE}
          fileType="image"
          acceptTypes={getFileThresholds('image').type}
          localFile={data?.driverLicenseLocalFile}
          url={data?.driverLicense}
          onChange={onChangeHandler}
          register={register}
          error={errors?.driverLicenseLocalFile || errors?.driverLicense}
          onSaveClick={handleUploadClick}
          onCancelClick={handleCancelUploadClick}
          isFileLoading={driverLicenseIsLoading}
          required
          disabled={!canEditField(DRIVER_LICENSE)}
        />
      </div>
    </>
  );
};

PersonalDetails.propTypes = {
  userId: PropTypes.number,
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  states: PropTypes.object,
  countries: PropTypes.array,
  driverLicenseIsLoading: PropTypes.bool,
  uploadDriverLicense: PropTypes.func,
  driverLicenseFile: PropTypes.shape({
    fileName: PropTypes.string,
    file: PropTypes.string,
  }),
  onBlurTrimSpace: PropTypes.func,
};

const mapStateToProps = (state) => ({
  states: selectStates(state),
  countries: selectCountries(state),
  driverLicenseFile: driverLicenseFileSelector(state),
  driverLicenseIsLoading: driverLicenseLoadingSelector(state),
});

const mapDispatchToProps = ({
  uploadDriverLicense: uploadDriverLicenseAsync.request,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);

