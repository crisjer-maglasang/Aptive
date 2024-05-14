import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useMemo } from 'react';

const TokenError = () => {
  const location = useLocation();

  const errorText = useMemo(() => {
    switch (location?.state?.type) {
      case 'token_not_found':
        return 'Token not found';
      case 'token_invalid':
        return 'Token is invalid';
      default:
        return 'Your Link Has Expired';
    }
  }, [location?.state?.type])

  return (
    <div className="flex flex-col justify-center grow py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <h1 className="font-medium mb-6">{errorText}</h1>
          <p>
            <span>To send a new link, go to the </span>
            <Link
              to="/forgot-password"
              className="font-medium text-aptivegreen hover:text-aptivegreen whitespace-nowrap"
            >
              Forgot Password
            </Link>
            <span> page.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenError;
