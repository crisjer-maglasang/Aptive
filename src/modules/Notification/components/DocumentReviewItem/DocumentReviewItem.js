import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MailIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DOCUMENT_TYPES, onboardingConstants, onboardingSidebar } from '@/lib/constants';
import { markNotificationAsReadAsync, setReviewDocumentAction } from '@/redux/notifications';
import ItemContentWrapper from '@/modules/Notification/components/ItemContentWrapper/ItemContentWrapper';
import { TOKENS, TYPE } from '@/modules/Notification/lib';
import ItemContent from '@/modules/Notification/components/ItemContent/ItemContent';
import { isRepRoleSelector } from '@/redux/auth';

const { SS_IMG, DL_IMG, PASSPORT_IMG, PROFILE_IMG, W9_IMG } = DOCUMENT_TYPES;
const {
  BASIC_INFO_SECTION_NAME,
  LICENSING_PERSONAL_DETAILS_SECTION_NAME,
  ID_COPY_UPLOAD_SECTION_NAME,
  W9_DOCUMENTS_SECTION_NAME,
} = onboardingConstants;

const {
  PERSONAL_INFO_STEP_ID,
  HR_STEP_ID,
  LICENSING_STEP_ID,
} = onboardingSidebar;

const DocumentReviewItem = ({ id, type, content, dateCreated, isRead, openProfile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRepRole = useSelector(isRepRoleSelector);
  const documentType = content.find((item) => item.type === TOKENS.APPROVAL_DOCUMENT)?.data?.content;

  const onClickNotification = useCallback(() => {
    if (type === TYPE.DOCUMENT_REJECTED) {
      if (isRepRole) {
        const navigationLinks = {
          [PROFILE_IMG]: { path: '/onboarding', section: BASIC_INFO_SECTION_NAME, step: PERSONAL_INFO_STEP_ID },
          [DL_IMG]: { path: '/onboarding/licensing', section: LICENSING_PERSONAL_DETAILS_SECTION_NAME, step: LICENSING_STEP_ID },
          [PASSPORT_IMG]: { path: '/onboarding/hr', section: ID_COPY_UPLOAD_SECTION_NAME, step: HR_STEP_ID },
          [SS_IMG]: { path: '/onboarding/hr', section: ID_COPY_UPLOAD_SECTION_NAME, step: HR_STEP_ID },
          [W9_IMG]: { path: '/onboarding/hr', section: W9_DOCUMENTS_SECTION_NAME, step: HR_STEP_ID },
        };
        const { path, section, step } = navigationLinks[documentType];

        navigate(path);
        dispatch(setReviewDocumentAction({ section: section, step: step }));
      } else {
        openProfile();
      }
    }

    if (!isRead) {
      dispatch(markNotificationAsReadAsync.request({ id }));
    }
  }, [type, isRead, isRepRole, documentType, id]);

  return (
    <ItemContentWrapper
      icon={MailIcon}
      isRead={isRead}
      date={dateCreated}
      isDivider={true}
      onClick={onClickNotification}
    >
      {content?.map((item, i) => (
        <ItemContent key={`${item.type}-${i}`} type={item.type} data={item.data} />
      ))}
    </ItemContentWrapper>
  );
};

DocumentReviewItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  content: PropTypes.array,
  dateCreated: PropTypes.string,
  isRead: PropTypes.bool,
  openProfile: PropTypes.func,
};

export default memo(DocumentReviewItem);
