import PropTypes from 'prop-types';
import { useState } from 'react';

import Modal from '@/modules/AdminTools/components/Modal';

const PreviewFullImage = ({ displayImage, displayName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        Preview
      </div>
      <Modal {...{ onClose, isOpen }} noPadding noWidth>
        <div className="flex flex-col">
          <button
            type="button"
            onClick={onClose}
            className={'text-left py-4 p-5'}
          >
            {displayName}
          </button>
          <div className="flex flex-col items-center">
            <img
              style={{
                maxHeight: '80vh',
                maxWidth: '80vw',
              }}
              src={displayImage}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

PreviewFullImage.propTypes = {
  displayImage: PropTypes.string,
  displayName: PropTypes.string,
};

export default PreviewFullImage;
