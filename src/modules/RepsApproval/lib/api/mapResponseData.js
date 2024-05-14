import { DOCUMENT_STATUS } from '../../lib';
import { formatDateDisplay, getNonEmptyObjectValues } from '@/lib/utils';
import { DOCUMENTS } from '@/lib/constants';

export const mapRepsForApprovalResponse = (response) => {
  const total = response?.meta?.total ?? 0;
  const items = response?.data?.map((rep) => {
    const {
      region,
      profile_img: avatar,
      user_id: userId,
      name: userName,
      items_to_review,
      regional_name: regionalName,
      recruiter_name: recruiterName,
      submitted_at,
    } = rep?.attributes ?? {};

    const itemsToReview = items_to_review?.map((item) => DOCUMENTS[item]) ?? [];
    const submittedDate = formatDateDisplay(submitted_at);

    return {
      avatar: avatar ?? '',
      region: region ?? '',
      userId: userId ?? 0,
      userName: userName ?? '',
      itemsToReview,
      regionalName: regionalName ?? '',
      recruiterName: recruiterName ?? '',
      submittedDate,
    };
  }) ?? [];

  return { items, total };
};

export const mapUserRoleResponse = (response) => {
  const items = response?.data?.map((recruiter) => {
    const {
      user_id: userId,
      full_name: fullName,
    } = recruiter?.attributes ?? {};

    return {
      value: String(userId),
      label: fullName ?? '',
    };
  }) ?? [];

  return { items };
};

export const mapApprovalDocumentsResponse = (response) => {
  const items = response?.data?.map((item) => {
    const {
      approval_item_id: id,
      item: documentType,
      meta: {
        url: image,
        ss: ssnNumber,
        drivers_license_number: driverLicenseNumber,
        drivers_license_expiration_date: driverLicenseExpireDate,
        passport_expiration_date: passportExpireDate,
        docusign_document_type: docusignDocumentType,
        help_text: helpText,
      } = {},
    } = item?.attributes;

    const document = {
      id: id ?? '',
      image: image ?? '',
      documentType: documentType ?? '',
      ssnNumber: ssnNumber ?? '',
      driverLicenseExpireDate: formatDateDisplay(driverLicenseExpireDate),
      passportExpireDate: formatDateDisplay(passportExpireDate),
      driverLicenseNumber: driverLicenseNumber ?? '',
      status: DOCUMENT_STATUS.PENDING,
      docusignDocumentType: docusignDocumentType ?? '',
      helpText: helpText ?? '',
    };

    return getNonEmptyObjectValues(document);
  });

  return { items };
};
