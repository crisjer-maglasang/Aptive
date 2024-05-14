import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '@/modules/AdminTools/components/Modal';
import Form from './Form';
import { updatingProductsLoadingSelector } from '@/redux/loading';

const ProductForm = ({ defaultValues, request, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onClose = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  const isUpdating = useSelector(updatingProductsLoadingSelector);

  const createProductErrors = useSelector(
    (state) => state?.errors?.errors?.productsUpdate
  );

  const successfulUpdate = useMemo(
    () => isSubmitted && !isUpdating && !createProductErrors,
    [isUpdating, createProductErrors, isSubmitted]
  );

  useEffect(() => {
    if (createProductErrors && isSubmitted) {
      setIsSubmitted(false);
    }
  }, [setIsSubmitted, createProductErrors, isSubmitted]);

  useEffect(() => {
    if (successfulUpdate) {
      onClose();
    }
  }, [successfulUpdate]);

  return (
    <>
      <div className="inline-block" onClick={open}>
        {children}
      </div>
      <Modal {...{ onClose, isOpen }}>
        <Form {...{ defaultValues, request, setIsSubmitted }} />
      </Modal>
    </>
  );
};

ProductForm.propTypes = {
  children: PropTypes.node.isRequired,
  defaultValues: PropTypes.any.isRequired,
  request: PropTypes.func.isRequired,
};

export default ProductForm;
