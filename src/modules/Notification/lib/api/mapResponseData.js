import { parseNotification } from '../helpers/handleContent';

export const mapNotificationsRequestResponse = (response) => {
  const items = response?.data?.map((notification) => {
    const {
      notification_id: id,
      notification_type: notificationType,
      created_at: dateCreated,
      read_at,
      content,
    } = notification?.attributes ?? {};

    const notificationData = parseNotification(content);
    const isRead = Boolean(read_at);

    return {
      id: id ?? 0,
      notificationType: notificationType ?? '',
      dateCreated: dateCreated ?? '',
      content: notificationData,
      isRead,
    };
  });

  return { items };
};
