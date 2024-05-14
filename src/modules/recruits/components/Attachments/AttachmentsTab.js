import { AttachmentsList, FormSection } from '@/components';
import { onboardingConstants } from '@/lib/constants';

const AttachmentsTab = ({ userId, isPersonalWizard }) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-md shadow-sm" >
      <FormSection title={onboardingConstants.ATTACHMENTS_SECTION_TITLE}>
        <AttachmentsList userId={userId} isPersonalWizard={isPersonalWizard} />
      </FormSection>
    </div>
  );
};

export default AttachmentsTab;
