import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '@/modules/AdminTools/components/Modal';
import Form from './Form';
import { updatingProductCategoryLoadingSelector } from '@/redux/loading';

const ServiceCategoryForm = ({ defaultValues, request, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const isUpdating = useSelector(updatingProductCategoryLoadingSelector);

  useEffect(() => {
    if (!isUpdating) {
      onClose();
    }
  }, [isUpdating]);

  return (
    <>
      <div className="inline-block" onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Modal {...{ onClose, isOpen }}>
        <Form {...{ defaultValues, request }} />
      </Modal>
    </>
  );
};

ServiceCategoryForm.propTypes = {
  children: PropTypes.node.isRequired,
  defaultValues: PropTypes.any.isRequired,
  request: PropTypes.func.isRequired,
};

export default ServiceCategoryForm;
