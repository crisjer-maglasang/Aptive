import {useMemo, useState} from 'react';
import { useFormContext } from 'react-hook-form';
import { onboardingConstants } from '@/lib';
import { CustomButton, CustomFormElement, Loader } from '@/components/common';
import { requestDocumentSignLinkAsync, requestDocumentViewLinkAsync } from '@/redux/contracts';
import { connect, useDispatch } from 'react-redux';
import { documentSignLinkLoadingSelector, documentViewLinkLoadingSelector } from '@/redux/loading';
import { isAdminSelector } from '@/redux/auth';
import { CustomErrorMessage } from '@/components/common/Form';
import { repApprovedSelector } from '@/redux/onboarding';
import classNames from 'classnames';

const {
  W9_UPLOAD_TEXT,
  DOCUMENT_UPLOAD_BUTTON,
  DOCUMENT_CONTINUE_BUTTON,
  DOCUMENT_VIEW_BUTTON,
  DOCUMENT_TYPE_W9,
  W9_CLICKED,
  DOCUMENT_UPLOAD_NEW_BUTTON,
  W9_HELP_TEXT,
  DOCUMENT_IN_REVIEW_TEXT,
  W9_COMPLETED_NAME,
  USE_PREVIOUS_W9_NAME,
  USE_PREVIOUS_W9_TEXT,
} = onboardingConstants;

const W9Upload = ({
  isPersonalWizard,
  hrData,
  canEditField,
  userId,
  viewLoading,
  isAdmin,
  isApproved,
  onChangeHandler,
}) => {
  const { register, setValue, getValues, formState: { errors } } = useFormContext();
  const [signLoading, setSignLoading] = useState(false);

  const dispatch = useDispatch();

  const w9Submitted = (getValues()).w9Submitted;

  const signButtonText = useMemo(() => {
    if (w9Submitted) {
      return DOCUMENT_UPLOAD_NEW_BUTTON;
    } else if (hrData.w9EnvelopeSent) {
      return DOCUMENT_CONTINUE_BUTTON;
    } else {
      return DOCUMENT_UPLOAD_BUTTON;
    }
  }, [hrData.w9EnvelopeSent, w9Submitted, isApproved]);

  const onSignLinkLoaded = ({ link }) => {
    setValue(W9_CLICKED, true, { shouldValidate: true });
    setValue(W9_COMPLETED_NAME, false, { shouldValidate: true });
    window.open(link, '_blank')?.focus();
    setSignLoading(false);
  };

  const onViewLinkLoaded = ({ link }) => {
    window.open(link, '_blank')?.focus();
    setSignLoading(false);
  };

  const onViewClick = () => {
    setSignLoading(true);
    dispatch(requestDocumentViewLinkAsync.request({
      documentType: DOCUMENT_TYPE_W9,
      userId: userId,
      callback: onViewLinkLoaded,
    }));
  };

  const onSignClick = (event) => {
    if (!isPersonalWizard) {
      event.preventDefault();

      return;
    }

    setSignLoading(true);
    dispatch(requestDocumentSignLinkAsync.request({
      documentType: DOCUMENT_TYPE_W9,
      callback: onSignLinkLoaded,
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center space-x-6 border border-gray-200 px-6 py-8">
        <div>
          {'*'}{W9_UPLOAD_TEXT}
          {w9Submitted && !isApproved && (
            <div className="text-sm text-red-500">
              {DOCUMENT_IN_REVIEW_TEXT}
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {isApproved && hrData.w9EnvelopeSent && w9Submitted && (
            <>
              {viewLoading ? (
                <Loader className="m-2" />
              ) : (
                <CustomButton
                  color="green"
                  onClick={onViewClick}
                  disabled={!isPersonalWizard && !isAdmin}
                  className="m-1 px-6 py-2 text-gray-700 font-normal shadow-none text-white"
                >
                  {DOCUMENT_VIEW_BUTTON}
                </CustomButton>
              )}
            </>
          )}
          {signLoading ? (
            <Loader />
          ) : (
            <CustomButton
              color="green"
              onClick={onSignClick}
              disabled={!canEditField(DOCUMENT_TYPE_W9) || !isPersonalWizard}
              className={classNames(
                'my-1 px-6 py-2 text-gray-700 font-normal shadow-none text-white',
                { 'text-gray-300': !canEditField(DOCUMENT_TYPE_W9) || !isPersonalWizard }
              )}
            >
              {signButtonText}
            </CustomButton>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-500 italic">
        {hrData.w9EnvelopeSent && !hrData.w9Submitted ? W9_HELP_TEXT : null}
      </div>
      {hrData.previousW9Exists && !w9Submitted && (
        <CustomFormElement
          label={USE_PREVIOUS_W9_TEXT}
          type="checkbox"
          elementWrapperClassName="shadow-none"
          formElementWrapperClassName="mt-2 shadow-none"
          className={classNames(
            "w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-aptivegreen",
            {
              'text-gray-300': !canEditField(USE_PREVIOUS_W9_NAME) || !isPersonalWizard,
            },
          )}
          id={USE_PREVIOUS_W9_NAME}
          register={register}
          name={USE_PREVIOUS_W9_NAME}
          orientation="vertical"
          panelWrapperClassName="justify-items-end"
          error={errors?.[USE_PREVIOUS_W9_NAME]}
          onChange={onChangeHandler}
          disabled={!canEditField(USE_PREVIOUS_W9_NAME) || !isPersonalWizard}
        />
      )}
      {errors?.w9Clicked?.message && (
        <CustomErrorMessage className="w-full" text={errors?.w9Clicked?.message} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    viewLoading: documentViewLinkLoadingSelector(state),
    isAdmin: isAdminSelector(state),
    isApproved: repApprovedSelector(state),
  };
};

export default connect(mapStateToProps)(W9Upload);
