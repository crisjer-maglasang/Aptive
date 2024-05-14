import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CustomFormElement, PhoneNumber } from '@/components/common';
import { addFsExcludeClass } from '@/lib/utils';
import { onboardingConstants } from '@/lib';

const {
  EMERGENCY_CONTACT_NAME,
  EMERGENCY_CONTACT_PHONE_NUMBER,
  EMERGENCY_CONTACT_PHONE_NUMBER_LABEL,
  EMERGENCY_CONTACT_NAME_LABEL,
} = onboardingConstants;

const EmergencyInformation = ({
  canEditField,
  onChangeHandler,
  onBlurTrimSpace,
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
      <CustomFormElement
        id={EMERGENCY_CONTACT_NAME}
        name={EMERGENCY_CONTACT_NAME}
        label={EMERGENCY_CONTACT_NAME_LABEL}
        type="text"
        onChange={onChangeHandler}
        onBlur={(event) => onBlurTrimSpace(event, EMERGENCY_CONTACT_NAME)}
        register={register}
        error={errors?.emergencyContactName}
        required
        className={addFsExcludeClass()}
        disabled={!canEditField(EMERGENCY_CONTACT_NAME)}
      />
      <PhoneNumber
        id={EMERGENCY_CONTACT_PHONE_NUMBER}
        name={EMERGENCY_CONTACT_PHONE_NUMBER}
        label={EMERGENCY_CONTACT_PHONE_NUMBER_LABEL}
        onChange={onChangeHandler}
        register={register}
        error={errors?.emergencyContactPhoneNumber}
        required
        className={addFsExcludeClass()}
        disabled={!canEditField(EMERGENCY_CONTACT_PHONE_NUMBER)}
      />
    </div>
  );
};

EmergencyInformation.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  onBlurTrimSpace: PropTypes.func,
};

export default EmergencyInformation;
