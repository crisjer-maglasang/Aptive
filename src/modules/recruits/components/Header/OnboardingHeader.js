import { Loader } from '@/components';
import { UserAddIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { addFsExcludeClass } from '@/lib/utils';
import { ProfileWizardContext } from '../../components';

const OnboardingHeader = () => {
  const { repName } = useContext(ProfileWizardContext);

  return (
    <div className="w-full px-4 py-4 border-b border-gray-200 sm:px-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <div className="flex items-center justify-center w-10 h-10 rounded bg-aptiveblue">
            <UserAddIcon color="white" className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="leading-6">
            <span className="pb-1 text-sm text-gray-400">Rep Onboarding</span>
            <h3 className={addFsExcludeClass('-mt-1 text-lg font-bold')}>
              {`${repName}`.trim() || <Loader size={8} />}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingHeader;
