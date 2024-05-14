import {useMemo, useState} from 'react';
import { useFormContext } from 'react-hook-form';
import { onboardingConstants } from '@/lib';
import { CustomButton, Loader } from '@/components/common';
import { requestDocumentSignLinkAsync, requestDocumentViewLinkAsync } from '@/redux/contracts';
import { connect, useDispatch } from 'react-redux';
import { documentSignLinkLoadingSelector, documentViewLinkLoadingSelector } from '@/redux/loading';
import { isAdminSelector } from '@/redux/auth';
import { CustomErrorMessage } from '@/components/common/Form';
import { repApprovedSelector } from '@/redux/onboarding';
import classNames from 'classnames';

const {
  I9_UPLOAD_TEXT,
  DOCUMENT_UPLOAD_BUTTON,
  DOCUMENT_CONTINUE_BUTTON,
  DOCUMENT_VIEW_BUTTON,
  DOCUMENT_TYPE_I9,
  I9_CLICKED,
  DOCUMENT_UPLOAD_NEW_BUTTON,
  I9_HELP_TEXT,
  DOCUMENT_IN_REVIEW_TEXT,
  I9_COMPLETED_NAME,
} = onboardingConstants;

const I9Upload = ({
  isPersonalWizard,
  hrData,
  canEditField,
  userId,
  viewLoading,
  isAdmin,
  isApproved
}) => {
  const { setValue, getValues, formState: { errors } } = useFormContext();
  const [signLoading, setSignLoading] = useState(false);

  const dispatch = useDispatch();

  const i9Submitted = (getValues()).i9Submitted;

  const signButtonText = useMemo(() => {
    if (i9Submitted) {
      return DOCUMENT_UPLOAD_NEW_BUTTON;
    } else if (hrData.i9EnvelopeSent) {
      return DOCUMENT_CONTINUE_BUTTON;
    } else {
      return DOCUMENT_UPLOAD_BUTTON;
    }
  }, [hrData.i9EnvelopeSent, i9Submitted, isApproved]);

  const onSignLinkLoaded = ({ link }) => {
    setValue(I9_CLICKED, true, { shouldValidate: true });
    setValue(I9_COMPLETED_NAME, false, { shouldValidate: true });
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
      documentType: DOCUMENT_TYPE_I9,
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
      documentType: DOCUMENT_TYPE_I9,
      callback: onSignLinkLoaded,
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center space-x-6 border border-gray-200 px-6 py-8">
        <div>
          {'*'}{I9_UPLOAD_TEXT}
          {i9Submitted && !isApproved && (
            <div className="text-sm text-red-500">
              {DOCUMENT_IN_REVIEW_TEXT}
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {isApproved && hrData.i9EnvelopeSent && i9Submitted && (
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
              disabled={!canEditField(DOCUMENT_TYPE_I9) || !isPersonalWizard}
              className={classNames(
                'my-1 px-6 py-2 text-gray-700 font-normal shadow-none text-white',
                { 'text-gray-300': !canEditField(DOCUMENT_TYPE_I9) || !isPersonalWizard}
              )}
            >
              {signButtonText}
            </CustomButton>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-500 italic">
        {hrData.i9EnvelopeSent && !hrData.i9Submitted ? I9_HELP_TEXT : null}
      </div>
      {errors?.i9Clicked?.message && (
        <CustomErrorMessage className="w-full" text={errors?.i9Clicked?.message} />
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

export default connect(mapStateToProps)(I9Upload);
