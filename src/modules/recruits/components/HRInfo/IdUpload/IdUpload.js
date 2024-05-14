import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import moment from 'moment';
import {
  driverLicenseLoadingSelector,
  passportLoadingSelector,
  socialCardLoadingSelector,
} from '@/redux/loading';
import {
  driverLicenseFileSelector,
  passportFileSelector,
  socialSecurityFileSelector,
} from '@/redux/onboarding';
import { onboardingConstants, usesPassportRadioConfig } from '@/lib';
import { uploadDriverLicenseAsync, uploadPassportAsync, uploadSsCardAsync } from '@/redux/files';
import { CustomFormElement } from '@/components';
import { CustomErrorMessage } from '@/components/common/Form';
import { getFileThresholds } from '@/lib/validations';

const {
  USES_TYPE_LABEL,
  PASSPORT_LABEL,
  DRIVER_LICENSE_LABEL,
  SOCIAL_SECURITY_LABEL,
  USES_TYPE,
  PASSPORT_PICTURE,
  PASSPORT_EXPIRATION_DATE,
  PASSPORT_EXPIRATION_DATE_LABEL,
  DRIVER_LICENSE,
  SOCIAL_SECURITY_CARD,
  PASSPORT_PICTURE_LOCAL_FILE,
  DRIVER_LICENSE_LOCAL_FILE,
  SOCIAL_SECURITY_PICTURE_LOCAL_FILE,
  UPLOADING_UNAVAILABLE_TOOLTIP,
} = onboardingConstants;

