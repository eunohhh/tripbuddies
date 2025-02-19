import { Notification, PartialNotification } from '@/types/Notification.types';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function getNotifications({ buddyId }: { buddyId: string }): Promise<Notification[]> {
  const url = `/api/notification?buddyId=${buddyId}`;
  try {
    const data = await fetchWrapper<Notification[] | { message: string }>(url, {
      method: 'GET',
      cache: 'no-store',
    });
    if ('message' in data) {
      return [];
    }
    return data;
  } catch (error: any) {
    console.error('error ====>', error);
    throw error;
  }
}

export async function postNotification(notification: PartialNotification): Promise<Notification> {
  const url = `/api/notification`;
  try {
    const data = await fetchWrapper<Notification>(url, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify(notification),
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}
