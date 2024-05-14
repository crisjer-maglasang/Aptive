import { dashboardConstants, formatDateDisplay } from '@/lib';
import { addFsExcludeClass } from '@/lib/utils';

const ContractDetails = ({ contract }) => {
  const { CONTRACT_NAME, STATUS, RECRUIT_NAME, RECRUIT_SIGNED, REGIONAL_SIGNED, ADMIN_SIGNED, RECRUITER } =
    dashboardConstants;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:px-6 lg:px-6">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-xs text-gray-500">{CONTRACT_NAME}</dt>
          <dd className="mt-1 text-xs text-gray-900">
            {contract.title}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-xs text-gray-500">{STATUS}</dt>
          <dd className="mt-1 text-xs text-gray-900">{contract.status}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-xs text-gray-500">{RECRUIT_NAME}</dt>
          <dd className={addFsExcludeClass('mt-1 text-xs text-gray-900')}>
            {contract.recruitName}
          </dd>
        </div>

        <div className="sm:col-span-1">
          <dt className="text-xs text-gray-500">{RECRUIT_SIGNED}</dt>
          <dd className="mt-1 text-xs text-gray-900">
            {contract.recruitSigned
              ? formatDateDisplay(contract.recruitSigned)
              : 'Not Signed'}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-xs text-gray-500">{RECRUITER}</dt>
          <dd className={addFsExcludeClass('mt-1 text-xs text-gray-900')}>
            {contract.recruiter}
          </dd>
        </div>

        <div className="sm:col-span-1">
          <dt className="text-xs text-gray-500">{REGIONAL_SIGNED}</dt>
          <dd className="mt-1 text-xs text-gray-900">
            {contract.regionalSigned
              ? formatDateDisplay(contract.regionalSigned)
              : 'Not Signed'}
          </dd>
        </div>
        <div className="sm:col-span-1">
        </div>
        <div className="sm:col-span-1">
          <dt className="text-xs text-gray-500">{ADMIN_SIGNED}</dt>
          <dd className="mt-1 text-xs text-gray-900">
            {contract.adminSigned
              ? formatDateDisplay(contract.adminSigned)
              : 'Not Signed'}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ContractDetails;
