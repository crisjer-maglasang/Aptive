import { useContext, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { CustomFormElement, FormLabel, Select } from '@/components/common';
import { ConfirmationActions, ConfirmationModal } from '@/components';
import { DECLINE_MODAL, declineValidationSchema, DOCUMENT_STATUS, rejectReasonsOptions } from '../../lib';
import { ApprovalContext } from '../../providers';
import { DOCUMENTS } from '@/lib/constants';
import { CustomErrorMessage } from '@/components/common/Form';

const DeclineModal = () => {
  const { document, isDeclineModal, toggleDeclineModal, updateDocuments } = useContext(ApprovalContext);
  const { reason, description, documentType } = document;

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      reason: '',
      description: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(declineValidationSchema, { abortEarly: false }),
  });

  const { reason: reasonField, description: descriptionField } = watch();

  useEffect(() => {
    if (reason || description) {
      reset({ reason, description });
    }
  }, []);

  const onSubmitForm = (data) => {
    updateDocuments({ ...document, status: DOCUMENT_STATUS.REJECTED, ...data });
  };

  return (
    <ConfirmationModal
      modalWidth="w-[528px]"
      isOpened={isDeclineModal}
      onCancel={toggleDeclineModal}
      title={`Decline ${DOCUMENTS[documentType]}?`}
      message={`By selecting “Decline”, reps will need to resubmit their ${DOCUMENTS[documentType]}.
          An email and SMS message will be sent to the rep providing instructions for them to resubmit their document(s).`}
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-7">
          <FormLabel htmlFor="decline_reason" label={DECLINE_MODAL.REASON_LABEL} required />
          <Controller
            name="reason"
            control={control}
            render={({ fieldState: { error }, field: { value, onChange } }) => {
              const errorMessage = error?.message;
              const errorStyles = errorMessage
                ? { control: (styles) => ({ ...styles, borderColor: '#FCA5A5', borderRadius: '6px' }) }
                : {};

              return (
                <div className="relative">
                  <Select
                    inputId="decline_reason"
                    name="reason"
                    value={value}
                    onChange={onChange}
                    options={rejectReasonsOptions}
                    styles={errorStyles}
                  />
                  {errorMessage
                    ? <CustomErrorMessage text={errorMessage} className="absolute left-0 -bottom-6" />
                    : null}
                </div>
              );
            }}
          />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="decline_description" label={DECLINE_MODAL.NOTES_LABEL} required />
          <Controller
            name="description"
            control={control}
            render={({ fieldState: { error }, field: { value, onChange } }) => (
              <CustomFormElement
                rows={3}
                formValue={value}
                onChange={onChange}
                id="decline_description"
                name="description"
                type="textArea"
                error={error}
              />
            )}
          />
        </div>

        <ConfirmationActions
          isDisabled={!reasonField || !descriptionField}
          onCancel={toggleDeclineModal}
        />
      </form>
    </ConfirmationModal>
  );
};

export default DeclineModal;
