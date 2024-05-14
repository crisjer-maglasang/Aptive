import PropTypes from 'prop-types';
import { useState } from 'react';

import Modal from '@/modules/AdminTools/components/Modal';
import Services from './Services';
import Addons from './Addons';

const Products = ({ plan }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  return (
    <>
      <div
        className="cursor-pointer inline-block text-primary-300"
        onClick={open}
      >
        {plan.name}
      </div>
      <Modal {...{ onClose, isOpen }}>
        <Services {...{ services: plan.services }} />
        <hr className="mb-4" />
        <Addons {...{ addons: plan.addons }} />
      </Modal>
    </>
  );
};

Products.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string,
    services: PropTypes.array,
    addons: PropTypes.array,
  }),
};

export default Products;
