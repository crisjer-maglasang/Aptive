import { REJECT_REASONS, REJECT_REASONS_TEXT } from '@/lib/constants';

export const DOCUMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const COLUMN_ID = {
  userName: 'name',
  itemsToReview: 'items_to_review',
  region: 'region',
  regionalName: 'regional_name',
  recruiterName: 'recruiter_name',
  date: 'submitted_at',
};

export const approvingUserRolesOptions = [
  { value: '', label: 'Select an option' },
  { value: 'regionals', label: 'Regional Manager' },
  { value: 'recruiters', label: 'Recruiter' },
];

const {
  CANNOT_SEE_THE_INFORMATION,
  IMAGE_DOES_NOT_MEET_REQUIREMENTS,
  IMAGE_IS_BLURRY,
  INFORMATION_IS_MISSING,
} = REJECT_REASONS;

export const rejectReasonsOptions = [
  { value: '', label: 'Select a reason' },
  { value: IMAGE_IS_BLURRY, label: REJECT_REASONS_TEXT[IMAGE_IS_BLURRY] },
  { value: CANNOT_SEE_THE_INFORMATION, label: REJECT_REASONS_TEXT[CANNOT_SEE_THE_INFORMATION] },
  { value: IMAGE_DOES_NOT_MEET_REQUIREMENTS, label: REJECT_REASONS_TEXT[IMAGE_DOES_NOT_MEET_REQUIREMENTS] },
  { value: INFORMATION_IS_MISSING, label: REJECT_REASONS_TEXT[INFORMATION_IS_MISSING] },
];

export const DECLINE_MODAL = {
  REASON_LABEL: 'Reason for declining',
  NOTES_LABEL: 'Additional notes',
};

export const MODAL_ACTIONS = {
  CANCEL: 'Cancel',
  SUBMIT: 'Submit',
  CLOSE: 'Close',
};
