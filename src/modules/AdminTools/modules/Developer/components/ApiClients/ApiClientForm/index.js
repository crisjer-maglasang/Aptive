import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '@/modules/AdminTools/components/Modal';
import Form from './Form';
import { useApiClientContext } from '../ApiClientContext';

const ApiClientForm = ({ defaultValues, request, children }) => {
  const { updateApiSelector } = useApiClientContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onClose = () => setIsOpen(false);

  const isUpdating = useSelector(updateApiSelector);

  const createPlanAPIClientErrors = useSelector(
    (state) => state?.errors?.errors?.updateApiClient
  );

  const successfulUpdate = useMemo(
    () => isSubmitted && !isUpdating && !createPlanAPIClientErrors,
    [isUpdating, createPlanAPIClientErrors, isSubmitted]
  );

  useEffect(() => {
    if (createPlanAPIClientErrors && isSubmitted) {
      setIsSubmitted(false);
    }
  }, [setIsSubmitted, createPlanAPIClientErrors, isSubmitted]);

  useEffect(() => {
    if (successfulUpdate) {
      onClose();
    }
  }, [successfulUpdate]);

  return (
    <>
      <div className="inline-block" onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Modal {...{ onClose, isOpen }}>
        <Form {...{ defaultValues, request, setIsSubmitted }} />
      </Modal>
    </>
  );
};

ApiClientForm.propTypes = {
  children: PropTypes.node.isRequired,
  defaultValues: PropTypes.any.isRequired,
  request: PropTypes.func.isRequired,
};

export default ApiClientForm;
