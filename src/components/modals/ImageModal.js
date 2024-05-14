import { IconButton } from '@/components/common';
import { XIcon } from '@heroicons/react/outline';
import ModalWrapper from './ModalWrapper';
import PropTypes from 'prop-types';
import { addFsExcludeClass } from '@/lib/utils';

const ImageModal = ({ isOpen, onClose, image, title }) => {
  return (
    <ModalWrapper
      isOpened={isOpen}
      onCloseModal={onClose}
      width={'max-w-[1440px]'}
    >
      <div className="p-2 min-w-[350px] min-h-[200px]">
        <div className="flex items-center justify-end">
          <IconButton
            actionTitle="Close image model"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            <XIcon className="w-6 h-6" aria-hidden="true" />
          </IconButton>
        </div>
        <div className="flex items-center justify-center">
          <img src={image} alt={title} className={addFsExcludeClass('w-full h-auto')} />
        </div>
      </div>
    </ModalWrapper>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  image: PropTypes.string,
  title: PropTypes.string,
};

export default ImageModal;
