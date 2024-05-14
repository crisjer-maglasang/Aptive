import { memo } from 'react';
import PropTypes from 'prop-types';
import { TYPE } from '../../lib';
import DocumentReviewItem from '../DocumentReviewItem/DocumentReviewItem';
import ApprovalItem from '../ApprovalItem/ApprovalItem';

const NotificationItem = ({ id, data, type, dateCreated, isRead, close, openProfile }) => {

  const renderNotificationComponent = () => {
    const components = {
      [TYPE.REPS_TO_APPROVE]: ApprovalItem,
      [TYPE.DOCUMENT_APPROVED]: DocumentReviewItem,
      [TYPE.DOCUMENT_REJECTED]: DocumentReviewItem,
    };
    const Component = components[type];

    return Component
      ? (
        <Component
          id={id}
          content={data}
          dateCreated={dateCreated}
          type={type}
          isRead={isRead}
          close={type === TYPE.REPS_TO_APPROVE ? close : undefined}
          openProfile={openProfile}
        />
      ) : null;
  };

  return renderNotificationComponent();
};

NotificationItem.propTypes = {
  id: PropTypes.number,
  data: PropTypes.array,
  type: PropTypes.string,
  dateCreated: PropTypes.string,
  isRead: PropTypes.bool,
  close: PropTypes.func,
  openProfile: PropTypes.func,
};

export default memo(NotificationItem);
