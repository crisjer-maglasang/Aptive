import { useContext, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { onboardingConstants, onboardingDataValues } from '@/lib/constants';
import { CustomFormElement, DateOfBirth, PhoneNumber } from '@/components/common';
import { addFsExcludeClass } from '@/lib/utils';
import { genderSelectOptions } from '@/lib/configs';
import { getFileThresholds } from '@/lib/validations';
import { experienceOptionsSelector } from '@/redux/reps';
import { uploadProfilePicAsync } from '@/redux/files';
import { profilePicLoadingSelector } from '@/redux/loading';
import { profilePictureFileSelector } from '@/redux/onboarding';
import { ProfileWizardContext } from '@/modules/recruits/components';

const {
  FIRST_NAME,
  FIRST_NAME_LABEL,
  LAST_NAME,
  LAST_NAME_LABEL,
  FULL_NAME,
  FULL_LEGAL_NAME_LABEL,
  DATE_OF_BIRTH,
  DATE_OF_BIRTH_LABEL,
  GENDER,
  GENDER_LABEL,
  EXPERIENCE,
  EXPERIENCE_LABEL,
  PROFILE_PICTURE,
  PROFILE_PICTURE_LABEL,
  PROFILE_PICTURE_LOCAL_FILE,
  PROFILE_PICTURE_TOOLTIP,
  PHONE_NUMBER_LABEL,
  PHONE_NAME,
  COUNTRY_CODE_LABEL,
  COUNTRY_CODE_TEXT,
  WIZARD_TYPE_RECRUIT,
  UPLOADING_UNAVAILABLE_TOOLTIP,
  CUSTOMER_FACING_PHONE_NUMBER_NAME,
  CUSTOMER_FACING_PHONE_NUMBER_LABEL,
} = onboardingConstants;

const BasicInformation = ({
  userId,
  isAdmin,
  wizardType,
  experiences,
  canEditField,
  onChangeHandler,
  onBlurTrimSpace,
  pictureIsLoading,
  profilePictureFile,
  uploadProfilePicture,
}) => {
  const { register, getValues, formState: { errors }, setValue, trigger } = useFormContext();

  const {
    firstName,
    lastName,
    profilePicture,
    profilePictureLocalFile,
  } = getValues();

  const { setRepName } = useContext(ProfileWizardContext);

  useEffect(() => {
    setRepName(`${firstName} ${lastName}`);
  }, [firstName, lastName, setRepName]);

  useEffect(async () => {
    if (profilePictureFile?.file) {
      const options = { shouldValidate: true };

      setValue(PROFILE_PICTURE, profilePictureFile?.fileName, { ...options });
      setValue(PROFILE_PICTURE_LOCAL_FILE, '', { ...options });

      await trigger(PROFILE_PICTURE);
    }
  }, [profilePictureFile?.file]);

  const experienceSelectOptions = useMemo(() => {
    return [
      { value: '', name: onboardingDataValues.SELECT_VALUE },
      ...experiences.map(({ id, name }) => ({
        value: String(id),
        name,
      })),
    ];
  }, [experiences]);

  const handleCancelUpload = (name) => {
    setValue(name, '', { shouldValidate: true });
  };

  const handleUpload = async () => {
    const isValid = await trigger(PROFILE_PICTURE_LOCAL_FILE);
    if (isValid) {
      uploadProfilePicture({ user_id: userId, file: profilePictureLocalFile });
    }
  };

  return (
    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
      <CustomFormElement
        id={FIRST_NAME}
        name={FIRST_NAME}
        label={FIRST_NAME_LABEL}
        type="text"
        onChange={onChangeHandler}
        onBlur={(event) => onBlurTrimSpace(event, FIRST_NAME)}
        register={register}
        error={errors?.firstName}
        required
        className={addFsExcludeClass()}
        disabled={!canEditField(FIRST_NAME)}
      />
      <CustomFormElement
        id={LAST_NAME}
        name={LAST_NAME}
        label={LAST_NAME_LABEL}
        type="text"
        onChange={onChangeHandler}
        onBlur={(event) => onBlurTrimSpace(event, LAST_NAME)}
        register={register}
        error={errors?.lastName}
        required
        className={addFsExcludeClass()}
        disabled={!canEditField(LAST_NAME)}
      />
      <CustomFormElement
        id={FULL_NAME}
        name={FULL_NAME}
        label={FULL_LEGAL_NAME_LABEL}
        type="text"
        onChange={onChangeHandler}
        onBlur={(event) => onBlurTrimSpace(event, FULL_NAME)}
        register={register}
        error={errors?.fullName}
        required
        className={addFsExcludeClass()}
        disabled={!canEditField(FULL_NAME)}
      />
      <DateOfBirth
        id={DATE_OF_BIRTH}
        name={DATE_OF_BIRTH}
        label={DATE_OF_BIRTH_LABEL}
        type="date"
        showYearDropdown
        onChange={onChangeHandler}
        register={register}
        error={errors?.dob}
        required
        disabled={!canEditField(DATE_OF_BIRTH)}
      />

      <CustomFormElement
        colSpan={3}
        label={COUNTRY_CODE_LABEL}
        type="text"
        value={COUNTRY_CODE_TEXT}
        disabled
      />
      <PhoneNumber
        colSpan={3}
        id={PHONE_NAME}
        name={PHONE_NAME}
        label={PHONE_NUMBER_LABEL}
        onChange={onChangeHandler}
        register={register}
        error={errors?.mobile}
        required
        className={addFsExcludeClass()}
        disabled={!canEditField(PHONE_NAME)}
      />
      <CustomFormElement
        colSpan={3}
        id={GENDER}
        name={GENDER}
        label={GENDER_LABEL}
        type="select"
        selectOptions={genderSelectOptions}
        onChange={onChangeHandler}
        register={register}
        error={errors?.gender}
        required
        disabled={!canEditField(GENDER)}
      />
      {/* Only Admin can edit an experience field and only in edit rep form. */}
      {isAdmin && wizardType === WIZARD_TYPE_RECRUIT && (
        <CustomFormElement
          colSpan={3}
          id={EXPERIENCE}
          name={EXPERIENCE}
          label={EXPERIENCE_LABEL}
          type="select"
          selectOptions={experienceSelectOptions}
          onChange={onChangeHandler}
          register={register}
          error={errors?.experience}
          required
          disabled={!canEditField(EXPERIENCE)}
        />
      )}
      <PhoneNumber
        colSpan={3}
        id={CUSTOMER_FACING_PHONE_NUMBER_NAME}
        name={CUSTOMER_FACING_PHONE_NUMBER_NAME}
        label={CUSTOMER_FACING_PHONE_NUMBER_LABEL}
        onChange={onChangeHandler}
        register={register}
        error={errors?.[CUSTOMER_FACING_PHONE_NUMBER_NAME]}
        className={addFsExcludeClass()}
        disabled={!canEditField(CUSTOMER_FACING_PHONE_NUMBER_NAME)}
      />
      <CustomFormElement
        colSpan={6}
        id={PROFILE_PICTURE}
        name={PROFILE_PICTURE}
        label={PROFILE_PICTURE_LABEL}
        tooltipMessage={!canEditField(PROFILE_PICTURE) ? UPLOADING_UNAVAILABLE_TOOLTIP : PROFILE_PICTURE_TOOLTIP}
        type="file"
        inputFileName={PROFILE_PICTURE_LOCAL_FILE}
        inputFileId={PROFILE_PICTURE_LOCAL_FILE}
        fileType="image"
        acceptTypes={getFileThresholds('image').type}
        localFile={profilePictureLocalFile}
        url={profilePicture}
        onChange={onChangeHandler}
        register={register}
        error={errors?.profilePictureLocalFile || errors?.profilePicture}
        onSaveClick={handleUpload}
        onCancelClick={handleCancelUpload}
        isFileLoading={pictureIsLoading}
        required
        disabled={!canEditField(PROFILE_PICTURE)}
      />
    </div>
  );
};

BasicInformation.propTypes = {
  userId: PropTypes.number,
  isAdmin: PropTypes.bool,
  wizardType: PropTypes.string,
  canEditField: PropTypes.func,
  experiences: PropTypes.array,
  onChangeHandler: PropTypes.func,
  onBlurTrimSpace: PropTypes.func,
  pictureIsLoading: PropTypes.bool,
  profilePictureFile: PropTypes.shape({
    fileName: PropTypes.string,
    file: PropTypes.string,
  }),
  uploadProfilePicture: PropTypes.func,
};

const mapStateToProps = (state) => ({
  experiences: experienceOptionsSelector(state),
  pictureIsLoading: profilePicLoadingSelector(state),
  profilePictureFile: profilePictureFileSelector(state),
});

const mapDispatchToProps = {
  uploadProfilePicture: uploadProfilePicAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInformation);
