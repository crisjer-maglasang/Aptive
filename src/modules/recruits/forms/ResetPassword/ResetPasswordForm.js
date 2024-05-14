import React, {useCallback, useState} from 'react';
import { connect } from 'react-redux';
import { ErrorBox } from '@/components';
import { resetPasswordAsync } from '@/redux/auth';
import { CustomButton, CustomFormElement, PageLoader } from '@/components/common';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { validationSchema } from "./ResetPasswordValidationSchema";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPasswordLoadingSelector } from '@/redux/loading';
import { dashboardConstants, onboardingConstants } from "@/lib";
import { resetPasswordErrorsSelector } from '@/redux/errors';
import { addFsExcludeClass } from '@/lib/utils';

const ResetPasswordForm = ({ loading, error, resetPassword }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const defaultValues = {
    email: '',
    password: '',
    repeatPassword: '',
    token
  }
  const [data, setData] = useState(defaultValues);
  const {
    EMAIL_LABEL,
    EMAIL_NAME,
  } = dashboardConstants;
  const {
    PASSWORD_LABEL,
    REPEAT_PASSWORD_LABEL,
    PASSWORD_NAME,
    REPEAT_PASSWORD_NAME,
    TOKEN_NAME,
  } = onboardingConstants;

  const handleSubmitForm = useCallback(() => {
    resetPassword({
      ...data,
      successCallback: () => navigate('/login'),
      tokenErrorCallback: (errorType) => navigate('/token-error', { state: { type: errorType } })
    });
  }, [data, navigate, resetPassword]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setData({
        ...data,
        [name]: value,
      });
    },
    [data]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="flex flex-col justify-center grow py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          {loading && <PageLoader />}
          <form className="space-y-6" noValidate onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Reset Password</h1>

            {error
              ? error.map((errorMessage) => <ErrorBox key={errorMessage} message={errorMessage} />)
              : null}

            <input
              id={TOKEN_NAME}
              name={TOKEN_NAME}
              type="hidden"
              value={token}
            />

            <CustomFormElement
              colSpan={4}
              id={EMAIL_NAME}
              name={EMAIL_NAME}
              label={EMAIL_LABEL}
              type="text"
              formValue={data.email}
              register={register}
              error={errors?.email}
              onChange={handleChange}
              required
              className={addFsExcludeClass()}
            />

            <CustomFormElement
              colSpan={4}
              id={PASSWORD_NAME}
              name={PASSWORD_NAME}
              label={PASSWORD_LABEL}
              type="password"
              formValue={data.password}
              register={register}
              error={errors?.password}
              onChange={handleChange}
              required
            />

            <CustomFormElement
              colSpan={4}
              id={REPEAT_PASSWORD_NAME}
              name={REPEAT_PASSWORD_NAME}
              label={REPEAT_PASSWORD_LABEL}
              type="password"
              formValue={data.repeatPassword}
              register={register}
              error={errors?.repeatPassword}
              onChange={handleChange}
              required
            />

            <div className="flex items-center justify-between pt-4 border-t border-gray-300">
              <CustomButton color="green" type="submit">
                Reset
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
    error: resetPasswordErrorsSelector(state),
    loading: resetPasswordLoadingSelector(state)
  };
};

const mapDispatchToProps = {
  resetPassword: resetPasswordAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
