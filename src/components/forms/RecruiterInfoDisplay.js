import { DeviceMobileIcon, MailOpenIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { onboardingConstants } from '@/lib';

const RecruiterInfoDisplay = ({ name, phone, email }) => {
  return (
    <div className="flex flex-col">
      <span className="pb-2 pl-2 text-xs text-gray-500 border-b border-gray-200 border-solid">
        {onboardingConstants.RECRUITER_INFO}
      </span>
      <div className="mt-2 ml-2">
        <span className="mb-2 font-bold text-black text-md">{name}</span>
        {phone && (
          <div className="flex items-center mb-1">
            <DeviceMobileIcon
              className="w-5 h-5 text-gray-300"
              aria-hidden="true"
            />
            <span className="ml-1 text-sm text-gray-400">{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center">
            <MailOpenIcon
              className="w-5 h-5 text-gray-300"
              aria-hidden="true"
            />
            <span className="ml-1 text-sm text-gray-400">{email}</span>
          </div>
        )}
      </div>
    </div>
  );
};

RecruiterInfoDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string,
};

export default RecruiterInfoDisplay;
