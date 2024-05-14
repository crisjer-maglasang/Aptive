import React, {useCallback, useState} from 'react';
import { connect } from 'react-redux';
import { ErrorBox } from '@/components';
import { forgotPasswordAsync } from '@/redux/auth';
import { forgotPasswordErrorsSelector, removeAllErrorsAction } from '@/redux/errors';
import { CustomButton, CustomFormElement, PageLoader } from '@/components/common';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { validationSchema } from "./ForgotPasswordValidationSchema";
import { dashboardConstants, format } from "@/lib";
import { useNavigate } from "react-router-dom";
import { forgotPasswordLoadingSelector } from '@/redux/loading';
import PropTypes from 'prop-types';
import { addFsExcludeClass } from '@/lib/utils';

const ForgotPasswordForm = ({ loading, error, forgotPassword, removeErrors }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    EMAIL_LABEL,
    EMAIL_NAME,
  } = dashboardConstants;

  const handleSubmitForm = useCallback(() => {
    setShowSuccessMessage(false);
    forgotPassword({email, successCallback: () => setShowSuccessMessage(true)});
  }, [email]);

  const onChangeEmail = useCallback(
    (e) => {
      const { name, value, type } = e.target;
      const formatted = format(name, type, value);
      setEmail(formatted);
    },
    [email]
  );

  const handleGoBack = () => {
    removeErrors();
    navigate('/login');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const errorMessages = error
    ? error.map((singleError, index) => (
      <ErrorBox key={index} message={singleError.message} />
    )) : null;

  return (
    <div className="flex flex-col justify-center grow py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          {loading && <PageLoader />}
          <form className="space-y-6" noValidate onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Forgot Password</h1>
            {showSuccessMessage && (
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">We have emailed your password reset link!</p>
              </div>
            )}

            {errorMessages}

            <CustomFormElement
              colSpan={4}
              id={EMAIL_NAME}
              name={EMAIL_NAME}
              label={EMAIL_LABEL}
              type="text"
              formValue={email}
              register={register}
              error={errors?.email}
              required
              onChange={onChangeEmail}
              className={addFsExcludeClass()}
            />

            <div className="flex items-center pt-4 border-t border-gray-300">
              <CustomButton color="green" type="submit" className="mr-4">
                Submit
              </CustomButton>
              <CustomButton color="white" onClick={handleGoBack}>
                Go Back
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: forgotPasswordErrorsSelector(state),
    loading: forgotPasswordLoadingSelector(state)
  };
};

const mapDispatchToProps = {
  forgotPassword: forgotPasswordAsync.request,
  removeErrors: removeAllErrorsAction,
};

ForgotPasswordForm.propTypes = {
  error: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
