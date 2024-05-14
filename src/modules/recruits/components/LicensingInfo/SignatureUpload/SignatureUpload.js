import { onboardingConstants } from '@/lib/constants';
import { connect } from 'react-redux';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CustomButton, CustomButtonGroup, Loader } from '@/components/common';
import { addFsExcludeClass } from '@/lib/utils';
import SignaturePad from 'react-signature-pad-wrapper';
import { CustomErrorMessage } from '@/components/common/Form';
import { useFormContext } from 'react-hook-form';
import { uploadSignatureAsync } from '@/redux/files';
import { signatureLoadingSelector } from '@/redux/loading';
import { signatureFileSelector } from '@/redux/onboarding';

const {
  SIGNATURE,
  SIGNATURE_LOCAL_FILE,
  SIGNATURE_DRAWER_BUTTON_DRAW,
  SIGNATURE_DRAWER_BUTTON_CHANGE,
  SIGNATURE_PEN_COLOR,
  SIGNATURE_BACKGROUND_COLOR,
} = onboardingConstants;

const SignatureUpload = ({
  userId,
  canEditField,
  signatureIsLoading,
  uploadSignature,
  signatureFile,
}) => {
  const { register, getValues, setValue, trigger, formState: { errors } } = useFormContext();

  const { signature, signatureLocalFile } = getValues();

  const sigCanvas = useRef();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(async () => {
    if (signatureFile?.file) {
      const options = { shouldValidate: true };

      setValue(SIGNATURE, signatureFile?.fileName, { ...options });
      setValue(SIGNATURE_LOCAL_FILE, '', { ...options });

      await trigger(SIGNATURE);
    }
  }, [signatureFile?.file]);

  const drawButtonText = useMemo(() => {
    return signature?.length > 0 || signatureLocalFile?.length > 0
      ? SIGNATURE_DRAWER_BUTTON_CHANGE
      : SIGNATURE_DRAWER_BUTTON_DRAW;
  }, [signature, signatureLocalFile]);

  const handleDrawerButtonClick = useCallback(() => {
    setValue(SIGNATURE_LOCAL_FILE, '', { shouldValidate: true });
    setDrawerOpen(true);
  }, [setDrawerOpen, sigCanvas]);

  const uploadMode = useMemo(() => {
    return signatureLocalFile?.length > 0;
  }, [signatureLocalFile]);

  const handleSaveButtonClick = useCallback(() => {
    if (uploadMode) {
      sigCanvas?.current?.off();
      uploadSignature({ user_id: userId, file: signatureLocalFile, successCallback: () => setDrawerOpen(false) });
    } else {
      const isEmpty = sigCanvas?.current.isEmpty();

      if (isEmpty) {
        setLocalError('Signature should not be blank');
      } else {
        setValue(SIGNATURE_LOCAL_FILE, sigCanvas?.current?.toDataURL('image/png'), { shouldValidate: true });
        setLocalError(null);
        sigCanvas?.current?.off();
      }
    }
  }, [sigCanvas, setLocalError, uploadMode, uploadSignature]);

  const handleCancelButtonClick = useCallback(() => {
    sigCanvas?.current?.clear();
    setLocalError(null);
    setValue(SIGNATURE_LOCAL_FILE, '', { shouldValidate: true });
    sigCanvas?.current?.on();
  }, [sigCanvas, signatureLocalFile, setLocalError]);

  const saveButtonText = useMemo(() => {
    return uploadMode ? 'Upload' : 'Save';
  }, [uploadMode]);

  const cancelButtonText = useMemo(() => {
    return uploadMode ? 'Cancel' : 'Clear';
  }, [uploadMode]);

  const uploadDisabled = useMemo(() => {
    return !(uploadMode && !sigCanvas?.current?.isEmpty());
  }, [signatureLocalFile, sigCanvas]);

  useEffect(() => {
    // Clears out the canvas when the drawer is opened/closed
    // or when a signature is made/cancelled
    sigCanvas?.current?.clear();
  }, [isDrawerOpen]);

  return (
    <div className="border-gray-200">
      <CustomButton
        color="white"
        text={drawButtonText}
        onClick={handleDrawerButtonClick}
        disabled={!canEditField(SIGNATURE)}
      />
      {isDrawerOpen ? (
        <>
          <div className={addFsExcludeClass('flex items-center overflow-hidden h-48 justify-center min-h-full my-3 border rounded-md')}>
            {signatureIsLoading ? (
              <Loader />
            ) : (
              <SignaturePad
                ref={sigCanvas}
                redrawOnResize
                height={200}
                options={{ penColor: SIGNATURE_PEN_COLOR, backgroundColor: SIGNATURE_BACKGROUND_COLOR }}
              />
            )}
            <input
              {...register(SIGNATURE)}
              name={SIGNATURE}
              id={SIGNATURE}
              // value={url || ''}
              type="hidden"
            />
          </div>
          {signatureIsLoading ? (
            <div className="flex text-sm font-medium text-green-700 mt-4">
              Uploading Image
            </div>
          ) : (
            <CustomButtonGroup
              onCancelClick={handleCancelButtonClick}
              onSaveClick={handleSaveButtonClick}
              saveText={saveButtonText}
              cancelText={cancelButtonText}
              disabledSave={uploadMode && uploadDisabled}
            />
          )}
        </>
      ) : null}
      {(localError || errors?.signature) && !signatureIsLoading && (
        <CustomErrorMessage text={localError || errors?.signature?.message} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signatureFile: signatureFileSelector(state),
  signatureIsLoading: signatureLoadingSelector(state),
});

const mapDispatchToProps = {
  uploadSignature: uploadSignatureAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignatureUpload);
