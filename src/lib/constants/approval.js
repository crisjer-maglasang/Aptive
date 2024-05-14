import onboardingConstants from './onboarding';

const { PASSPORT_LABEL, PROFILE_PICTURE_LABEL, DRIVER_LICENSE_LABEL, SOCIAL_SECURITY_LABEL, W9_LABEL, I9_LABEL } = onboardingConstants;

export const DOCUMENT_TYPES = {
  PROFILE_IMG: 'profile_img',
  PASSPORT_IMG: 'passport_img',
  DL_IMG: 'dl_img',
  SS_IMG: 'ss_img',
  W9_IMG: 'w9',
  I9_IMG: 'i9',
};

const { DL_IMG, PASSPORT_IMG, PROFILE_IMG, SS_IMG, W9_IMG, I9_IMG } = DOCUMENT_TYPES;

export const DOCUMENTS = {
  [PROFILE_IMG]: PROFILE_PICTURE_LABEL,
  [PASSPORT_IMG]: PASSPORT_LABEL,
  [DL_IMG]: DRIVER_LICENSE_LABEL,
  [SS_IMG]: SOCIAL_SECURITY_LABEL,
  [W9_IMG]: W9_LABEL,
  [I9_IMG]: I9_LABEL,
};

export const REJECT_REASONS = {
  IMAGE_IS_BLURRY: 'image_is_blurry',
  CANNOT_SEE_THE_INFORMATION: 'cannot_see_the_information',
  IMAGE_DOES_NOT_MEET_REQUIREMENTS: 'image_does_not_meet_requirements',
  INFORMATION_IS_MISSING: 'information_is_missing',
};

const {
  CANNOT_SEE_THE_INFORMATION,
  IMAGE_DOES_NOT_MEET_REQUIREMENTS,
  IMAGE_IS_BLURRY,
  INFORMATION_IS_MISSING,
} = REJECT_REASONS;

export const REJECT_REASONS_TEXT = {
  [IMAGE_IS_BLURRY]: 'Image is blurry',
  [CANNOT_SEE_THE_INFORMATION]: 'Cannot see the information',
  [IMAGE_DOES_NOT_MEET_REQUIREMENTS]: 'Image does not meet requirements',
  [INFORMATION_IS_MISSING]: 'Information is missing',
};
