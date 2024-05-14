import React, { useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {ErrorBox, Loader} from '@/components/common';

import {onboardingConstants} from '@/lib';
import {attachmentsErrorSelector, requestAttachmentsAsync, attachmentsSelector} from "@/redux/reps";
import {attachmentsIsLoadingSelector} from "@/redux/loading";
import AttachmentsListItem from './AttachmentsListItem';

const {
  PASSPORT_LABEL,
  DRIVER_LICENSE_LABEL,
  SOCIAL_SECURITY_LABEL,
  SIGNATURE_LABEL,
  PROFILE_PICTURE_LABEL,
  W9_LABEL,
  I9_LABEL,
} = onboardingConstants;

const AttachmentsList = (
  {
    userId,
    isPersonalWizard,
    attachments,
    error,
    loading,
    requestAttachments
  }) => {
  const [images, setImages] = useState([]);

  const handleDownloadClick = (image) => window.open(image.link, '_blank')?.focus();

  useEffect(() => {
    // null is a marker that user id isn't presented yet, so we shouldn't request attachments now
    if (userId !== null) {
      requestAttachments({ userId, isPersonalWizard });
    }
  }, [requestAttachments, userId, isPersonalWizard]);

  useEffect(() => {
    let imagesList = [];

    if (attachments) {
      attachments.forEach((attachment) => {
        let name;

        switch (attachment.type) {
          case 'profilePicture':
            name = PROFILE_PICTURE_LABEL;
            break;
          case 'passportPicture':
            name = PASSPORT_LABEL;
            break;
          case 'driverLicensePicture':
            name = DRIVER_LICENSE_LABEL;
            break;
          case 'socialSecurityCardPicture':
            name = SOCIAL_SECURITY_LABEL;
            break;
          case 'signaturePicture':
            name = SIGNATURE_LABEL;
            break;
          case 'w9Picture':
            name = W9_LABEL;
            break;
          case 'i9Picture':
            name = I9_LABEL;
            break;
        }

        if (attachment?.url) {
          imagesList.push({ link: attachment.url, name: name, docusignDocumentType: attachment?.docusignDocumentType });
        }
      });
    }

    setImages(imagesList);
  }, [attachments]);

  return loading
    ? <Loader />
    : (
      <>
        {error && (
          <div className="mb-2">
            <ErrorBox message={error} />
          </div>
        )}
        {images?.length
          ? images.map((image, i) => (
            <AttachmentsListItem
              image={image}
              key={`attachment_image_${i}`}
              onDownloadClick={handleDownloadClick}
              userId={userId}
            />
          ))
          : (
            <div className="text-center">
              {onboardingConstants.NO_ATTACHMENTS_FOUND}
            </div>
          )}
      </>
    );
};

const mapStateToProps = (state, { userId }) => {
  return {
    loading: attachmentsIsLoadingSelector(state),
    error: attachmentsErrorSelector(state, userId),
    attachments: attachmentsSelector(state, userId),
  };
};

const mapDispatchToProps = {
  requestAttachments: requestAttachmentsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentsList);
