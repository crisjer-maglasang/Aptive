import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ErrorBox, Loader } from '@/components';
import { authenticateWithTokenActionAsync, loginAsync } from '@/redux/auth';
import { loginErrorsSelector } from '@/redux/errors';
import { Link, useSearchParams } from 'react-router-dom';
import { oneTimeTokenLoadingSelector, selectAuthUserLoading, selectLoginLoading } from '@/redux/loading';
import { LoadingIcon } from '@/components/common/icons';
import { addFsExcludeClass } from '@/lib/utils';

const Login = ({
  isLoginLoading,
  isUserLoading,
  login,
  errors,
  authenticateWithToken,
  oneTimeTokenLoading,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      authenticateWithToken({ token });
    }
  }, [token]);

  const handleLoginClick = () => {
    if (email && password) {
      login({ email, password });
      if (formError) {
        setFormError('');
      }
    } else {
      setFormError('Both email address and password are required');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLoginClick();
    }
  };

  const renderErrorBox = (errorMessage) => (
    <ErrorBox key={errorMessage} message={errorMessage} />
  );

  const getStyles = (isError) => {
    return addFsExcludeClass(
      `shadow-sm block w-full sm:text-sm rounded-md ${isError
        ? 'focus:ring-red-500 focus:border-red-500 border-red-300 placeholder-red-300 focus:outline-none'
        : 'focus:ring-aptivegreen focus:border-aptivegreen border-gray-300 placeholder-gray-300'}`,
    );
  };

  return (
    <div className="bg-gray-50 grow flex justify-center items-center py-12 sm:px-6">
      <div className="w-full sm:max-w-md px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        {oneTimeTokenLoading ? (
          <Loader />
        ) : (
          <div className="space-y-6">
            {errors && errors.map((error) => renderErrorBox(error))}
            {formError && renderErrorBox(formError)}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={getStyles(formError && !email)}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={getStyles(formError && !password)}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-aptivegreen"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-300">
              <button
                className="flex justify-center items-center gap-x-1 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm w-half bg-aptivegreen hover:bg-aptivegreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen"
                onClick={handleLoginClick}
                disabled={isLoginLoading || isUserLoading}
              >
                {(isLoginLoading || isUserLoading) && <LoadingIcon />}
                <span>Login</span>
              </button>
              <div className="text-sm">
                <Link
                  key="forgot-password"
                  to="/forgot-password"
                  className="font-medium text-aptivegreen hover:text-aptivegreen"
                >
                  <span className="truncate">Forgot password?</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoginLoading: selectLoginLoading(state),
  isUserLoading: selectAuthUserLoading(state),
  errors: loginErrorsSelector(state),
  oneTimeTokenLoading: oneTimeTokenLoadingSelector(state),
});

const mapDispatchToProps = {
  login: loginAsync.request,
  authenticateWithToken: authenticateWithTokenActionAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
