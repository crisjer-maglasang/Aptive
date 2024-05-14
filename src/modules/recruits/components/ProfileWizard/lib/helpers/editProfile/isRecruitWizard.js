import { onboardingConstants } from '@/lib/constants';

const {
  WIZARD_TYPE_RECRUIT,
} = onboardingConstants;

const isRecruitWizard = (wizardType) => wizardType === WIZARD_TYPE_RECRUIT;

export default isRecruitWizard;
