import React, { memo, useCallback, useState } from 'react';
import { IdentificationIcon, EyeIcon, DownloadIcon } from '@heroicons/react/outline';
import { ImageModal, Loader } from '@/components';
import classNames from 'classnames';
import { requestDocumentViewLinkAsync, requestDocumentAsync } from '@/redux/contracts';
import { useDispatch } from 'react-redux';

const AttachmentListItem = ({
  image,
  onDownloadClick,
  onboarding,
  userId,
}) => {
  const dispatch = useDispatch();

  const [imageOpen, setImageOpen] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false);

  const onLinkLoaded = ({ link }) => {
    setLinkLoading(false);
    window.open(link, '_blank')?.focus();
  };

  const handleViewClick = useCallback(() => {
    if (image?.docusignDocumentType) {
      setLinkLoading(true);
      dispatch(requestDocumentViewLinkAsync.request({
        userId: userId,
        documentType: image.docusignDocumentType,
        callback: onLinkLoaded,
      }));
    } else {
      setImageOpen(true);
    }
  }, [setImageOpen, setLinkLoading, dispatch, image, userId]);

  const onDocumentLoaded = () => {
    setDocumentLoading(false);
  };

  const handleDownloadClick = useCallback((image) => {
    if (image?.docusignDocumentType) {
      setDocumentLoading(true);
      dispatch(requestDocumentAsync.request({
        userId: userId,
        documentType: image.docusignDocumentType,
        callback: onDocumentLoaded,
      }));
    } else {
      onDownloadClick(image);
    }
  }, [onDownloadClick, setDocumentLoading, dispatch, image, userId]);

  const handleImageClose = useCallback(() => {
    setImageOpen(false);
  }, [setImageOpen]);

  return (
    <div className="block hover:bg-gray-50 mb-4">
      <div className={classNames(
        "bg-white px-4 flex items-center sm:px-4",
        onboarding ? 'py-6 border-b' : 'py-4 border rounded-xl'
      )}>
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-start">
          <IdentificationIcon className="h-8 w-8 text-aptivegreen" aria-hidden="true"/>
          <div className="truncate ml-4">
            <div className="flex text-sm">
              <p className="font-medium truncate">{image.name}</p>
            </div>
          </div>
        </div>
        {linkLoading ? <Loader /> : (
          <div className="flex ml-5 flex-shrink-0 cursor-pointer" onClick={() => handleViewClick()}>
            <EyeIcon className="h-7 w-7 text-black-500" aria-hidden="true"/>
          </div>
        )}
        {documentLoading ? <Loader /> : (
          <div className="flex ml-5 flex-shrink-0 cursor-pointer" onClick={() => handleDownloadClick(image)}>
            <DownloadIcon className="h-7 w-7 text-black-500" aria-hidden="true"/>
          </div>
        )}
      </div>
      {image ? (
        <ImageModal image={image?.link} title={image?.title} onClose={handleImageClose} isOpen={imageOpen}/>
      ) : null}

    </div>
  )
};

export default memo(AttachmentListItem);
