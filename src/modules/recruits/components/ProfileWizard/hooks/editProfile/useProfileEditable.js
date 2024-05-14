import { useStableCallback } from '@/hooks';
import { onboardingConstants } from '@/lib';
import { useMemo } from 'react';
import { isRecruitWizard } from '../../lib';

const {
  UPFRONT_PAY_NAME,
  RENT_DEDUCTION_NAME,
  RENT_DEDUCTION_REASON_NAME,
  UNIFORM_DEDUCTION_NAME,
  DRIVER_LICENSE,
  PASSPORT_PICTURE,
  PASSPORT_EXPIRATION_DATE,
  PROFILE_PICTURE,
  SOCIAL_SECURITY_CARD,
  USES_TYPE,
  DOCUMENT_TYPE_W9,
  DOCUMENT_TYPE_I9,
  USE_PREVIOUS_W9_NAME,
  HAS_REP_EXPERIENCE,
  COMPANY_YEARS_SOLD,
  COMPANY_ACCOUNT_NUMBERS,
  COMPANY_NAME,
  LAST_INDUSTRY_NAME,
  REP_EXPERIENCES_DATA_NAME,
  LAST_INDUSTRY_OTHER_NAME,
  SOCIAL_SECURITY_NUMBER,
} = onboardingConstants;

const useProfileEditable = ({
  wizardType,
  isPersonalWizard,
  isSubmitted,
  isAdmin,
  isApproved,
  isRepEditable,
}) => {
  const isEditable = useMemo(() => {
    // The Admin can always edit a Recruit's profile.
    if (isRecruitWizard(wizardType) && isAdmin && isRepEditable) {
      return true;
    }

    // A user of any role can always edit their own profile.
    if (isPersonalWizard) {
      return true;
    }

    // By default, profile editing is disabled for security reasons.
    return false;
  }, [
    wizardType,
    isPersonalWizard,
    isAdmin,
    isRepEditable,
  ]);

  const canEditField = useStableCallback((fieldName) => {
    const isSsnField = fieldName === SOCIAL_SECURITY_NUMBER;

    const isPayField = [
      UPFRONT_PAY_NAME,
      RENT_DEDUCTION_NAME,
      RENT_DEDUCTION_REASON_NAME,
      UNIFORM_DEDUCTION_NAME,
    ].includes(fieldName);

    const isExperienceField = [
      HAS_REP_EXPERIENCE,
      REP_EXPERIENCES_DATA_NAME,
      COMPANY_YEARS_SOLD,
      COMPANY_ACCOUNT_NUMBERS,
      COMPANY_NAME,
      LAST_INDUSTRY_NAME,
      LAST_INDUSTRY_OTHER_NAME,
    ].includes(fieldName);

    const isDocumentField = [
      DRIVER_LICENSE,
      PASSPORT_PICTURE,
      PASSPORT_EXPIRATION_DATE,
      PROFILE_PICTURE,
      SOCIAL_SECURITY_CARD,
      USES_TYPE, // Locks switching between `ID Copy Upload` types at HR Form.
      DOCUMENT_TYPE_W9,
      DOCUMENT_TYPE_I9,
      DOCUMENT_TYPE_I9,
      USE_PREVIOUS_W9_NAME,
    ].includes(fieldName);

    // Bail early if the profile isn't editable at all.
    if (!isEditable) {
      return false;
    }

    // No one except for the Admin who edits a Recruit's profile can edit pay details.
    if (!(isRecruitWizard(wizardType) && isAdmin) && isPayField) {
      return false;
    }

    // No one except for the Admin who edits a Recruit's profile can edit experience.
    if (!(isRecruitWizard(wizardType) && isAdmin) && isExperienceField) {
      return false;
    }

    // No one except for the user who edits his own profile can edit SSN.
    if (!isPersonalWizard && isSsnField) {
      return false;
    }

    // Recruits who submitted their profile
    // can't upload newer versions of their documents.
    if (
      isRecruitWizard(wizardType)
      && isPersonalWizard
      && isSubmitted
      && !isApproved
      && isDocumentField
    ) {
      return false;
    }

    // By default, any field can be edited.
    return true;
  });

  return {
    isEditable,
    canEditField,
  };
};

export default useProfileEditable;