const IdUpload = ({
  userId,
  canEditField,
  onChangeHandler,
  passportFile,
  driverLicenseFile,
  socialSecurityFile,
  passportIsLoading,
  socialIsLoading,
  driverLicenseIsLoading,
  uploadPassport,
  uploadDriverLicense,
  uploadSocialSecurity,
}) => {
  const minDate = new Date();
  const maxDate = moment().add(65, 'years').month(11).date(31).toDate();

  const { register, getValues, setValue, trigger, formState: { errors } } = useFormContext();

  const {
    usesType,
    passportPicture,
    passportPictureLocalFile,
    driverLicense,
    driverLicenseLocalFile,
    socialSecurityCard,
    socialSecurityPictureLocalFile,
  } = getValues();

  useEffect(async () => {
    if (passportFile?.file) {
      const options = { shouldValidate: true };

      setValue(PASSPORT_PICTURE, passportFile?.fileName, { ...options });
      setValue(PASSPORT_PICTURE_LOCAL_FILE, '', { ...options });

      await trigger(PASSPORT_PICTURE);
    }
  }, [passportFile?.file]);

  useEffect(async () => {
    if (driverLicenseFile?.file) {
      const options = { shouldValidate: true };

      setValue(DRIVER_LICENSE, driverLicenseFile?.fileName, { ...options });
      setValue(DRIVER_LICENSE_LOCAL_FILE, '', { ...options });

      await trigger(DRIVER_LICENSE);
    }
  }, [driverLicenseFile?.file]);

  useEffect(async () => {
    if (socialSecurityFile?.file) {
      const options = { shouldValidate: true };

      setValue(SOCIAL_SECURITY_CARD, socialSecurityFile?.fileName, { ...options });
      setValue(SOCIAL_SECURITY_PICTURE_LOCAL_FILE, '', { ...options });

      await trigger(SOCIAL_SECURITY_CARD);
    }
  }, [socialSecurityFile?.file]);

  const handlePassportUpload = async () => {
    const isValid = await trigger(PASSPORT_PICTURE_LOCAL_FILE);
    if (isValid) {
      uploadPassport({ user_id: userId, file: passportPictureLocalFile });
    }
  };

  const handleDriverLicenceUpload = async () => {
    const isValid = await trigger(DRIVER_LICENSE_LOCAL_FILE);
    if (isValid) {
      uploadDriverLicense({ user_id: userId, file: driverLicenseLocalFile });
    }
  };

  const handleSocialSecurityUpload = async () => {
    const isValid = await trigger(SOCIAL_SECURITY_PICTURE_LOCAL_FILE);
    if (isValid) {
      uploadSocialSecurity({ user_id: userId, file: socialSecurityPictureLocalFile });
    }
  };

  const handleCancelUpload = (name) => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <>
      <CustomFormElement
        type="radio"
        id={USES_TYPE}
        name={USES_TYPE}
        label={USES_TYPE_LABEL}
        register={register}
        radioOptions={usesPassportRadioConfig}
        onChange={onChangeHandler}
        orientation="horizontal"
        required
        disabled={!canEditField(USES_TYPE)}
      />
      {errors?.usesType?.message && (
        <CustomErrorMessage text={errors?.usesType?.message} />
      )}
      {usesType === usesPassportRadioConfig[0].value && (
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <CustomFormElement
            colSpan={6}
            id={PASSPORT_PICTURE}
            name={PASSPORT_PICTURE}
            label={PASSPORT_LABEL}
            tooltipMessage={!canEditField(PASSPORT_PICTURE) ? UPLOADING_UNAVAILABLE_TOOLTIP : null}
            type="file"
            inputFileName={PASSPORT_PICTURE_LOCAL_FILE}
            inputFileId={PASSPORT_PICTURE_LOCAL_FILE}
            fileType="image"
            acceptTypes={getFileThresholds('image').type}
            localFile={passportPictureLocalFile}
            url={passportPicture}
            onChange={onChangeHandler}
            register={register}
            error={errors?.passportPictureLocalFile || errors?.passportPicture}
            onSaveClick={handlePassportUpload}
            onCancelClick={handleCancelUpload}
            isFileLoading={passportIsLoading}
            required
            disabled={!canEditField(PASSPORT_PICTURE)}
          />
          <CustomFormElement
            colSpan={2}
            id={PASSPORT_EXPIRATION_DATE}
            name={PASSPORT_EXPIRATION_DATE}
            label={PASSPORT_EXPIRATION_DATE_LABEL}
            minDate={minDate}
            maxDate={maxDate}
            type="date"
            showYearDropdown
            onChange={onChangeHandler}
            register={register}
            error={errors?.passportExpirationDate}
            required
            disabled={!canEditField(PASSPORT_EXPIRATION_DATE)}
          />
        </div>
      )}
      {usesType === usesPassportRadioConfig[1].value && (
        <div className="mt-6">
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
            localFile={driverLicenseLocalFile}
            url={driverLicense}
            onChange={onChangeHandler}
            register={register}
            error={errors?.driverLicenseLocalFile || errors?.driverLicense}
            onSaveClick={handleDriverLicenceUpload}
            onCancelClick={handleCancelUpload}
            isFileLoading={driverLicenseIsLoading}
            required
            disabled={!canEditField(DRIVER_LICENSE)}
          />
          <div className="mt-4">
            <CustomFormElement
              colSpan={6}
              id={SOCIAL_SECURITY_CARD}
              name={SOCIAL_SECURITY_CARD}
              label={SOCIAL_SECURITY_LABEL}
              tooltipMessage={!canEditField(SOCIAL_SECURITY_CARD) ? UPLOADING_UNAVAILABLE_TOOLTIP : null}
              type="file"
              inputFileName={SOCIAL_SECURITY_PICTURE_LOCAL_FILE}
              inputFileId={SOCIAL_SECURITY_PICTURE_LOCAL_FILE}
              fileType="image"
              acceptTypes={getFileThresholds('image').type}
              localFile={socialSecurityPictureLocalFile}
              url={socialSecurityCard}
              onChange={onChangeHandler}
              register={register}
              error={errors?.socialSecurityPictureLocalFile || errors?.socialSecurityCard}
              onSaveClick={handleSocialSecurityUpload}
              onCancelClick={handleCancelUpload}
              isFileLoading={socialIsLoading}
              required
              disabled={!canEditField(SOCIAL_SECURITY_CARD)}
            />
          </div>
        </div>
      )}
    </>
  );
};

IdUpload.propTypes = {
  userId: PropTypes.number,
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  passportFile: PropTypes.shape({
    fileName: PropTypes.string,
    file: PropTypes.string,
  }),
  driverLicenseFile: PropTypes.shape({
    fileName: PropTypes.string,
    file: PropTypes.string,
  }),
  socialSecurityFile: PropTypes.shape({
    fileName: PropTypes.string,
    file: PropTypes.string,
  }),
  passportIsLoading: PropTypes.bool,
  socialIsLoading: PropTypes.bool,
  driverLicenseIsLoading: PropTypes.bool,
  uploadPassport: PropTypes.func,
  uploadDriverLicense: PropTypes.func,
  uploadSocialSecurity: PropTypes.func,
};

const mapStateToProps = (state) => ({
  passportFile: passportFileSelector(state),
  driverLicenseFile: driverLicenseFileSelector(state),
  socialSecurityFile: socialSecurityFileSelector(state),
  passportIsLoading: passportLoadingSelector(state),
  driverLicenseIsLoading: driverLicenseLoadingSelector(state),
  socialIsLoading: socialCardLoadingSelector(state),
});

const mapDispatchToProps = {
  uploadPassport: uploadPassportAsync.request,
  uploadDriverLicense: uploadDriverLicenseAsync.request,
  uploadSocialSecurity: uploadSsCardAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(IdUpload);
